import React, { useState, useEffect } from 'react'

/**
 * @function EditUser
 * @param props 
 * @returns Formularz edycji użytkownika 
 */
export default function EditUser(props) {

    const email = props.email?props.email:'';
    const phone = props.phone?props.phone:'';
    const nrIndeks = props.nrIndeks?props.nrIndeks:'';
    const [editUser, setEditUser] = useState({
        firstName: props.firstName,
        lastName: props.lastName,
        email: email,
        phone: phone,
        position: props.position,
        nrIndeks: nrIndeks,
    })
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        nrIndeks: '',
    })

    const changeFirstNameHandler = event => {
        const value = event.target.value.toUpperCase();
        setEditUser({...editUser, firstName: value});
    }

    const changeLastNameHandler = event => {
        const value = event.target.value.toUpperCase();
        setEditUser({...editUser, lastName: value});
    }

    const changeEmailHandler = event => {
        const value = event.target.value.toLowerCase();
        setEditUser({...editUser, email: value});
    }

    const changePhoneHandler = event => {
        const value = event.target.value;
        setEditUser({...editUser, phone: value});
    }

    const changePositionHandler = event => {
        const value = event.target.value;
        setEditUser({...editUser, position: value});
    }

    const changeNrIndeksHandler = event => {
        const value = event.target.value;
        setEditUser({...editUser, nrIndeks: value});
    }

    /**
     * tworzy i przekazuje obiekt do funkcji która edytuje obiekt o podanym id kolkecji danych 
     * @function onEdit
     */
    const onEdit = () => {
        const user = {
            firstName: editUser.firstName,
            lastName: editUser.lastName,
            email: editUser.email,
            phone: editUser.phone,
            position: editUser.position,
            nrIndeks: editUser.nrIndeks,
            _id: props._id
        };
        props.onEdit(user);
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email)
    }

    useEffect (() => {
        if (editUser.firstName.length>=3 && editUser.firstName.length < 30) {
            setErrors({...errors, firstName: ''})
        } else {
            setErrors({...errors, firstName: 'Imię powinno zawierać 3 - 30 znaków'})
        }
    }, [editUser.firstName])
    
    useEffect (() => {
        if (editUser.lastName.length>=3 && editUser.lastName.length < 30) {
            setErrors({...errors, lastName: ''})
        } else {
            setErrors({...errors, lastName: 'Nazwisko powinno zawierać 3 - 30 znaków'})
        }
    }, [editUser.lastName])

    useEffect (() => {
        if (editUser.nrIndeks.length>0) {
            setErrors({...errors, nrIndeks: ''})
        } else {
            setErrors({...errors, nrIndeks: 'Puste pole'})
        }
    }, [editUser.nrIndeks])

    useEffect (() => {
        if (validateEmail(editUser.email)|| '') {
            setErrors({...errors, email: ''})
        } else {
            setErrors({...errors, email: 'Niepoprawny e-mail'})
        }
    }, [editUser.email])

    useEffect (() => {
        if (isNaN(editUser.phone)) {
        setErrors({...errors, phone: 'Niepoprawny numer telefonu'})
        } else if  (editUser.phone.length >= 4 && editUser.phone.length <= 15 ) {
            setErrors({...errors, phone: ''})
        }else{
            setErrors({...errors, phone: 'Numer telefonu powinien zawierać 4 - 15 cyfr '})
        }
    }, [editUser.phone])
    
    const disabledBtn = Object.values(errors).filter(x => x).length || !(Object.values(editUser).filter(x => x).length===6)

    return (
        <div>
        <label>Imię:</label>
        <input 
            className = {`form-control ${errors.firstName ? 'is-invalid' : ''}`}
            type="text" 
            value={editUser.firstName} 
            onChange={changeFirstNameHandler} />
            <div className="invalid-feedback">
                    {errors.firstName}
            </div> 
       
        <label>Nazwisko:</label>
        <input
            className = {`form-control ${errors.lastName ? 'is-invalid' : ''}`}
            type="text" 
            value={editUser.lastName}
            onChange={changeLastNameHandler} />
            <div className="invalid-feedback">
                    {errors.lastName}
            </div>

        <label>Pozycja:</label>
        <input 
            className = "form-control"
            type="text" 
            value={editUser.position}
            onChange={changePositionHandler} />

        <label>Numer Dokumentu:</label>
        <input 
            className = {`form-control ${errors.nrIndeks ? 'is-invalid' : ''}`}
            type="text" 
            value={nrIndeks}
            onChange={changeNrIndeksHandler} />
            <div className="invalid-feedback">
                    {errors.nrIndeks}
            </div>   
        
        <label>E-mail:</label>
        <input 
            className = {`form-control ${errors.email ? 'is-invalid' : ''}`}
            type="text" 
            value={editUser.email}
            onChange={changeEmailHandler} />
            <div className="invalid-feedback">
                    {errors.email}
            </div>   
    
        <label>Telefon:</label>
        <input 
            className = {`form-control ${errors.phone ? 'is-invalid' : ''}`}
            type="text" 
            value={editUser.phone}
            onChange={changePhoneHandler} />
            <div className="invalid-feedback">
                    {errors.phone}
            </div>  

        <button onClick={() => onEdit()} disabled={disabledBtn}>Zapisz</button>
    </div>
    );
}