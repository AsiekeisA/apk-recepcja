import React from 'react';
import styles from './Searching.module.css'

function Searching() {
    return (
        <div className= "row justify-content-end">
            <div className="form-group col">
                <input className={`${styles.search} form-control`}
                    type="text"
                    placeholder="Szukaj..." />
                    
            </div>
            <div className="col"><button className={`${styles.button} btn btn-primary`}>Szukaj</button></div>
        </div>
    );
}

export default Searching;