import Keys from './KeysFolder/Keys';
import Users from './Users/Users';
import ActiveKeys from './ActiveKeys/ActiveKeys'
import NewActive from './ActiveKeys/NewActive/NewActive'
import ContentContext from '../../context/contentContext';
import React, { useState } from 'react';
import Switch, { Case, Default } from 'react-switch-case';

export default function Content(props) {
  
  const [newActiveTemp, setKeyA] = useState({})
  const idIntoKey = (key) => {
      setKeyA(key);
    console.log(newActiveTemp);
    props.changeContent('newActive')
  }
  // function SwitchCase(){
    switch(props.state) {
      case 'keys':
        return(<Keys
          idIntoKey={idIntoKey}
          changeContent={props.changeContent}
          keys={props.keys}
          //available={available}
          active={props.active}
          //setWhich={whichKey => setWhich(whichKey)}
          setKeys={props.setKeys}
        />);
      case 'users':
        return(<Users
          users={props.users}
          setUsers={users => props.setUsers(users)}
        />);
      case 'active':
        return(<ActiveKeys
          keys={props.keys}
          active={props.active}
          setActive={active => props.setActive(active)}
        />);
        case 'newActive':
          return(<NewActive
            key_id={newActiveTemp.numer+' '+newActiveTemp.blok}
            key_idDB={newActiveTemp._id}
            setKeyA={setKeyA}
            changeContent={content=>props.changeContent(content)}
            active={props.active}
            setActive={props.setActive}
          />);
      default:
        return 'BLAD';
}
    
}