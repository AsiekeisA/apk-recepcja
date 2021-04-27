import React from 'react';
import Searching from './Searching/Searching';
import styles from './Menu.module.css';
import Keys  from '../KeysFolder/Keys';
import Users  from '../Users/Users';

function Menu() {
  
 return(
        <div className ={`${styles.menu} row`}>
            <div className="col">Wszystkie klucze</div>
            <div className="col">Wszyscy ludzie</div>
            <div className="col">goście</div>
            <div className="col"><Searching /></div>
        </div>
    );
}
/*onSearch={this.searchHandler()}}*/
export default Menu;