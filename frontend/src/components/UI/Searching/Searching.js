import { useContext, useEffect, useState, useRef } from 'react';
import styles from './Searching.module.css';
import JakisKontekst from '../../../context/theme';

/**
 * Komonent obsługujący wyszukiwarkę
 * @param props
 * @param props.onSearch wywołanie funkcji searchHandler()
 * @returns okienko do wpisywania i przycisk wyszukiwarki
 */
function Searching(props) {
    
    const theme = useContext(JakisKontekst);
    const [name, setName] = useState('');

    const inputRef = useRef();

/**
 * Funkcja wywołująca funkcję  searchHandler
 * @function Search
 */
    const search = () => {
        props.onSearch(name);
    }

/**
 * Funkcja umożliwiająca wyszukiwanie po naciśnięciu przycisku ENTER
 * @param {Event} e zdarzenie
 */
    const onKeyDownHandler = e => {
        if (e.key === "Enter") {
            search();
        }
    }
    
    // const updateName = (e) => {
    //     setName(e.target.value);
    // }

/**
 * Funkcja, ustawiająca kursor w polu do wpisywania wyszukiwarki
 * @function focusInput
 */    
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