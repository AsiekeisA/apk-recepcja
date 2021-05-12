import style from './Menu.module.css';
import Keys  from '../Content/KeysFolder/Keys';
import Users  from '../Content/Users/Users';
import ContentContext from '../../context/contentContext';
import { useContext, useState } from 'react';


function Menu(props) {
 return(
        <div className ={`${style.menu} row`}>
            <button value='keys' onClick={e=>props.changeContent(e.target.value)} className="col">Wszystkie klucze</button>
            <button value='users' onClick={e=>props.changeContent(e.target.value)} className="col">Wszyscy ludzie</button>
            <button value='active' onClick={e=>props.changeContent(e.target.value)} className="col">Aktywne</button>
            <div className="col">{props.children}</div>
        </div>
    );
}
/*onSearch={this.searchHandler()}}*/
export default Menu;