import React, { useMemo, useState } from 'react';


function NewActive(props) {

    //const key = {props.}
    const [showForm, setshowForm] = useState(false);
    const [key_id, setKey] = useState(props.key_id);
    const [key_idDB, setKeyDB] = useState(props.key_idDB);
    const [user_id, setUser] = useState('');
    const [data, setData] = useState(Date.now());
    

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
        console.log(value)
        setData(value);
    }

    const addActive = () => {
        const value = 'active';
        const active = {
            key_id: key_id,
            user_id: user_id,
            data:data
        };
        props.onAdd(active);
        setKey('');
        setUser('');
        setData('');
        props.changeContent(value);
    }

    return(
        <div>
            <label>Klucz:</label>
            <input className = "form-control" 
            value={key_id} 
            onChange={changeKeyHandler}/>
            
            
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
                //value={data}
                value={Date.now()}
                onChange={changeDataHandler} />  

            <button onClick={() => addActive()}>Dodaj</button>
        </div>
    );
}

export default NewActive;