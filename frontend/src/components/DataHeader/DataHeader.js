import styles from './Data.module.css';
 /**
  * @function DataHeader
  * @param props
  * @param props.content stan komponentu Content 
  * @returns nagłówki tabel w zależności od stanu content 
  */
export default function DataHeader(props) {
    switch(props.content) {
        case 'keys':
            return(<>
                <div className={`${styles.head} d-flex justify-content-around`}>
                    <div className="col">Numer</div>
                    <div className="col">funkcja</div>
                    <div className="col">dostępne</div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                </div>
                <div className={`${styles.head} d-flex justify-content-around`}>
                    <div className="col"><select 
                    className = "form"
                    name = "blok" 
                    type="submit"
                    value={props.blok} 
                    onChange = {props.filterHandler}>
                    <option value=''>Wszystkie</option>
                    <option value='A'>A</option>
                    <option value='B'>B</option>
                    <option value='C'>C</option>
                </select></div>
                    <div className="col"><select 
                    className = "form"
                    name = "funkcja"
                    type="submit"
                    value={props.funkcja}
                    onChange={props.filterHandler}>
                    <option value=''>Wszystkie</option>
                    <option value='pokój'>pokój</option>
                    <option value='sala wykładowa'>sala wykładowa</option>
                    <option value='sala komputerowa'>sala komputerowa</option>
                    <option value='pralnia'>pralnia</option>
                    <option value='aula'>aula</option>
                    <option value='pokój cichej nauki'>pokój cichej nauki</option>
                </select>  </div>
                    <div className="col">{props.count}</div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                </div>
            </>);
        case 'users':
            return(
                <div className={`${styles.head} d-flex justify-content-around`}>
                    <div className="col">Nazwisko i Imię</div>
                    <div className="col">Pozycja</div>
                    <div className="col">Nr Dokumentu</div>
                    <div className="col">e-mail</div>
                    <div className="col">Telefon</div>
                    <div className="col"></div>
                    <div className="col"></div>
                </div>
            );
        case 'active':
        case 'rooms':
            return(
                <div className={`${styles.head} d-flex justify-content-around`}>
                    <div className="col">Numer</div>
                    <div className="col">Użytkownik</div>
                    {props.content==="active"?
                    <div className="col">Godzina pobrania</div>
                    :<div className="col">Data rezerwacji</div>
                    }
                    <div className="col"></div>
                </div>
            );
        case 'archives':
            return(
                <div className={`${styles.head} d-flex justify-content-around`}>
                    <div className="col">Numer</div>
                    <div className="col">Użytkownik</div>
                    <div className="col">Godzina i data pobrania</div>
                    <div className="col">Godzina i data oddania</div>
                </div>
            );
        case 'inhabitant':
            return( <div className={`${styles.head} d-flex justify-content-around`}>
                    Mieszkańcy</div>)
      default:
        return 'BLAD';
    }
}