import React, { useState, useEffect } from 'react';
import Key from './KeyFolder/Key';
import styles from './Keys.module.css';
import Rooms from './headerKeys.js';
import NewKey from './NewKey/NewKey.js';
import Modal from 'react-modal';
import EditKey from './EditKey/EditKey';
import axios from '../../../axios';

function Keys(props) {
    // constructor(props){
    //     super(props);

    //     this.state = {
    //         keys: [],
    //         editKey: {},
    //         showEditModal: false
    //     };
    // }

    // async fetchKeys(props) {
    //     const res = await axios.get('/keys');
    //     const keys = res.data;
    //     this.setState({keys});
    // }
    const [editKeyTemp, setEditKey] = useState({});
    const [showEditModal, setEditModal] = useState(false);
    // const [availableK, setAvailable]= useState(props.available());
    // const [showAll, setShowAll] = useState(false);
    // const [showTable, setShow] = useState(props.keys);
    
    useEffect(()=>{
        // setShow(props.keys)
        //available();
        Modal.setAppElement('body'); 
    },[]);
    
    const deleteKey = async(_id) => {
        console.log('usuwanie', _id);
        const keys = [...props.keys].filter(key => key._id !== _id);
        await axios.delete('/keys/'+ _id);
        props.setKeys(keys);
    }

    const addKey = async(key) => {
        const keys = [...props.keys];
        const res = await axios.post('/keys', key);
        const newKey = res.data;
        keys.push(newKey);
        props.setKeys(keys);
        console.log('dodawanie');
    }

    const editKey = async(key) => {
        await axios.put('/keys/'+ key._id, key);
        const keys = [...props.keys];
        const index = keys.findIndex(x => x._id === key._id);
        if(index >=0) {
            keys[index] = key;
            props.setKeys(keys);
        }
       toggleModal();
    }

    const toggleModal = () => {
        setEditModal(!showEditModal);
    }

    const editKeyHandler = (key) => {
         toggleModal();
         setEditKey(key);
    }
     
    // const available = () =>{
    //     var table = [...props.keys];
    //     for (var i=0; i<props.active.length; i++){
    //       const act = props.active[i].key_id;
    //       const ava = [...table].filter(keys=>(keys.numer+' '+keys.blok)!== act);
    //       table =ava;
    //       console.log(table.length)
    //     }
    //     props.setAvailable(table)
    // }

    //  const allBtn = () => {
    //     setShowAll(!showAll)
    //     console.log(props.showKeys)
    //     props.setShowKeys( showAll ? props.keys : availableK)        
    //  }

    return (
        <div className={`${styles.keys} flexbox-container`}>
            <Modal isOpen={showEditModal} contentLabel="Edycja">
                <EditKey 
                    numer={editKeyTemp.numer}
                    blok={editKeyTemp.blok}
                    funkcja={editKeyTemp.funkcja}
                    ile={editKeyTemp.ile}
                    ileDost={editKeyTemp.ileDost}
                    czyDost={editKeyTemp.czyDost}
                    _id={editKeyTemp._id}
                    onEdit={key => editKey(key)} />
                <button onClick={() => toggleModal()}>Anuluj</button>
            </Modal>
            {/* <button onClick={() => allBtn()}>Wszystkie/dostępne</button> */}
            <NewKey 
                onAdd={(key) => addKey(key)}/>
            <Rooms />
            {props.keys.map(key => (
                <Key
                    active={props.active}
                    key={key._id}
                    {...key}
                    changeContent={content=>props.changeContent(content)}
                    idIntoKey={(key) => props.idIntoKey(key)}
                    onEdit={(key) => editKeyHandler(key)}
                    onDelete={(_id) => deleteKey(_id)}
                />
            ))}
        </div>
        );
}

const areSame = (prevProps, nextProps) => {
    return prevProps.keys === nextProps.keys;
}

export default React.memo(Keys, areSame);