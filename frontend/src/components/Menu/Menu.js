import React from 'react';
import styles from './Menu.module.css';
import Keys  from '../KeysFolder/Keys';
import Users  from '../Users/Users';

function Menu(props) {
  
 return(
        <div className ={`${styles.menu} row`}>
            <div className="col">Wszystkie klucze</div>
            <div className="col">Wszyscy ludzie</div>
            <div className="col">goście</div>
            <div className="col">{props.children}</div>
        </div>
    );
}
/*onSearch={this.searchHandler()}}*/
export default Menu;