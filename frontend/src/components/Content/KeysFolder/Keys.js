import React, { useState, useEffect, useMemo } from 'react';
import Key from './KeyFolder/Key';
import styles from './Keys.module.css';
import NewKey from './NewKey/NewKey.js';
import Modal from 'react-modal';
import EditKey from './EditKey/EditKey';
import axios from '../../../axios';
import DataHeader from '../../DataHeader/DataHeader';

/**
 * 
 * @param count 
 * @returns liczbę kluczy dostępnych w recepcji i wszystkich kluczy
 */
const liczenieKluczy = (count) =>{
    let ile=0;
    let ileDost=0;
    for (let i=0; i<count.length; i++){
        ile += parseInt(count[i].ile);
        ileDost += parseInt(count[i].ileDost);
    }
    return ileDost+"/"+ile;
} 

/**
 * 
 * @param props 
 * @returns Komponent wyświetlający tabelę kluczy
 */
function Keys(props) {
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

        useEffect(()=>{
        // setShow(props.keys)
        //available();
        Modal.setAppElement('body');
    },[]);
    useEffect(() => {
        filterFunc();
    },[blok, funkcja]);

/**
 * Funkcja zmieniająca zawartośc w zależności od filtrów
 * @param event 
 */
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

/**
 * Funkcja filtrująca wyświetlaną zawartość komponentu 
 */
    const filterFunc = () =>{
        const dane = [...props.backKeys]
                    .filter(obj => Object
                    .keys(filterQuerty)
                    .every(key=>filterQuerty[key]? 
                        obj[key]===filterQuerty[key]
                        :obj[key]!=filterQuerty[key]));
        props.setKeys(dane);
                };

/**
 * Funkcja usuwająca klucze ze stanu i kolekcji
 * @param  _id 
 */
    const deleteKey = async(_id) => {
        console.log('usuwanie', _id);
        const keys = [...props.keys].filter(key => key._id !== _id);
        await axios.delete('/keys/'+ _id);
        props.setKeys(keys);
    }
/**
 * Funkcja dodająca nowy klucz do stanu i kolekcji
 * @param {Object} key 
 */
    const addKey = async(key) => {
        const keys = [...props.keys];
        const res = await axios.post('/keys', key);
        const newKey = res.data;
        keys.push(newKey);
        props.setKeys(keys);
        props.setBackKeys(keys);
        console.log('dodawanie');
    }

/**
 * Funkcja edytująca klucz w stanie i w kolekcji
 * @param {Object} key 
 */
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

    /**
     * Funkcja zmieniająca stan wyświetlenia formularza edycji klucza
     */
    const toggleModal = () => {
        setEditModal(!showEditModal);
    }

    /**
     * Funkcja wyświetlająca formularz dla danego klucza
     * @param {Object} key 
     */
    const editKeyHandler = (key) => {
         toggleModal();
         setEditKey(key);
    }
     
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