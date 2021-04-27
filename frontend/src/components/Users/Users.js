import React, { Component } from 'react';
import User from './User/User';
import styles from './Users.module.css';
import Rooms from './headerStatus.js';
import NewUser from './NewUser/NewUser.js';
import Modal from 'react-modal';
import EditUser from './EditUser/EditUser';
import axios from '../../axios';

class Users extends Component {
    constructor(props){
        super(props);

        this.state = {
            users: [],
            editUser: {},
            showEditModal: false
        };
    }

    async fetchUsers() {
        const res = await axios.get('/users');
        const users = res.data;
        this.setState({users})
    }

    componentDidMount() {
        this.fetchUsers();
        Modal.setAppElement('body');
     }

    async deleteUser(_id) {
        console.log('usuwanie', _id);
        const users = [...this.state.users].filter(user => user._id !== _id);
        await axios.delete('/users/'+ _id);
        this.setState({users});
    }

    async addUser(user) {
        const users = [...this.state.users];
        const res = await axios.post('/users', user);
        const newUser = res.data;
        users.push(newUser);
        this.setState({users});
    }

     async editUser(user) {
        await axios.put('/users/'+ user._id, user);
        const users = [...this.state.users];
        const index = users.findIndex(x => x._id === user._id);
        if(index >=0) {
            users[index] = user;
            this.setState({users});
        }
       this.toggleModal();
    }

    toggleModal() {
        this.setState({ showEditModal: !this.state.showEditModal});
    }

     editUserHandler(user) {
         this.toggleModal();
         this.setState({editUser: user});
     }

    render() {

        return (
            <div className={`${styles.users} flexbox-container`}>
                <Modal isOpen={this.state.showEditModal} contentLabel="Edycja">
                    <EditUser 
                        firstName={this.state.editUser.firstName}
                        lastName={this.state.editUser.lastName}
                        email={this.state.editUser.email}
                        phone={this.state.editUser.phone}
                        position={this.state.editUser.position}
                        nrIndeks={this.state.editUser.nrIndeks}
                        _id={this.state.editUser._id}
                        onEdit={user => this.editUser(user)} />
                    <button onClick={() => this.toggleModal()}>Anuluj</button>
                </Modal>
                <NewUser 
                    onAdd={(user) => this.addUser(user)}/>
                <Rooms />
               {this.state.users.map(user => (
                    <User 
                        key={user._id}
                        firstName={user.firstName}
                        lastName={user.lastName}
                        email={user.email} 
                        phone={user.phone}
                        position={user.position}
                        nrIndeks={user.nrIndeks}
                        _id={user._id}
                        onEdit={(user) => this.editUserHandler(user)}
                        onDelete={(_id) => this.deleteUser(_id)}
                    />
                ))}
                

            </div>
        );
    }
}

export default Users;