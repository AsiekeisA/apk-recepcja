import React, { useMemo, useState } from 'react';
import axios from '../../../../axios'


function NewActive(props) {

    //const key = {props.}
    
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
    const onAdd = async(aactive) => {
        const actives = [...props.active];
        const res = await axios.post('/active', aactive);
        const newActive = res.data;
        actives.push(newActive);
        props.setActive(actives);
        console.log('dodawanie');
      }
    const addActive = () => {
        const value = 'active';
        const active = {
            key_id: key_id,
            user_id: user_id,
            data:data
        };
        onAdd(active);
        setKey('');
        setUser('');
        setData('');
        props.setKeyA('');
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