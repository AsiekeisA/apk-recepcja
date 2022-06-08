import React, { useState, useEffect } from 'react'

/**
 * 
 * @param {Object} props 
 * @returns formularz edycji klucza
 */
export default function EditKey(props) {

    const [editKey, setEditKey] = useState({
        numer: props.numer,
        blok: props.blok,
        funkcja: props.funkcja,
        ile: props.ile,
        ileDost: props.ileDost,
        czyDost: props.czyDost,
    })
    const minus = props.ile-props.ileDost

    const [errors, setErrors] = useState({
        numer: '',
        blok: '',
        ile: ''
    })

    const changeNumerHandler = event => {
        const value = event.target.value;
        setEditKey({...editKey, numer: value});
    }

    const changeBlokHandler = event => {
        const value = event.target.value;
        setEditKey({...editKey, blok: value});
    }

    const changeFunkcjaHandler = event => {
        const value = event.target.value;
        setEditKey({...editKey, funkcja: value});
    }

    const changeIleHandler = event => {
        const value = event.target.value;
        setEditKey({...editKey, ile: value});
    }

    /**
     * Funkcja tworząca zedytowany obiekt klucza
     */
    const onEditKey = () => {
        const key = {
            numer: editKey.numer,
            blok: editKey.blok,
            funkcja: editKey.funkcja,
            ile: editKey.ile,
            ileDost: editKey.ile-minus,
            czyDost: editKey.czyDost,
            _id: props._id
        };
        props.onEdit(key);
    }

    const sameKey = () => {
        const sameNumber = [...props.keys].filter(x=>x.numer==editKey.numer).filter(x=>x.blok===editKey.blok)
        console.log(sameNumber[0])
        if ( sameNumber[0] ) {
            return true 
        } else {
            return false
        }
    }

    useEffect (() => {
        if (isNaN(editKey.numer)) {
        setErrors({...errors, numer: 'Podaj numer'})
        }else if (sameKey()){
            setErrors({...errors, numer: 'Istnieje pokój o takim numerze i bloku'},{...errors, blok: 'Istnieje pokój o takim numerze i bloku'})
           // setErrors({...errors, numer: 'Istnieje pokój o takim numerze i bloku'})
        }else{
            setErrors({...errors, numer: ''})
        }
    }, [editKey.numer])

    useEffect (() => {
        if (sameKey()){
            setErrors({...errors, numer: 'Istnieje pokój o takim numerze i bloku'},{...errors, blok: 'Istnieje pokój o takim numerze i bloku'})
            //setErrors({...errors, blok: 'Istnieje pokój o takim numerze i bloku'})
        }else{
            setErrors({...errors, numer: ''},{...errors, blok: ''})
           // setErrors({...errors, blok: ''})
        }
    }, [editKey.blok])

    useEffect (() => {
        if (isNaN(editKey.ile)) {
        setErrors({...errors, ile: 'Podaj poprawną ilość'})
        }else{
            setErrors({...errors, ile: ''})
        }
    }, [editKey.ile])

    const disabledBtn = 
        Object.values(errors).filter(x => x).length 
        || !(Object.values(editKey).filter(x => x).length===6)

    return (
        <div>
        <label>Numer:</label>
        <input 
            className = {`form-control ${errors.numer ? 'is-invalid' : ''}`}
            type="text" 
            value={editKey.numer} 
            onChange={changeNumerHandler} />
            <div className="invalid-feedback">
                    {errors.numer}
            </div>
       
        <label>Blok:</label>
        <select 
                className = {`form-control ${errors.blok ? 'is-invalid' : ''}`} 
                type="submit"
                value={editKey.blok} 
                onChange = {changeBlokHandler}>
                <option value='A'>A</option>
                <option value='B'>B</option>
                <option value='C'>C</option>
            </select>
            <div className="invalid-feedback">
                    {errors.blok}
            </div>
        
        <label>Funkcja:</label>
        <select 
                className = "form-control"
                type="submit"
                value={editKey.funkcja}
                onChange={changeFunkcjaHandler}>
                <option value='pokój'>pokój</option>
                <option value='sala wykładowa'>sala wykładowa</option>
                <option value='sala komputerowa'>sala komputerowa</option>
                <option value='pralnia'>pralnia</option>
                <option value='aula'>aula</option>
                <option value='pokój cichej nauki'>pokój cichej nauki</option>
            </select>  
    
        <label>Ilość:</label>
        <input 
            className = {`form-control ${errors.ile ? 'is-invalid' : ''}`}
            type="number" 
            value={editKey.ile}
            onChange={changeIleHandler} />
            <div className="invalid-feedback">
                    {errors.ile}
            </div>

        <button onClick={() => onEditKey()} disabled={disabledBtn}>Zapisz</button>
    </div>
    );
}