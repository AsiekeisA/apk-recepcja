import React, { useState } from 'react';


function NewKey(props) {

    const [showForm, setshowForm] = useState(false);
    const [numer, setNumer] = useState('');
    const [blok, setBlok] = useState('');
    const [funkcja, setFunkcja] = useState('');
    const [ile, setIle] = useState('');

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

    const addKey = () => {
        const key = {
            numer: numer,
            blok: blok,
            funkcja: funkcja,
            ile: ile
        };
        props.onAdd(key);
        setNumer('');
        setBlok('');
        setFunkcja('');
        setIle('');
        setshowForm(false);
    }

    return(
        showForm ? (
        <div>
            <label>Numer:</label>
            <input 
                className = "form-control"
                type="text" 
                value={numer} 
                onChange={changeNumerHandler} />
            <br/>
            <label>Blok:</label>
            <input 
                className = "form-control"
                type="text" 
                value={blok}
                onChange={changeBlokHandler} />
            <br/>
            <label>Funkcja:</label>
            <input 
                className = "form-control"
                type="text" 
                value={funkcja}
                onChange={changeFunkcjaHandler} />  
            <br/>
            <label>Ilość:</label>
            <input 
                className = "form-control"
                type="text" 
                value={ile}
                onChange={changeIleHandler} />

            <button onClick={() => addKey()}>Dodaj klucz</button>
        </div>
        ) : (
            <button className="btn btn-primary" onClick={() => setshowForm(true)}>Nowy klucz</button>
        )
    );
}

export default NewKey;