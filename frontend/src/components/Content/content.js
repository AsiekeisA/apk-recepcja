import Keys from './KeysFolder/Keys';
import Users from './Users/Users';
import ActiveKeys from './ActiveKeys/ActiveKeys'
import NewActive from './ActiveKeys/NewActive/NewActive'
import Archives from './Archives/Archives';
import React, { useState } from 'react';
import axios from 'axios';
import RoomsCalendar from './RoomsCalendar/RoomsCalendar';
import EditActive from './ActiveKeys/EditActive/EditActive'


export default function Content(props) {
  
  const [temp, setTemp] = useState({})
  const makeTemp = (key) => {
      setTemp(key);
    //console.log(newActiveTemp);
    props.changeContent('newActive')
  }
  const editTemp = (key) => {
    setTemp(key);
  //console.log(newActiveTemp);
  props.changeContent('editActive')
}


    switch(props.content) {
      case 'calendar':
        return (<RoomsCalendar
          backKeys={props.backKeys}
          keys={props.keys}
          users={props.users}
          active={props.active}
          archives={props.archives}
          setActive={props.setActive}
          setArchives={props.setArchives}
          makeTemp={makeTemp}
          editTemp={editTemp}
          setKeys={keys => props.setKeys(keys)}
          setBackKeys={props.setBackKeys}
        />);
      case 'keys':
        return(<Keys
          backKeys={props.backKeys}
          content={props.content}
          makeTemp={makeTemp}
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
          archives={props.archives}
          users={props.users}
          setActive={active => props.setActive(active)}
          setArchives={props.setArchives}
          setKeys={keys => props.setKeys(keys)}
          setBackKeys={props.setBackKeys}
          changeContent={content=>props.changeContent(content)}
          editTemp={editTemp}
          makeTemp={makeTemp}
          />);
      case 'archives':
        return(<Archives
          content={props.content}
          backKeys={props.backKeys}
          archives={props.archives}
          users={props.users}
          />);
      case 'newActive':
        return(<NewActive
          backKeys={props.backKeys}
          lastContent={props.lastContent}
          content={props.content}
          keyNR={temp.numer+' '+temp.blok}
          setTemp={setTemp}
          changeContent={content=>props.changeContent(content)}
          active={props.active}
          keyNumer={temp.numer}
          keyBlok={temp.blok}
          keyFunkcja={temp.funkcja}
          keyIle={temp.ile}
          keyIleDost={temp.ileDost}
          keyCzyDost={temp.czyDost}
          keyId={temp._id}
          keys={props.keys}
          users={props.users}
          setUsers={props.setUsers}
          setKeys={props.setKeys}
          setActive={props.setActive}
          setBackKeys={props.setBackKeys}
        />);
      case 'editActive':
        return(<EditActive 
          key_id={temp.key_id}
          user_id={temp.user_id}
          data={temp.data}
          dataQuit={temp.dataQuit}
          live={temp.live}
          _id={temp._id}
          keys={props.keys}
          users={props.users}
          active={props.active}
          archives={props.archives}
          backKeys={props.backKeys}
          setKeys={props.setKeys}
          setActive={props.setActive}
          setArchives={props.setArchives}
          setBackKeys={props.setBackKeys}
          lastContent={props.lastContent}
          changeContent={content=>props.changeContent(content)}
        />);
      default:
        return 'BLAD';
}
    
}