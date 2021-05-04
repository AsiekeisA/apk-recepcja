import React, { Component } from 'react';
import Key from './KeyFolder/Key';
import styles from './Keys.module.css';
import Rooms from './headerStatus.js';
import NewKey from './NewKey/NewKey.js';
import Modal from 'react-modal';
import EditKey from './EditKey/EditKey';
import axios from '../../axios';

class Keys extends Component {
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

    componentDidMount() {
        //this.fetchKeys();
        Modal.setAppElement('body');
     }

    async deleteKey(_id) {
        console.log('usuwanie', _id);
        const keys = [...this.props.keys].filter(key => key._id !== _id);
        await axios.delete('/keys/'+ _id);
        this.setState({keys});
    }

    async addKey(key) {
        const keys = [...this.props.keys];
        const res = await axios.post('/keys', key);
        const newKey = res.data;
        keys.push(newKey);
        this.setState({keys});
        console.log('dodawanie');
    }

     async editKey(key) {
        await axios.put('/keys/'+ key._id, key);
        const keys = [...this.props.keys];
        const index = keys.findIndex(x => x._id === key._id);
        if(index >=0) {
            keys[index] = key;
            this.setState({keys});
        }
       this.toggleModal();
    }

    toggleModal() {
        this.setState({ showEditModal: !this.props.showEditModal});
    }

     editKeyHandler(key) {
         this.toggleModal();
         this.setState({editKey: key});
     }

    render() {

        return (
            <div className={`${styles.keys} flexbox-container`}>
                <Modal isOpen={this.props.showEditModal} contentLabel="Edycja">
                    <EditKey 
                        numer={this.props.editKey.numer}
                        blok={this.props.editKey.blok}
                        funkcja={this.props.editKey.funkcja}
                        ile={this.props.editKey.ile}
                        _id={this.props.editKey._id}
                        onEdit={key => this.editKey(key)} />
                    <button onClick={() => this.toggleModal()}>Anuluj</button>
                </Modal>
                <NewKey 
                    onAdd={(key) => this.addKey(key)}/>
                <Rooms />
               {this.props.keys.map(key => (
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