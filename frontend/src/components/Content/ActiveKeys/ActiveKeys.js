import React, { useEffect } from 'react';
import ActiveKeyContent from './ActiveKey/ActiveKeyContent';
import styles from '../KeysFolder/Keys.module.css';
import DataHeader from '../../DataHeader/DataHeader';
import Modal from 'react-modal';
import axios from '../../../axios';

/**
 * Obsługuje funkcje związane z rezerwacjami i pobranymi kluczami
 * @param {*} props 
 * @returns Wybraną zawartość związaną z rezerwacją kluczy
 */
function ActiveKeys(props) {
    useEffect(()=>{
       Modal.setAppElement('body'); 
    },[]);
    
    /**
     * Funkcja dodająca jeden klucz do dostępnych w recepcji
     * @param  _id 
     */
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

    /**
     * Funkcja usuwająca rezerwację
     * @param  _id 
     */
    const deleteActive = async(_id) => {
        console.log('usuwanie', _id);
        const actives = [...props.active].filter(active => active._id !== _id);
        await axios.delete('/active/'+ _id);
        props.setActive(actives);
        console.log(props.keys);
    }

/**
 * Funkcja dodająca rezerwację do archiwum
 * @param {Object} newArch 
 */    
    const toArchive = async(newArch) => {
        const archives = [...props.archives];
        const res = await axios.post('/archives', newArch);
        const newArchives = res.data;
        archives.push(newArchives);
        props.setArchives(archives);
        console.log('do archiwum');
      }

/**
 * Funkcja tworząca obiekt dodawny do archiwum
 * @param  _id 
 */
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

    /**
     * Funkcja sprawdzająca, czy rezerwacja zostanie usunięta czy zarchiwizowana
     * @param  _id 
     * @param {date} date 
     */
    const checkDelete = (_id, date) => {
        const data = new Date(date).toISOString().slice(0,10);
        console.log(date, data);
        if(Date.parse(date)!=Date.parse(data)){
            oddawanie(_id);
            makeArchives(_id)
        }
        deleteActive(_id)
    }

    return (
        <div className={`${styles.keys} flexbox-container`}>
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