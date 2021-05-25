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
            type="number" 
            value={numer} 
            onChange={changeNumerHandler} />
       
        <label>Blok:</label>
        <select 
                className = "form-control" 
                type="submit"
                value={blok} 
                onChange = {changeBlokHandler}>
                <option value='A'>A</option>
                <option value='B'>B</option>
                <option value='C'>C</option>
            </select>
        
        <label>Funkcja:</label>
        <select 
                className = "form-control"
                type="submit"
                value={funkcja}
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
            className = "form-control"
            type="number" 
            value={ile}
            onChange={changeIleHandler} />

        <button onClick={() => editKey()}>Zapisz</button>
    </div>
    );
}