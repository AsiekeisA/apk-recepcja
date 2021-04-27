import React, { useState } from 'react'

export default function EditKey(props) {

    const [numer, setNumer] = useState(props.numer);
    const [blok, setBlok] = useState(props.blok);
    const [funkcja, setFunkcja] = useState(props.funkcja);
    const [ile, setIle] = useState(props.ile);

    const changeNumerHandler = event => {
        const value = event.target.value;
        setNumer(value);
    }

    const changeBlokHandler = event => {
        const value = event.target.value;
        setBlok(value);
    }

    const changeFunkcjaHandler = event => {
        const value = event.target.value;
        setFunkcja(value);
    }

    const changeIleHandler = event => {
        const value = event.target.value;
        setIle(value);
    }

    const editKey = () => {
        const key = {
            numer: numer,
            blok: blok,
            funkcja: funkcja,
            ile: ile,
            _id: props._id
        };
        props.onEdit(key);
    }

    return (
        <div>
        <label>Numer:</label>
        <input 
            className = "form-control"
            type="text" 
            value={numer} 
            onChange={changeNumerHandler} />
       
        <label>Blok:</label>
        <input
            className = "form-control"
            type="text" 
            value={blok}
            onChange={changeBlokHandler} />
        
        <label>Funkcja:</label>
        <input 
            className = "form-control"
            type="text" 
            value={funkcja}
            onChange={changeFunkcjaHandler} />  
    
        <label>Ilość:</label>
        <input 
            className = "form-control"
            type="text" 
            value={ile}
            onChange={changeIleHandler} />

        <button onClick={() => editKey()}>Zapisz</button>
    </div>
    );
}