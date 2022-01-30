import React, { useState, useEffect } from 'react';
import styles from '../User/User.module.css';

/**
 * 
 * @param props
 * @param {Array} props.users
 * @returns formularz dodawania użytkownika 
 */
function NewUser(props) {

    const [showForm, setshowForm] = useState(false);
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        nrIndeks: ''
    })

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        nrIndeks: '',
    })

    /**
     * Funkcja, która po wpisaniu znaków do okienka formularzu zmienia wartość stanu obiektu
     * @function changeHandler 
     * @param event 
     */
    const changeFirstNameHandler = event => {
        const value = event.target.value.toUpperCase();
        setNewUser({...newUser, firstName: value});
    }

    const changeLastNameHandler = event => {
        const value = event.target.value.toUpperCase();
        setNewUser({...newUser, lastName: value});
    }

    const changeEmailHandler = event => {
        const value = event.target.value.toLowerCase();
        setNewUser({...newUser, email: value});
    }

    const changePhoneHandler = event => {
        const value = event.target.value;
        setNewUser({...newUser, phone: value});
    }

    const changePositionHandler = event => {
        const value = event.target.value;
        setNewUser({...newUser, position: value});
    }

    const changeNrIndeksHandler = event => {
        const value = event.target.value;
        setNewUser({...newUser, nrIndeks: value});
    }

/**
 * funkcja tworzy i przekazuje obiekt do funkcji która dodają go do kolkecji danych 
 * @function addObject
 */
    const addUser = () => {
        const user = {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            position: newUser.position,
            email: newUser.email,
            phone: newUser.phone,
            nrIndeks: newUser.nrIndeks,
        };
        props.onAdd(user);
        setNewUser({})
        setshowForm(false);
    }

     // function validateName(name) {
    //     const re = 
    // }

    /**
     * @function validateEmail
     * @param {String} email 
     * @returns czy email jest poprawnie zapisany
     */
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email)
    }

    /**
     * @function sameValue
     * @returns czy istnieje już obiekt posiadający takie same dane
     */
    const sameEmail = () => {
        const exist = [...props.users].filter(x=>x.email===newUser.email)
        if ( exist[0] ){
            return true
        }else{
            return false
        }
    }

    const sameDocument = () => {
        const exist = [...props.users].filter(x=>x.nrIndeks===newUser.nrIndeks)
        if ( exist[0] ){
            return true
        }else{
            return false
        }
    }

    const samePhone = () => {
        const exist = [...props.users].filter(x=>x.phone===newUser.phone)
        if ( exist[0] ){
            return true
        }else{
            return false
        }
    }

    useEffect (() => {
        if (newUser.firstName&&newUser.firstName.length>=3 && newUser.firstName.length < 30) {
            setErrors({...errors, firstName: ''})
        } else {
            setErrors({...errors, firstName: 'Imię powinno zawierać 3 - 30 znaków'})
        }
    }, [newUser.firstName])
    
    useEffect (() => {
        if (newUser.lastName&&newUser.lastName.length>=3 && newUser.lastName.length < 30) {
            setErrors({...errors, lastName: ''})
        } else {
            setErrors({...errors, lastName: 'Nazwisko powinno zawierać 3 - 30 znaków'})
        }
    }, [newUser.lastName])

    useEffect (() => {
        if (!newUser.nrIndeks||newUser.nrIndeks.length===0) {
            setErrors({...errors, nrIndeks: 'Puste pole'})
        } else if(sameDocument()){
            setErrors({...errors, nrIndeks: 'Istnieje osoba o tym numerze dokumentu'})
        }else{
            setErrors({...errors, nrIndeks: ''})
        }
    }, [newUser.nrIndeks])

    useEffect (() => {
        if (validateEmail(newUser.email)|| '') {
            if (sameEmail()) {
                setErrors({...errors, email: 'Istnieje osoba posiadająca ten e-mail'}) 
            }else{
            setErrors({...errors, email: ''})
            }
        } else {
            setErrors({...errors, email: 'Niepoprawny e-mail'})
        }
    }, [newUser.email])

    useEffect (() => {
        if (isNaN(newUser.phone)) {
        setErrors({...errors, phone: 'Niepoprawny numer telefonu'})
        } else if  (newUser.phone.length >= 4 && newUser.phone.length <= 15 ) {
            if( samePhone()) {
                setErrors({...errors, phone: 'Istnieje osoba posiadająca ten numer telefonu'})    
            }else{
            setErrors({...errors, phone: ''})
            }
        }else{
            setErrors({...errors, phone: 'Numer telefonu powinien zawierać 4 - 15 cyfr '})
        }
    }, [newUser.phone])
    
    const disabledBtn = 
        Object.values(errors).filter(x => x).length
        || !(Object.values(newUser).filter(x => x).length===6)

    return(
        showForm ? (
        <div className="form-group">
            <label>Imię:</label>
            <input 
                className = {`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                type="text" 
                value={newUser.firstName} 
                onChange={changeFirstNameHandler} />
                <div className="invalid-feedback">
                    {errors.firstName}
                </div> 
            <br/>
            <label>Nazwisko:</label>
            <input 
                className = {`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                type="text" 
                value={newUser.lastName}
                onChange={changeLastNameHandler} />
                <div className="invalid-feedback">
                    {errors.lastName}
                </div> 
            <br/>
            <label>Pozycja:</label>
            <input 
                className = "form-control"
                type="text" 
                value={newUser.position}
                onChange={changePositionHandler} /> 
            <br/>
            <label>Numer Dokumentu</label>
            <input 
                className = {`form-control ${errors.nrIndeks ? 'is-invalid' : ''}`}
                type="text" 
                value={newUser.nrIndeks}
                onChange={changeNrIndeksHandler} />
                <div className="invalid-feedback">
                    {errors.nrIndeks}
                </div> 
            <br/>
            <label>E-mail:</label>
            <input 
                className = {`form-control ${errors.email ? 'is-invalid' : ''}`}
                type="email" 
                value={newUser.email}
                onChange={changeEmailHandler} />
                <div className="invalid-feedback">
                    {errors.email}
                </div>   
            <br/>
            <label>Telefon:</label>
            <input 
                className = {`form-control ${errors.phone ? 'is-invalid' : ''}`}
                type="text" 
                value={newUser.phone}
                onChange={changePhoneHandler} />
                <div className="invalid-feedback">
                    {errors.phone}
                </div> 

            <button onClick={() => addUser()} disabled={disabledBtn}>Dodaj</button>
        </div>
        ) : (
            <button className={`${styles.button} btn btn-primary`} onClick={() => setshowForm(true)}>Nowy</button>
        )
    );
}

export default NewUser;