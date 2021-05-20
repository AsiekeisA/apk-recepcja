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

    const blokRef = React.useRef();

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
            <select 
                className = "form-control" 
                type="text"
                value={blok} 
                onChange = {changeBlokHandler}>
                <option value='A'>A</option>
                <option value='B'>B</option>
                <option value='C'>C</option>
            </select>
            <br/>
            <label>Funkcja:</label>
            <select 
                className = "form-control"
                type="text"
                value={funkcja}
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