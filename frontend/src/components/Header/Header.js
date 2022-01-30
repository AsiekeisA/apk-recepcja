import React from 'react';
import styles from './Header.module.css';
import Clock from '../UI/Clock/Clock';

/**
 * 
 * @param props 
 * @returns wyszukiwarkę i zegar 
 */
function Header(props) {
    return (
        <header className={`${styles.header} container-fluid`}>
            
            <div className="col">{props.children}</div>
         <Clock/>

        </header>
    );
}

export default Header;