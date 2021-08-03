import Keys from './KeysFolder/Keys';
import Users from './Users/Users';
import ActiveKeys from './ActiveKeys/ActiveKeys'
import NewActive from './ActiveKeys/NewActive/NewActive'
import React, { useState } from 'react';
import axios from 'axios';
import RoomsCalendar from './RoomsCalendar/RoomsCalendar';


export default function Content(props) {
  
  const [newActiveTemp, setKeyA] = useState({})
  const idIntoKey = (key) => {
      setKeyA(key);
    //console.log(newActiveTemp);
    props.changeContent('newActive')
  }

    switch(props.content) {
      case 'calendar':
        return (<RoomsCalendar
          backKeys={props.backKeys}
          keys={props.keys}
          users={props.users}
          active={props.active}
          setActive={props.setActive}
        />);
      case 'keys':
        return(<Keys
          backKeys={props.backKeys}
          content={props.content}
          idIntoKey={idIntoKey}
          changeContent={props.changeContent}
          keys={props.keys}
          // available={props.available}
          active={props.active}
          //setWhich={whichKey => setWhich(whichKey)}
          setKeys={keys => props.setKeys(keys)}
          showKeys={props.showKeys}
          setShowKeys={showKeys => props.setShowKeys(showKeys)}
          // availableKeys={props.availableKeys}
          // setAvailable={props.setAvailable}
        />);
      case 'users':
        return(<Users
          content={props.content}
          users={props.users}
          setUsers={users => props.setUsers(users)}
          />);
      case 'active':
      case 'inhabitant':
      case 'rooms':
        return(<ActiveKeys
          backKeys={props.backKeys}
          content={props.content}
          keys={props.keys}
          active={props.active}
          users={props.users}
          setActive={active => props.setActive(active)}
          setKeys={keys => props.setKeys(keys)}
          setBackKeys={props.setBackKeys}
          />);
      case 'newActive':
        return(<NewActive
          backKeys={props.backKeys}
          content={props.content}
          keyNR={newActiveTemp.numer+' '+newActiveTemp.blok}
          setKeyA={setKeyA}
          changeContent={content=>props.changeContent(content)}
          active={props.active}
          setActive={props.setActive}
          keyNumer={newActiveTemp.numer}
          keyBlok={newActiveTemp.blok}
          keyFunkcja={newActiveTemp.funkcja}
          keyIle={newActiveTemp.ile}
          keyIleDost={newActiveTemp.ileDost}
          keyCzyDost={newActiveTemp.czyDost}
          keyId={newActiveTemp._id}
          keys={props.keys}
          setKeys={props.setKeys}
          users={props.users}
          setUsers={props.setUsers}
          setBackKeys={props.setBackKeys}
        />);
      default:
        return 'BLAD';
}
    
}