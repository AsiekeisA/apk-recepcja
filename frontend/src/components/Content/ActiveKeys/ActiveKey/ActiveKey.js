import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../../KeysFolder/KeyFolder/Key.module.css';
import {Link} from 'react-router-dom';

function ActiveKey(props) {

    const editHandler = () => {
        props.onEdit({
            _id: props._id, 
            key_id: props.key_id,
            user_id: props.user_id,
            data: props.data,
            dataQuit: props.dataQuit,
            live:props.live
        })
    }

    const keyIndex = [...props.backKeys].findIndex(x=>x._id===props.key_id)
    const userIndex = [...props.users].findIndex(x=>x._id===props.user_id)
    const date=new Date(props.data).toLocaleDateString();
    const dateQ=new Date(props.dataQuit).toLocaleDateString();

    return (
        <div className={`${styles.key} flexbox-container`}>
            <div className="col">{props.backKeys[keyIndex].numer+' '+props.backKeys[keyIndex].blok}</div>
            <div className="col">{props.users[userIndex].lastName+' '+props.users[userIndex].firstName}</div>
            <div className="col">{date} - {dateQ}</div>
            <div className="col"><button className={`${styles.button} btn btn-primary`} onClick={editHandler}>edytuj</button></div>
            <div className="col"><button className={`${styles.button} btn btn-primary`} onClick={() => {props.onDelete(props._id)}}>usuń</button></div>
        </div>
    );
}

export default ActiveKey;