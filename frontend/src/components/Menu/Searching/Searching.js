import React from 'react';
import styles from './Searching.module.css'

function Searching() {
    return (
        <div className={`${styles.search} flex-container`}>
            <input 
                
                type="text"
                placeholder="Szukaj..." />
                <button className={`${styles.button} btn btn-primary`}>Szukaj</button>
        </div>
    );
}

export default Searching;