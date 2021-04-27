import React from 'react';
import PropTypes from 'prop-types'
import styles from './User.module.css';

const propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired, 
    phone: PropTypes.number.isRequired,
    position: PropTypes.string.isRequired,
    nrIndeks: PropTypes.number.isRequired,
};

function User(props) {

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
            <div className="col">{props.firstName} {props.lastName}</div>
            <div className="col">{props.email}</div>
            <div className="col">{props.phone}</div>
            <div className="col">{props.position}</div>
            <div className="col">{props.nrIndeks}</div>
            <div className="col"><button onClick={editHandler}>edytuj</button></div>
            <div className="col"><button className="delete" onClick={() => {props.onDelete(props._id);}}>usuń</button></div>
        </div>
    );
}

User.propTypes = propTypes;

export default User;