import React, { useMemo, useState } from 'react';
import axios from '../../../../axios';
import Users from '../../Users/Users';
import NewActiveUser from './NewActiveUser';


function NewActive(props) {
    
    const [keyId, setKey] = useState(props.keyId);
    const [user, setUser] = useState('');
    const [data, setData] = useState(Intl.DateTimeFormat('pl-PL', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(Date.now()));
    const [keyIleDost, setKeyIleDost] = useState(props.keyIleDost);
    const [keyCzyDost, setKeyCzyDost] = useState(props.keyCzyDost);
    const [usersData, setUsersData] = useState(props.users);
    const index = props.users.length
    const [userName, setUserName] = useState('');
    const [userLastname, setUserLastname] = useState('');
    const [ifExist, setIfExist]= useState(false);

    const existHandler = () =>{
        if(usersData.length>0&&usersData.length<5){
            setIfExist(true);
        }else
        setIfExist(false);
    }
    
    const lastnameExist = name => {
        existHandler();
        if (name){
            const sameUser = [...props.users]
                    .filter(x => x.lastName
                    .includes(name));
                    setUsersData(sameUser);
            console.log(usersData);
            console.log(sameUser);
        }else{
            setUsersData(props.users);
            setIfExist(false);
        }
    }
    const userExist = name => {
        existHandler();
        // console.log(name);
        if (name){
            const sameUser = [...usersData]
                     .filter(x => x.firstName
                     .includes(name))
                     setUsersData(sameUser);
            console.log(usersData);
            console.log(sameUser);
        }else
        lastnameExist();                 
     }
    
    

    const changeKeyHandler = event => {
        const value = event.target.value;
        setKey(value);
    }

    const changeUserHandler = event => {
        const value = event.target.value.toUpperCase();
        setUser(value);
        userExist(value);
    }
    const changeUserNameHandler = event => {
        const value = event.target.value.toUpperCase();
        setUserName(value);
        userExist(value);
    }
    const changeUserLastnameHandler = event => {
        const value = event.target.value.toUpperCase();
        setUserLastname(value);
        lastnameExist(value);
    }

    const changeDataHandler = event => {
        const value = event.target.value;
        console.log(value);
        setData(value);
    }

    const onAdd = async(aactive) => {
        const actives = [...props.active];
        const res = await axios.post('/active', aactive);
        const newActive = res.data;
        actives.push(newActive);
        props.setActive(actives);
        console.log('dodawanie');
      }
      //odejmowanie...
      const editKey = async(key) => {
        await axios.put('/keys/'+ key._id, key);
        const keys = [...props.keys];
        const index = keys.findIndex(x => x._id === key._id);
        if(index >=0) {
            keys[index] = key;
            console.log(keys);
            props.setKeys(keys);
        }
    } 

    const addActive = () => {
        var ifDost=true;
        const ile = keyIleDost-1;
        if(ile===0)
        {
            ifDost=false;
        }

        const value = 'active';
        const active = {
            key_id: keyId,
            user_id: user,
            data:data
        };
        const key = {
            numer: props.keyNumer,
            blok: props.keyBlok,
            funkcja: props.keyFunkcja,
            ile: props.keyIle,
            ileDost: ile,
            czyDost: ifDost,
            _id: props.keyId
        };
        
        onAdd(active);
        editKey(key);
        setKey('');
        setUser('');
        setUsersData('');
        setUserLastname('');
        setUserName('');
        setData('');
        setKeyIleDost('');
        setKeyCzyDost('');
        props.setKeyA('');
        props.changeContent(value);
    }

    return(
        <div>
            <label>Klucz:</label>
            <input className = "form-control" 
            value={props.keyNR} 
            onChange={changeKeyHandler}/>
            <br/>
            <label>Nazwisko:</label>
        <input 
            className = "form-control"
            type="text" 
            value={userLastname}
            //onKeyDown={userExist}
            onChange={changeUserLastnameHandler}/>
            <label>Imię:</label>
            <input 
                className = "form-control"
                type="text" 
                value={userName}
                //onKeyDown={userExist}
                onChange={changeUserNameHandler}/>
            {ifExist?
                (<div>Proponowane osoby: </div>,
                usersData.map(usersData =>
                <NewActiveUser
                    key={usersData._id}
                    {...usersData}
                    setUser={setUser}
                    setUserName={setUserName}
                    setUserLastname={setUserLastname}
                />)):<div/>}
            <br/>   
            <label>Data:</label>
            <input 
                className = "form-control"
                type="text"
                value={data}
                onChange={changeDataHandler} />  

            <button onClick={() => addActive()}>Dodaj</button>
            <button>Anuluj/nieaktywny</button>
        </div>
    );
}

export default NewActive;