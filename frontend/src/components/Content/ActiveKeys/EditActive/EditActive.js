import React, { useState } from 'react'

export default function EditKey(props) {

    const [key_id, setKey] = useState(props.key_id);
    const [user_id, setUser] = useState(props.user_id);
    const [data, setData] = useState(props.data);

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

    const editActive = () => {
        const active = {
            key_id: key_id,
            user_id: user_id,
            data: data,
            _id: props._id
        };
        props.onEdit(active);
    }

    return (
        <>
        <label>Klucz:</label>
        <input 
            className = "form-control"
            type="text" 
            value={key_id} 
            onChange={changeKeyHandler} />
       
        <label>User:</label>
        <input
            className = "form-control"
            type="text" 
            value={user_id}
            onChange={changeUserHandler} />
        
        <label>Data:</label>
        <input 
            className = "form-control"
            type="date" 
            value={data}
            onChange={changeDataHandler} />  

        <button onClick={() => editActive()}>Zapisz</button>
    </>
    );
}