import React from 'react';
import Key from '../iKey/Key'

class Keys extends React.Component {
    constructor(props){
        super(props);

        this.keys = [
            {
                id: '2154',
                numer: '218',
                blok: 'C',
                funkcja: 'room',
                ile: '3'
            },
            {
                id: '2100',
                numer: '328',
                blok: 'C',
                funkcja: 'room',
                ile: '3'
            }
        ];
    }
    render() {

        return (
            <div>
                <p>Klucze</p>

               {this.keys.map(key => (
                    <Key 
                        numer={key.numer}
                        blok={key.blok}
                        funkcja={key.funkcja} 
                        id={key.id}
                        ile={key.ile}
                    />
                ))}

            </div>
        );
    }
}

export default Keys;