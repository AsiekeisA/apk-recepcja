import React from 'react';
import styles from './Header.module.css';

function Header(props) {
    return (
        <header className={`${styles.header} container-fluid`}>
            
            <div className="col">{props.children}</div>
        </header>
    );
}

export default Header;