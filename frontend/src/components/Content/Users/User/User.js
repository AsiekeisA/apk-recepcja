import React from 'react';
import PropTypes from 'prop-types'
import styles from './User.module.css';

const propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string, 
    phone: PropTypes.string,
    position: PropTypes.string.isRequired,
    nrIndeks: PropTypes.string,
};

/**
 * 
 * @param props
 * @param {String} props._id 
 * @param {String} props.firstName imię
 * @param {String} props.lastName nazwisko
 * @param {String} props.email e-mail
 * @param {String} props.phone telefon
 * @param {String} props.position pozycja
 * @param {String} props.nrIndeks numer dokumnetu
 * @returns informacje o danym użytkowniku 
 */
function User(props) {

    /**
     * Funkcja pobierająca dane użytkownika do edycji
     * @function editHandler
     */
    const editHandler = () => {
        props.onEdit({
            _id:props._id, 
            firstName:props.firstName, 
            lastName:props.lastName, 
            email:props.email, 
            phone:props.phone,
            position:props.position,
            nrIndeks:props.nrIndeks
        })
    }

    return (
        <div className={`${styles.user} flexbox-cointainer`}>
            <div className="col">{props.lastName} {props.firstName}</div>
            <div className="col">{props.position}</div>
            <div className="col">{props.nrIndeks}</div>
            <div className="col">{props.email}</div>
            <div className="col">{props.phone}</div>
            <div className="col"><button className={`${styles.button} btn btn-primary`} onClick={editHandler}>edytuj</button></div>
            <div className="col"><button className={`${styles.button} btn btn-primary`} onClick={() => {props.onDelete(props._id);}}>usuń</button></div>
        </div>
    );
}

User.propTypes = propTypes;

export default User;