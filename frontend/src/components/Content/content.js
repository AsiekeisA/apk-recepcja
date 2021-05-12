import Keys from './KeysFolder/Keys';
import Users from './Users/Users';
import ContentContext from '../../context/contentContext';
import React, { useContext } from 'react';
import Switch, { Case, Default } from 'react-switch-case';

export default function Content(props) {

  // function SwitchCase(){
    switch(props.states.state) {
        case 'keys':
            return(<Keys 
            keys={props.states.keys} 
            setKeys={props.states.setKeys} 
            />);
    
            case 'users':
                return(<Users
                users={props.states.users} 
                setUsers={props.states.setUsers} 
                />);
   
            }
    
}