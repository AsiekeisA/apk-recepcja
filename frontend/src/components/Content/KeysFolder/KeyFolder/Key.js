import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Key.module.css';
import {Link} from 'react-router-dom';

const propTypes = {
    numer: PropTypes.number.isRequired,
    blok: PropTypes.string.isRequired,
    funkcja: PropTypes.string.isRequired,
    ile: PropTypes.number.isRequired,
};

function Key(props) {

    const editHandler = () => {
        props.onEdit({
            _id:props._id, 
            numer:props.numer, 
            blok:props.blok, 
            funkcja:props.funkcja, 
            ile:props.ile
        })
    }
    const newActiveHandler = () => {
        props.idIntoKey({
            _id:props._id, 
            numer:props.numer, 
            blok:props.blok, 
            funkcja:props.funkcja, 
            ile:props.ile
        })
    }
    const [btnName, setBtnName]=useState('Rozwiń')
    const [expand, setExpand] = useState(false)

    const setExpandBtn = () => {
        expand? setBtnName('Rozwiń'):setBtnName('Zwiń')
        setExpand(!expand)
    }
    return (
        <>
        <div className={`${styles.key} flexbox-container`}>
            <div className="col"><button 
                                    className={`${styles.button} btn btn-primary`}
                                    onClick={setExpandBtn}
                                    >
                                        {btnName}</button></div>
            <div className="col">{props.numer+' '+props.blok}</div>
            <div className="col">{props.funkcja}</div>
            <div className="col">{props.ile}</div>
            <div className="col"><button 
                                    className={`${styles.button} btn btn-primary`}
                                    onClick={newActiveHandler}>
                                        Rezerwuj</button></div>
            <div className="col"><button 
                                    className={`${styles.button} btn btn-primary`} 
                                    onClick={editHandler}>
                                        edytuj</button></div>
            <div className="col"><button 
                                    className={`${styles.button} btn btn-primary`} 
                                    onClick={() => {props.onDelete(props._id)}}>
                                        usuń</button></div>
        </div>
        <ul className={`${styles.who} flexbox-container`}>
            {expand &&(
            <li>
                kto pobrał klucz
            </li>
            )}
        </ul>
        </>
    );
}

Key.propTypes = propTypes;

export default Key;