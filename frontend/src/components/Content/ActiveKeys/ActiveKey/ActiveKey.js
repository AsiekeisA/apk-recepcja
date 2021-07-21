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
            data: props.data
        })
    }

    const index = [...props.keys].findIndex(x=>x._id===props.key_id)

    return (
        <div className={`${styles.key} flexbox-container`}>
            <div className="col">{props.keys[index].numer+' '+props.keys[index].blok}</div>
            <div className="col">{props.user_id}</div>
            <div className="col">{props.data}</div>
            <div className="col"><button className={`${styles.button} btn btn-primary`} onClick={editHandler}>edytuj</button></div>
            <div className="col"><button className={`${styles.button} btn btn-primary`} onClick={() => {props.onDelete(props._id)}}>usuń</button></div>
        </div>
    );
}

export default ActiveKey;