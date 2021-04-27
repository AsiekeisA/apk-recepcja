import React, { useState } from 'react';
import styles from './Searching.module.css'

function Searching(props) {
    // props.onSearch();
    const [name, setName] = useState('');
    const search = () => {
        console.log(name);
    }
    // const updateName = (e) => {
    //     setName(e.target.value);
    // }
    return (
        <div className= "row justify-content-end">
            <div className="form-group col">
                <input className={`${styles.search} form-control`}
                    value={name}
                    onKeyDown={e => e.key==='Enter' && search()}
                    onChange={e => setName(e.target.value)}
                    type="text"
                    placeholder="Szukaj..." 
                />
                    
            </div>
            <div className="col">
                <button 
                onClick = {search}
                    className={`${styles.button} btn btn-primary`}>
                        Szukaj
            </button></div>
        </div>
    );
}

export default Searching;