import React, { useMemo, useState } from 'react';
import axios from '../../../../axios';
import NewActiveUser from './NewActiveUser/NewActiveUser';


function NewActive(props) {
    
    const [keyId, setKey] = useState(props.keyId);
    const [user, setUser] = useState('');
    const [data, setData] = useState(Intl.DateTimeFormat('pl-PL', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(Date.now()));
    const [dataQuit, setDataQuit]= useState(Intl.DateTimeFormat('pl-PL', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(Date.now()+86400000))
    const [keyIleDost, setKeyIleDost] = useState(props.keyIleDost);
    const [keyCzyDost, setKeyCzyDost] = useState(props.keyCzyDost);
    const [usersData, setUsersData] = useState(props.users);
    const [userName, setUserName] = useState('');
    const [userLastname, setUserLastname] = useState('');
    const [ifExist, setIfExist]= useState(false);//czy istnieje taka osoba w bazie danych
    const [ifInhabitant, setIfInhabitant]= useState(false);//czy osoba pobierająca klucz do pokoju będzie mieszkańcem 

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
    const changeCheckBoxHandler = event => {
        setIfInhabitant(!ifInhabitant);
    }

    const changeDataHandler = event => {
        const value = event.target.value.toString();
        console.log(value);
        setData(value);
    }
    const changeDataQuitHandler = event => {
        const value = event.target.value.toString();
        console.log(value);
        setDataQuit(value);
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
    const addUser = async(user, key_id, data) => {
        const res = await axios.post('/users', user);
        const users = [...props.users];
        const newUser = res.data;
        console.log(newUser);
        users.push(newUser);
        props.setUsers(users);
        const newActive={
            key_id:key_id,
            user_id:newUser._id,
            data:data
        }
        onAdd(newActive);
        console.log('dodawanie');
      } 

    const addActive = () => {
        if (!user){
            const newUser ={
                firstName:userName,
                lastName:userLastname,
                position:'gość'
            }
            addUser(newUser, keyId, data); 
        }else{
            const active = {
                key_id: keyId,
                user_id: user,
                data:data,
                dataQuit:dataQuit,
                live:ifInhabitant
            };
            onAdd(active);
        }
        var ifDost=true;
        const ile = keyIleDost-1;
        if(ile===0)
        {
            ifDost=false;
        }

        const value = 'active';
       
        const key = {
            numer: props.keyNumer,
            blok: props.keyBlok,
            funkcja: props.keyFunkcja,
            ile: props.keyIle,
            ileDost: ile,
            czyDost: ifDost,
            _id: props.keyId
        };
        
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

    const cancelOperation = () => {
        props.changeContent('keys');
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
            <br/>
            <label>Imię:</label>
            <input 
                className = "form-control"
                type="text" 
                value={userName}
                //onKeyDown={userExist}
                onChange={changeUserNameHandler}/>
            {ifExist?
                (usersData.map(usersData =>
                <NewActiveUser
                    key={usersData._id}
                    {...usersData}
                    setUser={setUser}
                    setUserName={setUserName}
                    setUserLastname={setUserLastname}
                    setIfExist={setIfExist}
                />)):<div/>}
            <br/>
            {props.keyFunkcja==='pokój'?
                (<>
                <label>Wynajem</label>
                <input 
                 className = "form"
                type="checkbox"
                onChange={changeCheckBoxHandler}
                />
                <br/>
                {ifInhabitant?<></>:<>
                <br/>
                <label>Data zameldowania:</label>
                <input 
                className = "form-control"
                type="date"
                value={data}
                onChange={changeDataHandler} /> 
                <br/>
                <label>Data wymeldowania:</label>
                <input 
                className = "form-control"
                type="date"
                value={dataQuit}
                onChange={changeDataQuitHandler} />  
                </>}
            </>):<></>}  
            <br/> 
            <button onClick={() => addActive()}>Dodaj</button>
            <button onClick={() => cancelOperation()}>Anuluj</button>
        </div>
    );
}

export default NewActive;