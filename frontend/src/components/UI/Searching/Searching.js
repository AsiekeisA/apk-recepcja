import { useContext, useEffect, useState, useRef } from 'react';
import styles from './Searching.module.css';
import JakisKontekst from '../../../context/theme';

function Searching(props) {
    
    const theme = useContext(JakisKontekst);
    const [name, setName] = useState('');

    const inputRef = useRef();

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
    const focusInput = () => {
       inputRef.current.focus();
    }

    useEffect(() => {
        focusInput();
    }, []);

    return (
        <div className= "row justify-content-end">
            <div className="form-group col">
                <input 
                    ref={inputRef}
                    className={`search ${styles.search} form-control`}
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
                    className={`${styles.button} btn btn-${theme}`}>
                        Szukaj
                    </button>
         
            </div>
        </div>
    );
}

export default Searching;