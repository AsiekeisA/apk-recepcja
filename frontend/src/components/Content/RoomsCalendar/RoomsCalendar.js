import { useEffect, useState } from "react";
import RoomKeyCalendar from "./RoomsKey/RoomKeyCalendar";
import "./RoomsCalendar.css";

export default function RoomsCalendar(props) {
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
    // const [emptyTable, setEmpty] = useState([]);
    const tableMaker = () =>{
        const table = [<td key="header">Klucze</td>];
        // const empty = [];
        for(var i=1; i<=numberOfDays[month]; i++){
            table.push(<td className={colorChange(i)}  width="25px" height="25px" id={i} key={i} >{i}</td>);
            // empty.push(<td className={colorChange(i)} width="25px" height="25px" key={i}></td>);
        }
        setMonthTable(table);
        // setEmpty(empty);
    }
    const colorChange = (id, bool) => {
        if(year===today.getFullYear()&&month===today.getMonth()&&id===today.getDate()){
            if (bool){
                return "td-reserved-today";
            }else{
                return "td-today";
            }
        }else if (bool){
            return "td-reserved";
        }else{
            return "td";
        }
    }

    useEffect(()=>{
        tableMaker();
    },[month, props.keys])

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

return(<>
  <style>{`
    td{
     border:1px solid black;
    }
  `}</style>
    <div>
        <button className="button" onClick={monthBefore}>{month===0?monthsName[11]:monthsName[month-1]}</button>
        <button className="button" onClick={thisMonth}>Bieżący miesiąc</button>
        <button className="button" onClick={monthAfter}>{month===11?monthsName[0]:monthsName[month+1]}</button>
        rok : {year}, miesiąc : {monthsName[month]}
    </div>
    <div>
    <table>
        <tbody>
            <tr>{monthTable}</tr>
        {props.backKeys.sort((a, b) => a.numer > b.numer ? -1 : 1)
            .sort((a, b) => a.blok > b.blok ? 1 : -1)
            .map(keys => (
               <RoomKeyCalendar
                key={keys._id}
                {...keys}
                active={props.active}
                year={year}
                month={month}
                monthTable={monthTable}
                lengthOfMonth={numberOfDays[month]}
                colorChange={colorChange}
        />))}
        </tbody>
    </table>
    </div>
    
    </>
);
} 