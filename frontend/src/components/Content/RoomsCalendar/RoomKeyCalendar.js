export default function RoomKeyCalendar(props) {
    const inhabitant = [...props.active].filter(active=>active.key_id===props._id).filter(active=>active.live===true)[0]?false:true;
    const active = [...props.active].filter(active=>active.key_id===props._id).filter(active=>active.live===false);
//sprawdzanie daty czy jest widoczna jeśli tak maluj od data do dataQuit....dla każdego active TO TABLICA !!! 
    return(
        <>
        {props.funkcja==="pokój"&&inhabitant?
            <tr>
                <td>{props.numer} {props.blok}</td>
                {props.emptyTable}
            </tr>
        :<></>}
        </>
    );
}