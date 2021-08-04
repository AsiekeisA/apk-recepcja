import React, { useState } from 'react'

export default function EditKey(props) {

    const key = [...props.keys].filter(keys=>keys._id===props.key_id);
    const user = [...props.users].filter(users=>users._id===props.user_id)
    const key_id = key[0].numer+" "+key[0].blok;
    const user_id = user[0].lastName+" "+user[0].firstName;
    const [data, setData] = useState(props.data);
    const [dataQuit, setDataQuit] = useState(props.dataQuit);

    const changeDataHandler = event => {
        const value = event.target.value;
        setData(value);
    }

    const changeDataQuitHandler = event => {
        const value = event.target.value;
        setDataQuit(value);
    }

    const editActive = () => {
        
        const active = {
            key_id: props.key_id,
            user_id: props.user_id,
            data: data,
            dataQuit:dataQuit,
            live:props.live,
            _id: props._id
        };
        props.onEdit(active);
    }

    return (
        <>
        <label>Klucz: {key_id}</label>
        <br/>
        <label>User: {user_id}</label>
        <br/>
        <label>Data zameldowania:</label>
        <input 
            className = "form-control"
            type="date" 
            value={data}
            onChange={changeDataHandler} />

        <label>Data wymeldowania:</label>
        <input 
            className = "form-control"
            type="date" 
            value={dataQuit}
            onChange={changeDataQuitHandler} />

        <button onClick={() => editActive()}>Zapisz</button>
    </>
    );
}