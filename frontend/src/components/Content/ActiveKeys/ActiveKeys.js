import React, { useState, useEffect } from 'react';
import ActiveKey from './ActiveKey/ActiveKey';
import styles from '../KeysFolder/Keys.module.css';
import Rooms from './headerActive';
import NewActive from './NewActive/NewActive.js';
import Modal from 'react-modal';
import EditActive from './EditActive/EditActive.js';
import axios from '../../../axios';

function ActiveKeys(props) {
    const [editTemp, setEdit] = useState({});
    const [showEditModal, setEditModal] = useState(false);
    useEffect(()=>{
       Modal.setAppElement('body'); 
    },[]);
    
    const deleteActive = async(_id) => {
        console.log('usuwanie', _id);
        const actives = [...props.active].filter(active => active._id !== _id);
        await axios.delete('/active/'+ _id);
        props.setActive(actives);
    }

    // const addActive = async(active) => {
    //     const actives = [...props.active];
    //     const res = await axios.post('/active', active);
    //     const newActive = res.data;
    //     actives.push(newActive);
    //     props.setActive(actives);
    //     console.log('dodawanie');
    // }

    const editActive = async(active) => {
        const today = Date.now();
        console.log(new Intl.DateTimeFormat('pl-PL', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(today));
       
        await axios.put('/active/'+ active._id, active);
        const actives = [...props.active];
        const index = actives.findIndex(x => x._id === active._id);
        if(index >=0) {
            actives[index] = active;
            props.setActive(actives);
        }
       toggleModal();
    }

    const toggleModal = () => {
        setEditModal(!showEditModal);
    }

    const editActiveHandler = (active) => {
         toggleModal();
         setEdit(active);
     }

    return (
        <div className={`${styles.keys} flexbox-container`}>
            <Modal isOpen={showEditModal} contentLabel="Edycja">
                <EditActive
                    key_id={editTemp.key_id}
                    user_id={editTemp.user_id}
                    data={editTemp.data}
                    _id={editTemp._id}
                    onEdit={active => editActive(active)} />
                <button onClick={() => toggleModal()}>Anuluj</button>
            </Modal>
            {/* <NewActive 
                onAdd={(active) => addActive(active)}/> */}
            <Rooms />
            {props.active.map(active => (
                <ActiveKey
                    key={active._id}
                    {...active}
                    onEdit={(active) => editActiveHandler(active)}
                    onDelete={(_id) => deleteActive(_id)}
                />
            ))}
        </div>
        );
}

const areSame = (prevProps, nextProps) => {
    return prevProps.active === nextProps.active;
}

export default React.memo(ActiveKeys, areSame);