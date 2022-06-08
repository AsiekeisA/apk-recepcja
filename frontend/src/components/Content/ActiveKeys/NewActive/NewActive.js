import React, { useState } from 'react';
import axios from '../../../../axios';
import NewActiveUser from './NewActiveUser/NewActiveUser';

/**
 * Komponent tworzący nową rezerwację
 * @param props 
 * @returns Formularz rezerwacji 
 */
function NewActive(props) {
    const [keyId, setKey] = useState(props.keyId);
    const [user, setUser] = useState('');
    const [data, setData] = useState(new Date().toISOString().slice(0,10));
    const [dataQuit, setDataQuit]= useState(new Date().toISOString().slice(0,10));
    const [keyIleDost, setKeyIleDost] = useState(props.keyIleDost);
    const [keyCzyDost, setKeyCzyDost] = useState(props.keyCzyDost);
    const [usersData, setUsersData] = useState(props.users);
    const [userName, setUserName] = useState('');
    const [userLastname, setUserLastname] = useState('');
    const [ifExist, setIfExist]= useState(false);//czy istnieje taka osoba w bazie danych
    const [ifInhabitant, setIfInhabitant]= useState(false);//czy osoba pobierająca klucz do pokoju będzie mieszkańcem 
    const [nextContent, setContent] = useState(props.lastContent);

    /**
     * Zmieniająca stan ifExist w zależności od tego czy istnieją w bazie danych wpisywane do formularza osoby
     */
    const existHandler = () =>{
        if(usersData.length>0&&usersData.length<5){
            setIfExist(true);
        }else
        setIfExist(false);
    }
    
    /**
     * Funkcja sprawdzająca, czy w bazie danych istnieje osoba o podawanym nazwisku.
     * @param {String} name 
     */
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
    /**
     * Funkcja sprawdzająca czy w bazie danych istnieje osoba o podawanym imieniu
     * @param {String} name 
     */
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
        const value = event.target.value;
        console.log(value);
        setData(value);
        setDataQuit(value);
    }
    const changeDataQuitHandler = event => {
        const value = event.target.value;
        console.log(value);
        setDataQuit(value);
    }

    /**
     * Funkcja dodająca nową rezerwację do stanu i kolekcji
     * @param {Object} aactive 
     */
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
        const keys = [...props.backKeys];
        const index = keys.findIndex(x => x._id === key._id);
        if(index >=0) {
            keys[index] = key;
            console.log(keys);
            props.setKeys(keys);
            props.setBackKeys(keys);
        }
    }

    /**
     * Funkcja dodająca osobę do bazy danych jeśli wcześniej w niej nie istniała
     * @param {Object} user 
     * @param {String} key_id 
     * @param {Date} data 
     * @param {Boolean} live 
     */
    const addUser = async(user, key_id, data, live) => {
        const res = await axios.post('/users', user);
        const users = [...props.users];
        const newUser = res.data;
        users.push(newUser);
        props.setUsers(users);
        
        const newActive={
            key_id:key_id,
            user_id:newUser._id,
            data:data,
            dataQuit:dataQuit,
            live:live
        }
        onAdd(newActive);
        console.log('dodawanie goscia');
      } 

/**
 * Funckcja tworząca nowe objekty user i active, które zostaną dodane do bazy danych
 */
    const addActive = () => {
        if (!user){
            const newUser ={
                firstName:userName,
                lastName:userLastname,
                position:'gość'       
            }
            addUser(newUser, keyId, data, ifInhabitant); 
        }else if( props.keyFunkcja==="pokój" ){
            const active = {
                key_id: keyId,
                user_id: user,
                data:data,
                dataQuit:dataQuit,
                live:ifInhabitant
            };
            console.log(active);
            onAdd(active);
        }else{
            const active = {
                key_id: keyId,
                user_id: user,
                data:new Date().toISOString(),
            };
            console.log(active);
            onAdd(active); 
        }
        var ifDost=true;
        const ile = keyIleDost-1;
        if(ile===0)
        {
            ifDost=false;
        }

        if ( props.keyFunkcja !='pokój' ){
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
        }
        setKey('');
        setUser('');
        setUsersData('');
        setUserLastname('');
        setUserName('');
        setData('');
        setDataQuit('');
        setKeyIleDost('');
        setKeyCzyDost('');
        setIfInhabitant(false);
        console.log(nextContent)
        props.setTemp('');
        props.changeContent(nextContent);
    }

    /**
     * Funkcja anulująca operację, i cofająca do poprzedniego okna.
     */
    const cancelOperation = () => {
        props.changeContent(nextContent);
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
                <label>Wynajem długoterminowy ,</label>
                <input 
                 className = "form"
                type="checkbox"
                onChange={changeCheckBoxHandler}
                />
                <br/>
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
            <br/> 
            <button onClick={() => addActive()}>Zarezerwuj</button>
            </>):<>
                <button onClick={() => addActive()}>Pobranie klucza</button>
            </>}
              
            <button onClick={() => cancelOperation()}>Anuluj</button>
        </div>
    );
}

export default NewActive;