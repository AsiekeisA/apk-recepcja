import { useState, useEffect, useMemo } from "react";
import NewActive from "../../ActiveKeys/NewActive/NewActive";

export default function RoomKeyCalendar(props) {
    const inhabitant = [...props.active].filter(active=>active.key_id===props._id).filter(active=>active.live===true)[0]?false:true;
    const [emptyTable, setEmpty] = useState([]); 
    const active = props.funkcja==="pokój"?
        [...props.active]
            .filter(active=>active.key_id===props._id)
            .filter(active=>active.live===false)
        :[];
        console.log(props.funkcja==="pokój"?
        [...props.active]
            .filter(active=>active.key_id===props._id)
            .filter(active=>active.live===false)
        :[])
    var index=1;
    var a_id=0;
    var table = [];
    //&&props.funkcja==="pokój" _______jeśli to działa to wrzucić do filtra
//sprawdzanie daty czy jest widoczna jeśli tak maluj od data do dataQuit....dla każdego active TO TABLICA !!! 
    const tableSet = () => {
        existActive(a_id);
        setEmpty(table);
    }

    const existActive = (i) =>{
        active[i]?takeDate(i):emptyTo(props.lengthOfMonth);
    }
    useEffect(()=>{
        tableSet();
    },[props.active,props.month]);

    const howManyDays = (last) => {
        if(index===1){
            if(last===props.lengthOfMonth){
                return last*2
            }else{
                return (last-index)*2+1
            } 
        }else if(last===props.lengthOfMonth){
            return (last-index)*2+1
        }else{
            return (last-index)*2
        }
    }

    const emptyTo = (last) => {
        if(index!=last){
            console.log(index)
            const days = howManyDays(last)
            table.push(<td className={props.colorChange(index,false)}  
                colSpan={days} id={index} key={index}></td>);
            index=last
            console.log(props.numer+" puste "+index);
        }
    }
   
    const reservation = (last) => {
        console.log(index)
        const days = howManyDays(last)
        table.push(<td className={props.colorChange(index,true)}  
            colSpan={days} id={index} key={index}>
                {/* <button  className="button-td">{props.users[user].lastName}</button> */}
            </td>);
        index=last
        console.log(props.numer+" zajete "+index);
        a_id++
        existActive(a_id)
    }
  
    const takeDate = (i) => {
        const dataStart = new Date(active[i].data)
        const dataEnd = new Date(active[i].dataQuit)
        const yearS = dataStart.getFullYear();
        const yearE = dataEnd.getFullYear();
        const monthS = dataStart.getMonth();
        const monthE = dataEnd.getMonth();
        const dayS = dataStart.getDate();
        const dayE = dataEnd.getDate();
        console.log(dataStart+" - "+dataEnd)
        if(yearS===props.year){
            if (yearS===yearE) {
                if(monthS===props.month){
                    if(index===1||dayS>index){
                        emptyTo(dayS)
                    }
                    if(monthS===monthE){
                        reservation(dayE)
                    }else{
                        reservation(props.lengthOfMonth)
                    }
                }else if(monthE===props.month){
                    reservation(dayE)
                }else if(monthS<props.month&&props.month<monthE){
                    reservation(props.lengthOfMonth)
                }else{
                    a_id++
                    existActive(a_id);
                }
            } else if(monthS<=props.month){
                if(monthS===props.month){
                    emptyTo(dayS)
                }
                reservation(props.lengthOfMonth)
            }else{
                a_id++
                existActive(a_id);
            }
        }else if(yearE===props.year){
            if(monthE===props.month){
                reservation(dayE)
            }else if(props.month<monthE){
                reservation(props.lengthOfMonth)
            }else{
                a_id++
                existActive(a_id);
            }
        }else if(yearS<props.year&&yearE>props.year){
            reservation(props.lengthOfMonth)
        }else{
            a_id++
            existActive(a_id);
        }    
    }  

    const dataModel = {
        _id:props._id, 
        numer:props.numer, 
        blok:props.blok, 
        funkcja:props.funkcja, 
        ile:props.ile,
        ileDost:props.ileDost,
        czyDost:props.czyDost
    };

    const newActiveHandler = () => {
        props.idIntoKey(dataModel)
    }

    return(
        <>
        {props.funkcja==="pokój"&&inhabitant?
            <tr>
                <td>{props.numer} {props.blok}</td>
                {emptyTable}
            <td className="tdBtn"><button className="button" onClick={newActiveHandler}>Rezerwacja</button></td>
            </tr>
        :<></>}
        </>
    );
}