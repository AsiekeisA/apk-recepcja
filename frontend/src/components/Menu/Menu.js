import style from './Menu.module.css';
import Keys  from '../Content/KeysFolder/Keys';
import Users  from '../Content/Users/Users';
import ContentContext from '../../context/contentContext';
import { useContext, useState } from 'react';

/**
 * 
 * @param props
 * @param props.changeContent zmienia zawartość komponentu Content 
 * @returns Przyciski paska Menu
 */
function Menu(props) {
 return(
        <div className ={`${style.menu} row`}>
            <div className ={`${style.box} row`}>
            <button value='calendar' onClick={e=>props.changeContent(e.target.value)} className={`${style.button} col`}>Kalendarz</button>
            <button value='rooms' onClick={e=>props.changeContent(e.target.value)} className={`${style.button} col`}>Goście</button>
            <button value='inhabitant' onClick={e=>props.changeContent(e.target.value)} className={`${style.button} col`}>Mieszkańcy</button>
            <button value='active' onClick={e=>props.changeContent(e.target.value)} className={`${style.button} col`}>Pobrane klucze</button>
            <button value='keys' onClick={e=>props.changeContent(e.target.value)} className={`${style.button} col`}>Klucze</button>
            <button value='users' onClick={e=>props.changeContent(e.target.value)} className={`${style.button} col`}>Dane osobowe</button>
            <button value='archives' onClick={e=>props.changeContent(e.target.value)} className={`${style.button} col`}>Archiwum</button>
            </div>
        </div>
    );
}
/*onSearch={this.searchHandler()}}*/
export default Menu;