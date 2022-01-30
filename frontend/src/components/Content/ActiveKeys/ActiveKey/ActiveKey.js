import React, { useEffect } from 'react';
import styles from '../../KeysFolder/KeyFolder/Key.module.css';

function ActiveKey(props) {

    const editHandler = () => {
        props.onEdit({
            _id: props._id, 
            key_id: props.key_id,
            user_id: props.user_id,
            data: props.data,   
        })
    }

    const keyIndex = [...props.backKeys].findIndex(x=>x._id===props.key_id)
    const userIndex = [...props.users].findIndex(x=>x._id===props.user_id)
    const date=new Date(props.data).toLocaleString();


    return (
        <>
        {props.backKeys[keyIndex].funkcja!='pokój'?
        <div className={`${styles.key} flexbox-container`}>
        <div className="col">{props.backKeys[keyIndex].numer+' '+props.backKeys[keyIndex].blok}</div>
        <div className="col">{props.users[userIndex].lastName+' '+props.users[userIndex].firstName}</div>
        <div className="col">{date}</div>
        <div className="col"><button className={`${styles.button} btn btn-primary`} onClick={() => {props.onDelete(props._id, props.data)}}>Zwrot</button></div>
        </div>
    :<></>}</>);
}

export default ActiveKey;