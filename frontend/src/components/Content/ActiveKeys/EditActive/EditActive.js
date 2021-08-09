import React, { useState } from 'react'
import axios from '../../../../axios';

export default function EditKey(props) {

    const key = [...props.keys].filter(keys=>keys._id===props.key_id);
    const user = [...props.users].filter(users=>users._id===props.user_id)
    const key_id = key[0].numer+" "+key[0].blok;
    const user_id = user[0].lastName+" "+user[0].firstName;
    const [data, setData] = useState(props.data);
    const [dataQuit, setDataQuit] = useState(props.dataQuit);
    const [editMode, setEditMode] = useState(false)
    const [dataShow, setDataShow] = useState(new Date(data).toLocaleDateString())
    const [dataQuitShow, setDataQuitShow] = useState(new Date(dataQuit).toLocaleDateString())
    const [timeShow, setTimeShow] = useState(new Date(data).toLocaleTimeString()) 


    const changeDataHandler = event => {
        const value = event.target.value;
        setData(value);
    }

    const changeDataQuitHandler = event => {
        const value = event.target.value;
        setDataQuit(value);
    }

    const keyNum = (_id, num) => {
        const ID = [...props.active].filter(active=>active._id === _id);
        const keyID = [...props.keys].filter(keys => keys._id === ID[0].key_id);
        const ileDost = keyID[0].ileDost+num;
        const czyDost = ileDost===0?false:true

        const key = {
            _id: keyID[0]._id,
            numer: keyID[0].numer,
            blok: keyID[0].blok,
            funkcja: keyID[0].funkcja,
            ile: keyID[0].ile,
            ileDost: keyID[0].ileDost+num,
            czyDost: czyDost
        }
        console.log(key);
        editKey(key);
    }
    
    const editKey = async(key) => {
        await axios.put('/keys/'+ key._id, key);
        const keys = [...props.backKeys];
        const index = keys.findIndex(x => x._id === key._id);
        if(index >=0) {
            keys[index] = key;
            console.log(keys);
            props.setBackKeys(keys);
            props.setKeys(keys);
        }
    }

    const deleteActive = async(_id) => {
        console.log('usuwanie', _id);
        const actives = [...props.active].filter(active => active._id !== _id);
        await axios.delete('/active/'+ _id);
        props.setActive(actives);
        console.log(props.keys);
    }

    const toArchive = async(newArch) => {
        const archives = [...props.archives];
        const res = await axios.post('/archives', newArch);
        const newArchives = res.data;
        archives.push(newArchives);
        props.setArchives(archives);
        console.log('do archiwum');
      }

    const makeArchives = (_id) => {
        const a_id =[...props.active].findIndex(x=>x._id===_id) 
        const newArch = {
            key_id: props.active[a_id].key_id,
            user_id:  props.active[a_id].user_id,
            data:  props.active[a_id].data,
            dataQuit: new Date().toISOString(),
            live: props.active[a_id].live
        }
        toArchive(newArch);
    }

    const checkDelete = (_id, date) => {
        const data = new Date(date).toISOString().slice(0,10);
        console.log(date, data);
        if(Date.parse(date)!=Date.parse(data)){
            keyNum(_id,1);
            makeArchives(_id)
        }
        deleteActive(_id)
        cancel();
    }

    const onEdit = async(active) => {
        console.log(active)
        await axios.put('/active/'+ active._id, active);
        const actives = [...props.active];
        const index = actives.findIndex(x => x._id === active._id);
        if(index >=0) {
            actives[index] = active;
            props.setActive(actives);
        }
      }      

    const editActive = (edit) => {
        const now = new Date().toISOString();
        const date = edit? data:now
        
        const active = {
            key_id: props.key_id,
            user_id: props.user_id,
            data: date,
            dataQuit:dataQuit,
            live:props.live,
            _id: props._id
        };
        const dataS=new Date(date).toLocaleDateString()
        const dataF=new Date(dataQuit).toLocaleDateString()
        const time=new Date(date).toLocaleTimeString()
        setDataShow(dataS);
        setDataQuitShow(dataF);
        setTimeShow(time)
        console.log(active)
       onEdit(active);
    }

    const setting = () => {
        setEditMode(!editMode)
    }

    const takeKey = (_id) => {
        keyNum(_id,-1)
        editActive(false);
        cancel();
    }

    const backKey = () => {
    }

    const editing = () =>{
        editActive(true);
        setting();
    }


    const cancel = () => {
        props.changeContent(props.lastContent)
    }

    return (
        <>
        <h4>Informacje o rezerwacji</h4>
        <label>Klucz: {key_id}</label>
        <br/>
        <label>User: {user_id}</label>
        <br/>
        {editMode?
        <>
            {Date.parse(new Date(data).toISOString().slice(0,10))!=Date.parse(data)?
            <><label>Data zameldowania: {dataShow}</label><br/></>
            :<>
                <label>Data zameldowania:</label>
                <input 
                    className = "form-control"
                    type="date" 
                    value={data}
                    onChange={changeDataHandler} />
            </>}

            <label>Data wymeldowania:</label>
            <input 
                className = "form-control"
                type="date" 
                value={dataQuit}
                onChange={changeDataQuitHandler} />

            <button onClick={editing}>Zapisz</button>
            <button onClick={setting}>Anuluj</button>
        </>
        :<>
            <label>Data rezerwacji: {dataShow} - {dataQuitShow}</label>
            {Date.parse(new Date(data).toISOString().slice(0,10))!=Date.parse(data)?
                
            <>
                <br/>
                <label>Godzina zameldowania: {timeShow} </label></>:<>
            </>}
            <br/><br/>
            <button onClick={()=>takeKey(props._id)}>Pobranie klucza</button>
            <button onClick={setting}>Edytuj rezerwację</button>
            <button onClick={()=>checkDelete(props._id, data)}>Usuń rezerwację</button>
            <button onClick={cancel}>Cofnij</button>
        </>}
    </>
    );
}