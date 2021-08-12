import React, { useState, useEffect } from 'react';
import ActiveKeyContent from './ActiveKey/ActiveKeyContent';
import styles from '../KeysFolder/Keys.module.css';
import DataHeader from '../../DataHeader/DataHeader';
import Modal from 'react-modal';
import EditActive from './EditActive/EditActive.js';
import axios from '../../../axios';

function ActiveKeys(props) {
    const [editTemp, setEdit] = useState({});
    const [showEditModal, setEditModal] = useState(false);
    useEffect(()=>{
       Modal.setAppElement('body'); 
    },[]);
    
    const oddawanie = (_id) => {
        const ID = [...props.active].filter(active=>active._id === _id);
        const keyID = [...props.keys].filter(keys => keys._id === ID[0].key_id);
        console.log(keyID[0]);
        const key = {
            _id: keyID[0]._id,
            numer: keyID[0].numer,
            blok: keyID[0].blok,
            funkcja: keyID[0].funkcja,
            ile: keyID[0].ile,
            ileDost: keyID[0].ileDost+1,
            czyDost: true
        }
        editKey(key);
    }
    
    const editKey = async(key) => {
        console.log(key);
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
            dataQuit: new Date().toLocaleString(),
            live: props.active[a_id].live
        }
        toArchive(newArch);
    }

    const checkDelete = (_id, date) => {
        const data = new Date(date).toISOString().slice(0,10);
        console.log(date, data);
        if(Date.parse(date)!=Date.parse(data)){
            oddawanie(_id);
            makeArchives(_id)
        }
        deleteActive(_id)
    }

    const editActive = async(active) => {
        console.log(active)
        const today = Date.now();
        const todayFormat = Intl.DateTimeFormat('pl-PL', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(today);
       
        await axios.put('/active/'+ active._id, active);
        const actives = [...props.active];
        const index = actives.findIndex(x => x._id === active._id);
        if(index >=0) {
            actives[index] = active;
            props.setActive(actives);
        }
      // toggleModal();
    }

    const toggleModal = () => {
        setEditModal(!showEditModal);
    }

    const editActiveHandler = (active) => {

         setEdit(active);
     }

    return (
        <div className={`${styles.keys} flexbox-container`}>
            {/* <Modal isOpen={showEditModal} contentLabel="Edycja">
                <EditActive
                    key_id={editTemp.key_id}
                    user_id={editTemp.user_id}
                    data={editTemp.data}
                    dataQuit={editTemp.dataQuit}
                    live={editTemp.live}
                    _id={editTemp._id}
                    keys={props.keys}
                    users={props.users}
                    onEdit={active => editActive(active)} 
                    onDelete={(_id) => deleteActive(_id)}/>
                <button onClick={() => toggleModal()}>Wyjście</button>
            </Modal> */}
            {/* <NewActive 
                onAdd={(active) => addActive(active)}/> */}
            <DataHeader 
                content={props.content}
                setItems={props.setActive}
                items={props.active}
                />
                <ActiveKeyContent
                    backKeys={props.backKeys}
                    active={props.active}
                    content={props.content}
                    users={props.users}
                    makeTemp={props.makeTemp}
                    onEdit={(active) => props.editTemp(active)}
                    onDelete={(_id, date) => checkDelete(_id, date)}
                ></ActiveKeyContent>
        </div>
        );
}

export default ActiveKeys;