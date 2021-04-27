import React, { Component } from 'react';
import Key from './KeyFolder/Key';
import styles from './Keys.module.css';
import Rooms from './headerStatus.js';
import NewKey from './NewKey/NewKey.js';
import Modal from 'react-modal';
import EditKey from './EditKey/EditKey';
import axios from '../../axios';

class Keys extends Component {
    constructor(props){
        super(props);

        this.state = {
            keys: [],
            editKey: {},
            showEditModal: false
        };
    }

    async fetchKeys() {
        const res = await axios.get('/keys');
        const keys = res.data;
        this.setState({keys})
    }

    componentDidMount() {
        this.fetchKeys();
        Modal.setAppElement('body');
     }

    async deleteKey(_id) {
        console.log('usuwanie', _id);
        const keys = [...this.state.keys].filter(key => key._id !== _id);
        await axios.delete('/keys/'+ _id);
        this.setState({keys});
    }

    async addKey(key) {
        const keys = [...this.state.keys];
        const res = await axios.post('/keys', key);
        const newKey = res.data;
        keys.push(newKey);
        this.setState({keys});
    }

     async editKey(key) {
        await axios.put('/keys/'+ key._id, key);
        const keys = [...this.state.keys];
        const index = keys.findIndex(x => x._id === key._id);
        if(index >=0) {
            keys[index] = key;
            this.setState({keys});
        }
       this.toggleModal();
    }

    toggleModal() {
        this.setState({ showEditModal: !this.state.showEditModal});
    }

     editKeyHandler(key) {
         this.toggleModal();
         this.setState({editKey: key});
     }

    render() {

        return (
            <div className={`${styles.keys} flexbox-container`}>
                <Modal isOpen={this.state.showEditModal} contentLabel="Edycja">
                    <EditKey 
                        numer={this.state.editKey.numer}
                        blok={this.state.editKey.blok}
                        funkcja={this.state.editKey.funkcja}
                        ile={this.state.editKey.ile}
                        _id={this.state.editKey._id}
                        onEdit={key => this.editKey(key)} />
                    <button onClick={() => this.toggleModal()}>Anuluj</button>
                </Modal>
                <NewKey 
                    onAdd={(key) => this.addKey(key)}/>
                <Rooms />
               {this.state.keys.map(key => (
                    <Key 
                        key={key._id}
                        numer={key.numer}
                        blok={key.blok}
                        funkcja={key.funkcja} 
                        _id={key._id}
                        ile={key.ile}
                        onEdit={(key) => this.editKeyHandler(key)}
                        onDelete={(_id) => this.deleteKey(_id)}
                    />
                ))}
                

            </div>
        );
    }
}

export default Keys;