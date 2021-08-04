import { useState, useEffect } from "react";
import NewActive from "../../ActiveKeys/NewActive/NewActive";

export default function RoomKeyCalendar(props) {
    const inhabitant = [...props.active].filter(active=>active.key_id===props._id).filter(active=>active.live===true)[0]?false:true;
    const [emptyTable, setEmpty] = useState([]); 
    const active = [...props.active].filter(active=>active.key_id===props._id).filter(active=>active.live===false);
    var index=1;
    var active_id=0;
    var table = [];
    //&&props.funkcja==="pokój" _______jeśli to działa to wrzucić do filtra
//sprawdzanie daty czy jest widoczna jeśli tak maluj od data do dataQuit....dla każdego active TO TABLICA !!! 
    const tableSet = () => {
        existActive(active_id);
        setEmpty(table);
    }
    const existActive = (i) =>{
        active[i]&&props.funkcja==="pokój"?takeDate(i):index<props.lengthOfMonth?emptyTo(props.lengthOfMonth+1):<></>;
    }
    useEffect(()=>{
        tableSet();
    },[props.active,props.month]);

    const emptyTo = (last) => {
        if(index===1){
            table.push(<td className={props.colorChange(index,false)}  
            colSpan={2*(last-index)+1} id={index} key={index}></td>);
        }else{
            table.push(<td className={props.colorChange(index,false)}  
            colSpan={2*(last-index)} id={index} key={index}></td>);
        }
        index=last;
        console.log(props.numer+" "+index)  
    }

    const reservation = (last,user) => {
        table.push(<td className={props.colorChange(index,true)}  
        colSpan={2*(last-index)} id={index} key={index}><button  className="button-td">{props.users[user].lastName}</button></td>);
        index=last;
        console.log(props.numer+" "+index)
        active_id++;
        existActive(active_id);
    }
  
    const takeDate = (i) => {
            const user = [...props.users].findIndex(x=>x._id===active[i].user_id)
            const dataStart = new Date(active[i].data)
            const dataEnd = new Date(active[i].dataQuit)
            const yearS = dataStart.getFullYear();
            const yearE = dataEnd.getFullYear();
            const monthS = dataStart.getMonth();
            const monthE = dataEnd.getMonth();
            const dayS = dataStart.getDate();
            const dayE = dataEnd.getDate();
            const dni=(dayE-dayS)*2;
            //console.log(dni);
            if(yearS===props.year){
                if(yearS===yearE){
                    if(monthS===props.month){
                        if(monthS===monthE){
                            if(dayS===index){
                                reservation(dni,user);
                            }else{
                            emptyTo(dayS);
                            reservation(dayE,user);
                            }
                            //active[i+1]?takeDate(i++):emptyTo(props.lengthOfMonth+1);
                        }else{
                            emptyTo(dayS);
                            reservation(props.lengthOfMonth,user);
                        }
                    }else if(monthE===props.month){
                        reservation(dayE,user);
                        emptyTo(props.lengthOfMonth+1);
                    }else if(monthS<props.month&&monthE>props.month){
                        reservation(props.lengthOfMonth,user);
                    }else{
                        emptyTo(props.lengthOfMonth+1)
                    }
                }else if(monthS===props.month){
                    emptyTo(dayS);
                    reservation(props.lengthOfMonth,user);
                }else if (monthS<props.month){
                    reservation(props.lengthOfMonth,user);
                }else{
                    emptyTo(props.lengthOfMonth+1)
                }
            }else if(yearE===props.year){
                if(monthE===props.month){
                reservation(dayE,user);
                emptyTo(props.lengthOfMonth+1)
                }else if(monthE>props.month){
                    reservation(props.lengthOfMonth,user);
                }else{
                    emptyTo(props.lengthOfMonth+1)
                }
            }else{
                emptyTo(props.lengthOfMonth+1)
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
            <td><button className="button" onClick={newActiveHandler}>Rezerwacja</button></td>
            </tr>
        :<></>}
        </>
    );
}