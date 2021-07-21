import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Key.module.css';
import {Link} from 'react-router-dom';

const propTypes = {
    numer: PropTypes.number.isRequired,
    blok: PropTypes.string.isRequired,
    funkcja: PropTypes.string.isRequired,
    ile: PropTypes.number.isRequired,
    ileDost: PropTypes.number.isRequired,
    czyDost: PropTypes.bool.isRequired,
};

function Key(props) {

    const dataModel = {
        _id:props._id, 
        numer:props.numer, 
        blok:props.blok, 
        funkcja:props.funkcja, 
        ile:props.ile,
        ileDost:props.ileDost,
        czyDost:props.czyDost
    };

    const editHandler = () => {
        props.onEdit(dataModel)
    }
    const newActiveHandler = () => {
        props.idIntoKey(dataModel)
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
            <div className="col">{props.ileDost+' / '+props.ile}</div>
            {props.czyDost
                ? <div className="col"><button 
                className={`${styles.button} btn btn-primary`}
                onClick={newActiveHandler}>
                                    Rezerwuj</button></div>
                : <div className="col">Brak miejsc</div>                
                                }
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