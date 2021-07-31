import React from 'react';
import styles from './Header.module.css';
import Clock from '../UI/Clock/Clock';

function Header(props) {
    return (
        <header className={`${styles.header} container-fluid`}>
            
            <div className="col">{props.children}</div>
         <Clock/>

        </header>
    );
}

export default Header;