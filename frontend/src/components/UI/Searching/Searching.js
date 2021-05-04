import { useState } from 'react';
import styles from './Searching.module.css'

function Searching(props) {
    
    const [name, setName] = useState('');
    const search = () => {
        props.onSearch(name);
    }

    const onKeyDownHandler = e => {
        if (e.key === "Enter") {
            search();
        }
    }
    
    // const updateName = (e) => {
    //     setName(e.target.value);
    // }
    return (
        <div className= "row justify-content-end">
            <div className="form-group col">
                <input className={`${styles.search} form-control`}
                    value={name}
                    onKeyDown={onKeyDownHandler}
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