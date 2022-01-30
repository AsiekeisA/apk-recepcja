import React, { useState, useEffect } from 'react';
import styles from '../KeyFolder/Key.module.css';

function NewKey(props) {

    const [showForm, setshowForm] = useState(false);
    const [newKey, setNewKey] = useState({
        numer: '',
        blok: 'A',
        funkcja: 'pokój',
        ile: '',
        czyDost: true
    })

    const [errors, setErrors] = useState({
        numer: '',
        blok: '',
        ile: ''
    })

    const changeNumerHandler = event => {
        const value = event.target.value;
        setNewKey({...newKey, numer: value});
    }

    const changeBlokHandler = event => {
        const value = event.target.value;
        setNewKey({...newKey, blok: value});
    }

    const changeFunkcjaHandler = event => {
        const value = event.target.value;
        setNewKey({...newKey, funkcja: value});
    }

    const changeIleHandler = event => {
        const value = event.target.value;
        setNewKey({...newKey, ile: value});
    }

    const addKey = () => {
        const key = {
            numer: newKey.numer,
            blok: newKey.blok,
            funkcja: newKey.funkcja,
            ile: newKey.ile,
            ileDost: newKey.ile,
            czyDost: newKey.czyDost
        };
        props.onAdd(key);
        setNewKey({})
        setshowForm(false);
    }

    const sameKey = () => {
        const sameNumber = [...props.keys]
                .filter(x=>x.numer==newKey.numer)
                .filter(x=>x.blok===newKey.blok)
        if ( sameNumber[0] ) {
            return true 
        } else {
            return false
        }
    }

    useEffect (() => {
        if (isNaN(newKey.numer)) {
            setErrors({...errors, numer: 'Podaj numer'})
        }else if (sameKey()){
            setErrors({...errors, numer: 'Istnieje pokój o takim numerze i bloku'},
                    {...errors, blok: 'Istnieje pokój o takim numerze i bloku'})
           // setErrors({...errors, numer: 'Istnieje pokój o takim numerze i bloku'})
        }else{
            setErrors({...errors, numer: ''},{...errors, blok: ''})
            //setErrors({...errors, blok: ''})
        }
    }, [newKey.numer])

    useEffect (() => {
        if (sameKey()){
            setErrors({...errors, numer: 'Istnieje pokój o takim numerze i bloku'},
                    {...errors, blok: 'Istnieje pokój o takim numerze i bloku'})
            //setErrors({...errors, blok: 'Istnieje pokój o takim numerze i bloku'})
        }else{
            setErrors({...errors, numer: ''},{...errors, blok: ''})
           // setErrors({...errors, blok: ''})
        }
    }, [newKey.blok])


    useEffect (() => {
        if (isNaN(newKey.ile)&&newKey.ile>0) {
        setErrors({...errors, ile: 'Podaj poprawną ilość'})
        }else{
            setErrors({...errors, ile: ''})
        }
    }, [newKey.ile])

    const disabledBtn = 
        Object.values(errors).filter(x => x).length 
        || !(Object.values(newKey).filter(x => x).length===5)

    return(
        showForm ? (
        <div>
            <label>Numer:</label>
            <input 
                className = {`form-control ${errors.numer ? 'is-invalid' : ''}`}
                type="text" 
                value={newKey.numer} 
                onChange={changeNumerHandler} />
                <div className="invalid-feedback">
                    {errors.numer}
                </div> 
            <br/>
            <label>Blok:</label>
            <select 
                className = {`form-control ${errors.blok ? 'is-invalid' : ''}`} 
                type="submit"
                value={newKey.blok} 
                onChange = {changeBlokHandler}>
                <option value='A'>A</option>
                <option value='B'>B</option>
                <option value='C'>C</option>
            </select>
            <div className="invalid-feedback">
                    {errors.blok}
            </div> 
            <br/>
            <label>Funkcja:</label>
            <select 
                className = "form-control"
                type="submit"
                value={newKey.funkcja}
                onChange={changeFunkcjaHandler}>
                <option value='pokój'>pokój</option>
                <option value='sala wykładowa'>sala wykładowa</option>
                <option value='sala komputerowa'>sala komputerowa</option>
                <option value='pralnia'>pralnia</option>
                <option value='aula'>aula</option>
                <option value='pokój cichej nauki'>pokój cichej nauki</option>
            </select>  
            <br/>
            <label>Ilość:</label>
            <input 
                className = {`form-control ${errors.ile ? 'is-invalid' : ''}`}
                type="number" 
                value={newKey.ile}
                onChange={changeIleHandler} />
                <div className="invalid-feedback">
                    {errors.ile}
                </div> 

            <button className={`${styles.button} btn btn-primary`} onClick={() => addKey()} disabled={disabledBtn}>Dodaj klucz</button>
        </div>
        ) : (
            <button className={`${styles.button} btn btn-primary`} onClick={() => setshowForm(true)}>Nowy klucz</button>
        )
    );
}

export default NewKey;