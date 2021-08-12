import { useEffect, useState, useMemo } from "react";
import Modal from 'react-modal'
import RoomKeyCalendar from "./RoomsKey/RoomKeyCalendar";
import "./RoomsCalendar.css";

function RoomsCalendar(props) {
    const monthsName = [
        "Styczeń",
        "Luty",
        "Marzec",
        "Kwiecień",
        "Maj",
        "Czerwiec",
        "Lipiec",
        "Sierpień",
        "Wrzesień",
        "Październik",
        "Listopad",
        "Grudzień"
    ]
    const numberOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const today = new Date();
    const [year, setYear]= useState(today.getFullYear());
    const [month, setMonth]=useState(today.getMonth());
    const [monthTable, setMonthTable] = useState([]);
    const [editTemp, setEdit] = useState({});
    const [showModal, setShowModal] = useState(false);
    const active =useMemo(()=>{return [...props.active]
                    .filter(x=>(new Date(x.data).getMonth()===month
                            ||new Date(x.dataQuit).getMonth()===month
                            ))},[props.active])
// const [emptyTable, setEmpty] = useState([]);
    const nrMonth=month+1
    const tableMaker = () =>{
        const table = [<td key="header">Klucze</td>];
        // const empty = [];
        for(var i=1; i<=numberOfDays[month]; i++){
            table.push(<>
            <td className={year===today.getFullYear()&&month===today.getMonth()&&i===today.getDate()?"day-today":"day"}
              id={i} key={i} >{i}.</td>
            <td className={year===today.getFullYear()&&month===today.getMonth()&&i===today.getDate()?"month-today":"month"}  
              id={i} key={i+100} >{nrMonth<10?"0"+nrMonth:nrMonth}</td></>);
            // empty.push(<td className={colorChange(i)} width="25px" height="25px" key={i}></td>);
        }
        setMonthTable(table);
        // setEmpty(empty);
    }
    const colorChange = (i,bool) => {
        if (bool){
            return "td-reserved";
        }else{
            if(year===today.getFullYear()&&month===today.getMonth()&&i===today.getDate()){
                return "td-today";
            }
            return "td";
        }
    }

    useEffect(()=>{
        Modal.setAppElement('body'); 
     },[]);

    useEffect(()=>{
        tableMaker();
    },[month, props.active])

    const monthBefore = () =>{
        if(month===0){
            setMonth(11);
            setYear(year-1);
        }else{
            setMonth(month-1);
        }
    }
    const monthAfter = () =>{
        if(month===11){
            setMonth(0);
            setYear(year+1);
        }else{
            setMonth(month+1);
        }
    }
    const thisMonth = () =>{
        setYear(today.getFullYear());
        setMonth(today.getMonth());
    }
    //throw new Error('Kalendarz')
  
return(<>
  <style>{`
    td{
     border:1px solid black;
    }
  `}</style>
    <div className="flexbox-container">
        {/* <Modal isOpen={showModal} contentLabel="Edycja">
            <EditActive
                key_id={editTemp.key_id}
                user_id={editTemp.user_id}
                data={editTemp.data}
                dataQuit={editTemp.dataQuit}
                live={editTemp.live}
                _id={editTemp._id}
                keys={props.keys}
                users={props.users}
                onEdit={active => editActive(active)}
                onDelete={(_id,data) => checkDelete(_id, data)} />         
                <button onClick={() => toggleModal()}>Wyjdź</button>
        </Modal> */}
        <button className="button" onClick={monthBefore}>{month===0?monthsName[11]:monthsName[month-1]}</button>
        <button className="button" onClick={thisMonth}>Bieżący miesiąc</button>
        <button className="button" onClick={monthAfter}>{month===11?monthsName[0]:monthsName[month+1]}</button>
        rok : {year}, miesiąc : {monthsName[month]}
    </div>
    <div>
    <table>
        <thead><tr>{monthTable}</tr></thead>
        <tbody>
        {props.backKeys.filter(x=>x.funkcja==="pokój")
            .sort((a, b) => a.numer > b.numer ? -1 : 1)
            .sort((a, b) => a.blok > b.blok ? 1 : -1)
            .map(keys => (
               <RoomKeyCalendar
                key={keys._id}
                users={props.users}
                {...keys}
                active={active}
                year={year}
                month={month}
                monthTable={monthTable}
                lengthOfMonth={numberOfDays[month]}
                colorChange={colorChange}
                onEdit={props.editTemp}
                makeTemp={props.makeTemp}
                />))}
        </tbody>
    </table>
    </div>
    
    </>
);
} 

export default RoomsCalendar;