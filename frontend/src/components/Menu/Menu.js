import React from 'react';
import Searching from './Searching/Searching';
import styles from './Menu.module.css';

function Menu() {
    return(
        <div className ={`${styles.menu} flexbox-container`}>
            <div>dgoscie</div>
            <div>goście</div>
            <Searching />
        </div>
    );
}

export default Menu;