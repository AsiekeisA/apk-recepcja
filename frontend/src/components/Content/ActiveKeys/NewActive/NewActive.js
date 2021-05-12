import React, { useState } from 'react';


function NewActive(props) {

    const [showForm, setshowForm] = useState(false);
    const [key_id, setKey] = useState('');
    const [user_id, setUser] = useState('');
    const [data, setData] = useState('');

    const changeKeyHandler = event => {
        const value = event.target.value;
        setKey(value);
    }

    const changeUserHandler = event => {
        const value = event.target.value;
        setUser(value);
    }

    const changeDataHandler = event => {
        const value = event.target.value;
        setData(value);
    }

    const addActive = () => {
        const active = {
            key_id: key_id,
            user_id: user_id,
            data: data,
        };
        props.onAdd(active);
        setKey('');
        setUser('');
        setData('');
        setshowForm(false);
    }

    return(
        showForm ? (
        <div>
            <label>Klucz:</label>
            <input 
                className = "form-control"
                type="text" 
                value={key_id} 
                onChange={changeKeyHandler} />
            <br/>
            <label>User:</label>
            <input 
                className = "form-control"
                type="text" 
                value={user_id}
                onChange={changeUserHandler} />
            <br/>
            <label>Data:</label>
            <input 
                className = "form-control"
                type="date" 
                value={data}
                onChange={changeDataHandler} />  

            <button onClick={() => addActive()}>Dodaj</button>
        </div>
        ) : (
            <button className="btn btn-primary" onClick={() => setshowForm(true)}>Nowy</button>
        )
    );
}

export default NewActive;