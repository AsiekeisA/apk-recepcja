import { useState, useEffect } from "react";

export default function RoomKeyCalendar(props) {
    const inhabitant = [...props.active].filter(active=>active.key_id===props._id).filter(active=>active.live===true)[0]?false:true;
    const [emptyTable, setEmpty] = useState([]); 
    const active = [...props.active].filter(active=>active.key_id===props._id).filter(active=>active.live===false);
    var index=1;
    var table = [];
    //&&props.funkcja==="pokój" _______jeśli to działa to wrzucić do filtra
//sprawdzanie daty czy jest widoczna jeśli tak maluj od data do dataQuit....dla każdego active TO TABLICA !!! 
    const existActive = () =>{
        active[0]&&props.funkcja==="pokój"?takeDate():emptyTo(props.lengthOfMonth+1);
        setEmpty(table);
    }
    useEffect(()=>{
        existActive();
    },[props.active,props.month]);

    const emptyTo = (last) => {
        for(index; index<last; index++){
            table.push(<td className={props.colorChange(index,false)}  
            width="25px" height="25px" 
            id={index} key={index}></td>);
        }
    }
   
    const reservation = (last) => {
        for(index; index<=last; index++){
            table.push(<td className={props.colorChange(index,true)}  
            width="25px" height="25px" 
            id={index} key={index}><button width="25px" height="25px" className="button-td"></button></td>);
        }
    }
  
    const takeDate = () => {
        for(var i=0; i<active.length; i++) {
            const dataStart = new Date(active[i].data)
            const dataEnd = new Date(active[i].dataQuit)
            const yearS = dataStart.getFullYear();
            const yearE = dataEnd.getFullYear();
            const monthS = dataStart.getMonth();
            const monthE = dataEnd.getMonth();
            const dayS = dataStart.getDate();
            const dayE = dataEnd.getDate();
            if(yearS===props.year){
                if(yearS===yearE){
                    if(monthS===props.month){
                        if(monthS===monthE){
                            emptyTo(dayS);
                            reservation(dayE);
                            emptyTo(props.lengthOfMonth+1);
                        }else{
                            emptyTo(dayS);
                            reservation(props.lengthOfMonth);
                        }
                    }else if(monthE===props.month){
                        reservation(dayE);
                        emptyTo(props.lengthOfMonth+1);
                    }else if(monthS<props.month&&monthE>props.month){
                        reservation(props.lengthOfMonth);
                    }else{
                        emptyTo(props.lengthOfMonth+1)
                    }
                }else if(monthS===props.month){
                    emptyTo(dayS);
                    reservation(props.lengthOfMonth);
                }else{
                    emptyTo(props.lengthOfMonth+1)
                }
            }else if(yearE===props.year){
                if(monthE===props.month){
                reservation(dayE);
                emptyTo(props.lengthOfMonth+1)
                }else if(monthE>props.month){
                    reservation(props.lengthOfMonth);
                }else{
                    emptyTo(props.lengthOfMonth+1)
                }
            }else{
                emptyTo(props.lengthOfMonth+1)
            }
        };
    }    

    return(
        <>
        {props.funkcja==="pokój"&&inhabitant?
            <tr>
                <td>{props.numer} {props.blok}</td>
                {emptyTable}
            <button className="button">Rezerwacja</button>
            </tr>
        :<></>}
        </>
    );
}