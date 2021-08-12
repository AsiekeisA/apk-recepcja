import React, { useState, useEffect, useMemo } from 'react';
import Key from './KeyFolder/Key';
import styles from './Keys.module.css';
import NewKey from './NewKey/NewKey.js';
import Modal from 'react-modal';
import EditKey from './EditKey/EditKey';
import axios from '../../../axios';
import DataHeader from '../../DataHeader/DataHeader';

const liczenieKluczy = (count) =>{
    let ile=0;
    let ileDost=0;
    for (let i=0; i<count.length; i++){
        ile += parseInt(count[i].ile);
        ileDost += parseInt(count[i].ileDost);
    }
    return ileDost+"/"+ile;
}

function Keys(props) {
    // async fetchKeys(props) {
        //     const res = await axios.get('/keys');
        //     const keys = res.data;
        //     this.setState({keys});
        // }
        const [editKeyTemp, setEditKey] = useState({});
        const [showEditModal, setEditModal] = useState(false);
        const count= useMemo(() => {
            return liczenieKluczy(props.keys);
        }, [props.keys])
        const [blok, setBlok] = useState('');
        const [funkcja, setFunkcja] = useState('');
        const filterQuerty ={
            blok : blok,
            funkcja : funkcja
        }
    // const [availableK, setAvailable]= useState(props.available());
    // const [showAll, setShowAll] = useState(false);
    // const [showTable, setShow] = useState(props.keys);

    useEffect(()=>{
        // setShow(props.keys)
        //available();
        Modal.setAppElement('body');
    },[]);
    useEffect(() => {
        filterFunc();
    },[blok, funkcja]);

    const filterHandler = event =>{
        const value = event.target.value;
        const name = event.target.name;
        switch (name) {
            case "blok":
                setBlok(value);
                break;
            case "funkcja":
                setFunkcja(value);
                break;
        }        
    }
    const filterFunc = () =>{
        const dane = [...props.backKeys]
                    .filter(obj => Object
                    .keys(filterQuerty)
                    .every(key=>filterQuerty[key]? 
                        obj[key]===filterQuerty[key]
                        :obj[key]!=filterQuerty[key]));
        props.setKeys(dane);
                };
    
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
                    keys={props.keys}
                    onEdit={key => editKey(key)} />
                <button onClick={() => toggleModal()}>Anuluj</button>
            </Modal>
            {/* <button onClick={() => allBtn()}>Wszystkie/dostępne</button> */}
            <NewKey 
                keys={props.keys}
                onAdd={(key) => addKey(key)}/>
            <DataHeader 
                content={props.content} 
                count={count}
                blok={blok}
                funkcja={funkcja}
                filterHandler={filterHandler}
                />
            {props.keys.sort((a, b) => a.numer > b.numer ? -1 : 1)
                        .sort((a, b) => a.blok > b.blok ? 1 : -1)
                        .map(key => (
                <Key
                    active={props.active}
                    key={key._id}
                    {...key}
                    changeContent={content=>props.changeContent(content)}
                    makeTemp={(key) => props.makeTemp(key)}
                    onEdit={(key) => editKeyHandler(key)}
                    onDelete={(_id) => deleteKey(_id)}
                />
            ))}
        </div>
        );
}

export default Keys;