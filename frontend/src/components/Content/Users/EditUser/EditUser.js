import React, { useState } from 'react'

export default function EditUser(props) {

    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [email, setEmail] = useState(props.email);
    const [phone, setPhone] = useState(props.phone);
    const [position, setPosition] = useState(props.position);
    const [nrIndeks, setNrIndeks] = useState(props.nrIndeks);

    const changeFirstNameHandler = event => {
        const value = event.target.value.toUpperCase();
        setFirstName(value);
    }

    const changeLastNameHandler = event => {
        const value = event.target.value.toUpperCase();
        setLastName(value);
    }

    const changeEmailHandler = event => {
        const value = event.target.value.toLowerCase();
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

    const editUser = () => {
        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            position: position,
            nrIndeks: nrIndeks,
            _id: props._id
        };
        props.onEdit(user);
    }

    return (
        <div>
        <label>Imię:</label>
        <input 
            className = "form-control"
            type="text" 
            value={firstName} 
            onChange={changeFirstNameHandler} />
       
        <label>Nazwisko:</label>
        <input
            className = "form-control"
            type="text" 
            value={lastName}
            onChange={changeLastNameHandler} />
        
        <label>E-mail:</label>
        <input 
            className = "form-control"
            type="text" 
            value={email}
            onChange={changeEmailHandler} />  
    
        <label>Telefon:</label>
        <input 
            className = "form-control"
            type="text" 
            value={phone}
            onChange={changePhoneHandler} />

        <label>Pozycja:</label>
        <input 
            className = "form-control"
            type="text" 
            value={position}
            onChange={changePositionHandler} />
            
        <label>Numer Indeksu:</label>
        <input 
            className = "form-control"
            type="text" 
            value={nrIndeks}
            onChange={changeNrIndeksHandler} />    

        <button onClick={() => editUser()}>Zapisz</button>
    </div>
    );
}