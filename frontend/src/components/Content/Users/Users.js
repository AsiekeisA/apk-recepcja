import React, { useState, useEffect } from 'react';
import User from './User/User';
import styles from './Users.module.css';
import DataHeader from '../../DataHeader/DataHeader';
import NewUser from './NewUser/NewUser.js';
import Modal from 'react-modal';
import EditUser from './EditUser/EditUser';
import axios from '../../../axios';

/**
 * 
 * @param props
 * @param {Object} props.users stan użytkowników   
 * @returns komponenty związane z listą użytkowników 
 */
function Users(props) {
    
    const [editUserTemp, setEditUser] = useState({});
    const [showEditModal, setEditModal] = useState(false);
  
    useEffect(() =>{
        // fetchUsers();
        Modal.setAppElement('body');
    },[])

    /**
     * Funkcja usuwająca użytkownika o danym id ze stanu users i z bazy danych
     * @async 
     * @function deleteUser
     * @param {String} _id id użytkownika
     */
    const deleteUser = async (_id) => {
        console.log('usuwanie', _id);
        const users = [...props.users].filter(user => user._id !== _id);
        await axios.delete('/users/'+ _id);
        props.setUsers(users);
    }

    /**
     * Funkcja dodająca nowego użytkownika do stanu users i bazy danych
     * @async
     * @function addUser
     * @param {Object} user nowy użytkownik
     */
    const addUser = async(user) => {
        const users = [...props.users];
        const res = await axios.post('/users', user);
        const newUser = res.data;
        users.push(newUser);
        props.setUsers(users);
    }

   /**
     * Funkcja edytująca użytkownika w stanie users i bazie danych
     * @async
     * @function editUser
     * @param {Object} user edytowany użytkownik
     */
    const editUser = async(user) => {
        await axios.put('/users/'+ user._id, user);
        const users = [...props.users];
        const index = users.findIndex(x => x._id === user._id);
        if(index >=0) {
            users[index] = user;
            props.setUsers(users);
        }
       toggleModal();
    }

    /**
     * Funkcja pokazująca i chowająca formularz edycji
     * @function toggleModal
     */
    const toggleModal = () => {
        setEditModal(!showEditModal);
    }

    /**
     * Funncja przygotowująca obiekt do edycji
     * @function editUserHandler
     * @param {Object} user edytowany użytkownik
     */
    const editUserHandler = (user) => {
        toggleModal();
        setEditUser(user);
    }

    return (
        <div className={`${styles.users} flexbox-container`}>
            <Modal isOpen={showEditModal} contentLabel="Edycja">
                <EditUser 
                    firstName={editUserTemp.firstName}
                    lastName={editUserTemp.lastName}
                    email={editUserTemp.email}
                    phone={editUserTemp.phone}
                    position={editUserTemp.position}
                    nrIndeks={editUserTemp.nrIndeks}
                    _id={editUserTemp._id}
                    users={props.users}
                    onEdit={user => editUser(user)} />
                <button onClick={() => toggleModal()}>Anuluj</button>
            </Modal>
            <NewUser 
                users={props.users}
                onAdd={(user) => addUser(user)}/>
            <DataHeader 
                content={props.content} 
                setItems={props.setUsers}
                items={props.users}
                />
            {props.users.sort((a, b) => a.firstName > b.firstName ? -1 : 1)
                        .sort((a, b) => a.lastName > b.lastName ? 1 : -1)
                        .map(user => (
                <User 
                    key={user._id}
                    {...user}
                    onEdit={(user) => editUserHandler(user)}
                    onDelete={(_id) => deleteUser(_id)}
                />
            ))}
            </div>
        );
}

export default Users;