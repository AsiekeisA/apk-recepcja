import React, { useMemo } from 'react';
import styles from '../../KeysFolder/KeyFolder/Key.module.css';

/**
 * Komponent wyświetlający daną rezerwację pokoju przez mieszkańców
 * @param {*} props 
 * @returns Wiersz z informacjami o rezerwacji
 */
function ActiveKeyInhabitants(props) {

    const editHandler = event => {
        const value = event.target.value
        const a_id=[...props.active].findIndex(a=>a._id===value)
        props.onEdit({
            _id: props.active[a_id]._id, 
            key_id: props.active[a_id].key_id,
            user_id: props.active[a_id].user_id,
            data: props.active[a_id].data,
            dataQuit: props.active[a_id].dataQuit,
            live:props.active[a_id].live
        })
    }

    const newHandler = () => {
        props.makeTemp({
            _id:props._id, 
            numer:props.numer, 
            blok:props.blok, 
            funkcja:props.funkcja, 
            ile:props.ile,
            ileDost:props.ileDost,
            czyDost:props.czyDost
        })
    }

    const inhabitant = [...props.active].filter(active => active.key_id===props._id)
    const names = useMemo(() => {
        var table=[]

    if (inhabitant[0]&&inhabitant[0].live===true){
            table.push(<div className='col'>{props.numer} {props.blok}</div>)
            if (props.ile===2)
                table.push(<div className='col'></div>)
            if (props.ile===1){
                table.push(<div className='col'></div>)
                table.push(<div className='col'></div>)}
            for (let i=0; i<props.ile; i++){
            if (inhabitant[i]){
                const u_id=[...props.users].findIndex(user=>user._id===inhabitant[i].user_id)
                table.push(<div className='col'><button className={`${styles.button} btn btn-primary`} value={inhabitant[i]._id} onClick={editHandler}>{props.users[u_id].lastName} {props.users[u_id].firstName}</button></div>)
            }else{
                table.push(<div className='col'><button className={`${styles.button} btn btn-primary`} onClick={newHandler}>wynajmij</button></div>)
            }
        }

        return table
    }
},[props.active])

    return (
        <>
            {inhabitant[0]&&inhabitant[0].live===true?
            <div className={`${styles.key} flexbox-container`}>
                {names}
            </div>:<></>}
        </>
    );
}

export default ActiveKeyInhabitants;