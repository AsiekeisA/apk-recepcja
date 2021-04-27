import React, { useState } from 'react';


function NewUser(props) {

    const [showForm, setshowForm] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [position, setPosition] = useState('');
    const [nrIndeks, setNrIndeks] = useState('');

    const changeFirstNameHandler = event => {
        const value = event.target.value;
        setFirstName(value);
    }

    const changeLastNameHandler = event => {
        const value = event.target.value;
        setLastName(value);
    }

    const changeEmailHandler = event => {
        const value = event.target.value;
        setEmail(value);
    }

    const changePhoneHandler = event => {
        const value = event.target.value;
        setPhone(value);
    }

    const changePositionHandler = event => {
        const value = event.target.value;
        setPosition(value);
    }

    const changeNrIndeksHandler = event => {
        const value = event.target.value;
        setNrIndeks(value);
    }

    const addUser = () => {
        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            position: position,
            nrIndeks: nrIndeks,
        };
        props.onAdd(user);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setPosition('');
        setNrIndeks('');
        setshowForm(false);
    }

    return(
        showForm ? (
        <div>
            <label>Imię:</label>
            <input 
                className = "form-control"
                type="text" 
                value={firstName} 
                onChange={changeFirstNameHandler} />
            <br/>
            <label>Nazwisko:</label>
            <input 
                className = "form-control"
                type="text" 
                value={lastName}
                onChange={changeLastNameHandler} />
            <br/>
            <label>E-mail:</label>
            <input 
                className = "form-control"
                type="text" 
                value={email}
                onChange={changeEmailHandler} />  
            <br/>
            <label>Telefon:</label>
            <input 
                className = "form-control"
                type="text" 
                value={phone}
                onChange={changePhoneHandler} />
            <br/>
            <label>Pozycja:</label>
            <input 
                className = "form-control"
                type="text" 
                value={position}
                onChange={changePositionHandler} />
            <br/>
            <label>Numer Indeksu:</label>
            <input 
                className = "form-control"
                type="text" 
                value={nrIndeks}
                onChange={changeNrIndeksHandler} />

            <button onClick={() => addUser()}>Dodaj</button>
        </div>
        ) : (
            <button onClick={() => setshowForm(true)}>Nowy</button>
        )
    );
}

export default NewUser;