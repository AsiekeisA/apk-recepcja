import React, { useState, useEffect } from 'react';
import User from './User/User';
import styles from './Users.module.css';
import DataHeader from '../../DataHeader/DataHeader';
import NewUser from './NewUser/NewUser.js';
import Modal from 'react-modal';
import EditUser from './EditUser/EditUser';
import axios from '../../../axios';

function Users(props) {
    
    //const [users, setUsers] = useState([]);
    const [editUserTemp, setEditUser] = useState({});
    const [showEditModal, setEditModal] = useState(false);

    // const fetchUsers = async() => {
    //     const res = await axios.get('/users');
    //     const users = res.data;
    //     props.setUsers(users)
    // }
    
    useEffect(() =>{
        // fetchUsers();
        Modal.setAppElement('body');
    },[])

    const deleteUser = async (_id) => {
        console.log('usuwanie', _id);
        const users = [...props.users].filter(user => user._id !== _id);
        await axios.delete('/users/'+ _id);
        props.setUsers(users);
    }

    const addUser = async(user) => {
        const users = [...props.users];
        const res = await axios.post('/users', user);
        const newUser = res.data;
        users.push(newUser);
        props.setUsers(users);
    }

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

    const toggleModal = () => {
        setEditModal(!showEditModal);
    }

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
                    onEdit={user => editUser(user)} />
                <button onClick={() => toggleModal()}>Anuluj</button>
            </Modal>
            <NewUser 
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
                    // firstName={user.firstName}
                    // lastName={user.lastName}
                    // email={user.email} 
                    // phone={user.phone}
                    // position={user.position}
                    // nrIndeks={user.nrIndeks}
                    // _id={user._id}
                    onEdit={(user) => editUserHandler(user)}
                    onDelete={(_id) => deleteUser(_id)}
                />
            ))}
            </div>
        );
}

export default Users;