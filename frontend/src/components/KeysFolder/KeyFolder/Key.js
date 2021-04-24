import React from 'react';
import styles from './Key.module.css';

function Key(props) {
    return (
        <div className={styles.key}>
            <div>{props.numer} {props.blok}</div>
            <div className="funkcja">{props.funkcja}</div>
            <button>edytuj</button>
            <button className="delete">usuń</button>
        </div>
    );
}

export default Key;