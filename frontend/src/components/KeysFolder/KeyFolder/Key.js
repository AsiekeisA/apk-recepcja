import React from 'react';
import styles from './Key.module.css';

function Key(props) {

    const editHandler = () => {
        props.onEdit({
            id:props.id, 
            numer:props.numer, 
            blok:props.blok, 
            funkcja:props.funkcja, 
            ile:props.ile
        })
    }

    return (
        <div className={`${styles.key} flexbox-cointainer`}>
            <div className="col">{props.numer} {props.blok}</div>
            <div className="col">{props.funkcja}</div>
            <div className="col">{props.ile}</div>
            <div className="col"><button onClick={editHandler}>edytuj</button></div>
            <div className="col"><button className="delete" onClick={() => {props.onDelete(props.id);}}>usuń</button></div>
        </div>
    );
}

export default Key;