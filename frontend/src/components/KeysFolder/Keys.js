import React, { Component } from 'react';
import Key from './KeyFolder/Key'
import styles from './Keys.module.css'
import Rooms from './headerStatus.js';
import NewKey from './NewKey/NewKey.js'
import Modal from 'react-modal'
import EditKey from './EditKey/EditKey';

class Keys extends Component {
    constructor(props){
        super(props);

        this.state = {
            keys: [
                {
                    id: '2154',
                    numer: '32',
                    blok: 'C',
                    funkcja: 'pralnia',
                    ile: '1'
                },
                {
                    id: '2100',
                    numer: '328',
                    blok: 'C',
                    funkcja: 'room',
                    ile: '3'
                }
            ],
            editKey: {},
            showEditModal: false
        };
    }

    deleteKey(id) {
        console.log('usuwanie', id);
        const keys = [...this.state.keys].filter(key => key.id !== id);
        this.setState({keys});
    }

    addKey(key) {
        const keys = [...this.state.keys];
        keys.push(key);
        this.setState({keys});
    }

    editKey(key) {
        const keys = [...this.state.keys];
        const index = keys.findIndex(x => x.id === key.id);
        if(index >=0) {
            keys[index] = key;
            this.setState({keys});
        }
       // this.toggleModal();
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
                        id={this.state.editKey.id}
                        onEdit={key => this.editKey(key)} />
                    <button onClick={() => this.toggleModal()}>Anuluj</button>
                </Modal>
                <Rooms />
               {this.state.keys.map(key => (
                    <Key 
                        key={key.id}
                        numer={key.numer}
                        blok={key.blok}
                        funkcja={key.funkcja} 
                        id={key.id}
                        ile={key.ile}
                        onEdit={(key) => this.editKeyHandler(key)}
                        onDelete={(id) => this.deleteKey(id)}
                    />
                ))}
                <NewKey 
                    onAdd={(key) => this.addKey(key)}/>

            </div>
        );
    }
}

export default Keys;