import { useState, useEffect } from "react";

/**
 * 
 * @param props
 * @param props._id
 * @returns wiersz z kluczem i jego rezerwacjami
 */
export default function RoomKeyCalendar(props) {
    const inhabitant = [...props.active]
                    .filter(active=>active.key_id===props._id)
                    .filter(active=>active.live===true)[0]?false:true;
    const [emptyTable, setEmpty] = useState([]); 
    const active =[...props.active]
            .filter(active=>active.key_id===props._id)
            .filter(active=>active.live===false)
            .sort((a, b) => a.data > b.data ? 1 : -1)
    var index=0;
    var a_id=0;
    var table = [];
    const endMonth=props.lengthOfMonth+1

/**
 * Funkcja ustawiająca wiersz dla danego pokoju
 */
    const tableSet = () => {
        existActive(a_id);
        setEmpty(table);
    }

/**
 * Funkcja sprawdzająca, czy istnieje kolejna rezerwacja danego pokoju.
 * W zależności od tego wywołuje odpowiednią funkcję
 * @param {*} i numer odliczający kolejne rezerwacje danego pokoju
 */
    const existActive = (i) =>{
        active[i]?takeDate(i):index<=props.lengthOfMonth?emptyTo(endMonth):<></>;
    }

    useEffect(()=>{
        tableSet();
    },[props.active,props.month]);

/**
 * Funkcja licząca długość przycisku danej rezerwacji
 * @param {number} last ostatni dzień
 * @returns Długość przycisku
 */
    const howManyDays = (last) => {
        if(index===0){
            if(last===endMonth){
                return props.lengthOfMonth*2
            }else{
                return last*2-1
            } 
        }else if(last===endMonth){
            return (props.lengthOfMonth-index)*2+1
        }else{
            return (last-index)*2
        }
    }

/**
 * Funkcja wypełniająca wiersz pustymi komórkami
 * @param {number} last ostatnia komórka 
 */
    const emptyTo  = (last) => {
        if(index===0){
            index++
            if(last===endMonth){
                for(index; index<=props.lengthOfMonth; index++){
                    table.push(<td className={props.colorChange(index)}  
                    colSpan="2" id={index} key={"empty"+index}></td>);
                }
            }else{
                for(index; index<last; index++){
                    table.push(<td className={props.colorChange(index)}  
                    colSpan="2" id={index} key={"empty"+index}></td>);
                }
                table.push(<td className={props.colorChange(index)}  
                    colSpan="1" id={index} key={"empty"+index}></td>);
            } 
        }else if(last===endMonth){
            table.push(<td className={props.colorChange(index)}  
            colSpan="1" id={index} key={"empty"+index}></td>);
            index++
            for(index; index<=props.lengthOfMonth; index++){
                table.push(<td className={props.colorChange(index)}  
                colSpan="2" id={index} key={"empty"+index}></td>); 
            }
        }else{
            table.push(<td className={props.colorChange(index)}  
            colSpan="1" id={index} key={"empty"+index}></td>);
            index++
            for(index; index<=last; index++){
                table.push(<td className={props.colorChange(index)}  
                colSpan="2" id={index} key={"empty"+index}></td>);
            }
            table.push(<td className={props.colorChange(index)}  
            colSpan="1" id={index} key={"empty"+index}></td>);
        }
    }
 /**
  * Funkcja przekazująca dane rezererwacji do komponentu wyswietlającego rezerwację
  * @param event 
  */
    const show = event => {
        const _id = event.target.value;
        const index = [...props.active].findIndex(active=>active._id===_id)
        const activeModel = {
            _id: props.active[index]._id, 
            key_id: props.active[index].key_id,
            user_id: props.active[index].user_id,
            data: props.active[index].data,
            dataQuit: props.active[index].dataQuit,
            live:props.active[index].live
        }
        props.onEdit(activeModel);
    }

/**
 * Funkcja tworząca przycisk rezerwacji
 * @param {number} last ostatni dzień rezerwacji w danym miesiącu
 */
    const reservation = (last) => {
        const color = Date.parse(new Date(active[a_id].data)
                                .toISOString()
                                .slice(0,10))!=Date
                                .parse(active[a_id].data)
            ?'td-rent'
            :'td-reserved'
        const u_id=[...props.users].findIndex(x=>x._id===active[a_id].user_id)
        const userName=props.users[u_id].lastName+" "+props.users[u_id].firstName
        const days = howManyDays(last)
        table.push(<td className={color}  
            colSpan={days} id={index} key={index}>
                <button alt={userName} 
                        className="button-td" 
                        value={active[a_id]._id} 
                        onClick={show}></button>
            </td>);
        index=last
        a_id++
        existActive(a_id)
    }

    /**
     * Funkcja wybierająca rozłożenie rezerwacji w zależności od przypadku
     * @param {number} i numer odliczający kolejne rezerwacje danego pokoju
     */
    const takeDate = (i) => {
        const dataStart = new Date(active[i].data)
        const dataEnd = new Date(active[i].dataQuit)
        const yearS = dataStart.getFullYear();
        const yearE = dataEnd.getFullYear();
        const monthS = dataStart.getMonth();
        const monthE = dataEnd.getMonth();
        const dayS = dataStart.getDate();
        const dayE = dataEnd.getDate();
        if(yearS===props.year){
            if (yearS===yearE) {
                if(monthS===props.month){
                    if(dayS>index){
                        emptyTo(dayS)
                    }
                    if(monthS===monthE){
                        reservation(dayE)
                    }else{
                        reservation(endMonth)
                    }
                }else if(monthE===props.month){
                    reservation(dayE)
                }else if(monthS<props.month&&props.month<monthE){
                    reservation(endMonth)
                }else{
                    a_id++
                    existActive(a_id);
                }
            } else if(monthS<=props.month){
                if(monthS===props.month){
                    emptyTo(dayS)
                }
                reservation(endMonth)
            }else{
                a_id++
                existActive(a_id);
            }
        }else if(yearE===props.year){
            if(monthE===props.month){
                reservation(dayE)
            }else if(props.month<monthE){
                reservation(endMonth)
            }else{
                a_id++
                existActive(a_id);
            }
        }else if(yearS<props.year&&yearE>props.year){
            reservation(endMonth)
        }else{
            a_id++
            existActive(a_id);
        }    
    }  

    const keyModel = {
        _id:props._id, 
        numer:props.numer, 
        blok:props.blok, 
        funkcja:props.funkcja, 
        ile:props.ile,
        ileDost:props.ileDost,
        czyDost:props.czyDost
    };

    /**
     * Funkcja uruchamiająca formularz tworzenia nowej rezerwacji
     */
    const newActiveHandler = () => {
        props.makeTemp(keyModel)
    }

    return(
        <>
        {inhabitant?
            <tr>
                <td className="tdBtn">
                    <button className="button" 
                    onClick={newActiveHandler}>
                    {props.numer} {props.blok} ({props.ile})
                </button></td>
                {emptyTable}
            </tr>
        :<></>}
        </>
    );
}