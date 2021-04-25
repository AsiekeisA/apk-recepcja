import React from 'react';
import Searching from './Searching/Searching';
import styles from './Menu.module.css';

function Menu() {
    return(
        <div className ={`${styles.menu} row`}>
            <div className="col">dgoscie</div>
            <div className="col">goście</div>
            <div className="col">goście</div>
            <div className="col"><Searching /></div>
        </div>
    );
}

export default Menu;