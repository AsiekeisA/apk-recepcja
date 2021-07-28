import { useState } from 'react';

export default function DataHeader(props) {

    const [sort, setSort] = useState('');
    const sortHandler = event =>{
        const value = event.target.value;
        const sortItems = [...props.items].sort((a,b) => {
            if (a[value] < b[value])
                return -1;
            if (a[value] > b[value])
                return 1;
            else
                return 0;
            });
        props.setItems(sortItems);
        setSort(value);
    }

    switch(props.content) {
        case 'keys':
        return(<>
            <div className="d-flex justify-content-around">
                <div className="col"><select
                    className = "form-control"
                    type = "submit"
                    value={sort}
                    onChange={sortHandler}
                    >
                        <option value="" disabled selected>sortuj</option>
                        <option value='numer'>numer</option>
                        <option value='blok'>blok</option>
                        <option value='ileDost'>ilość miejsc</option>
                    </select>
                </div>
                <div className="col">Numer</div>
                <div className="col">funkcja</div>
                <div className="col">dostępne</div>
                <div className="col"></div>
                <div className="col"></div>
                <div className="col"></div>
            </div>
            <div className="d-flex justify-content-around">
                <div className="col"></div>
                <div className="col">Numer</div>
                <div className="col">funkcja</div>
                <div className="col">dostępne</div>
                <div className="col"></div>
                <div className="col"></div>
                <div className="col"></div>
            </div>
        </>);
      case 'users':
        return(
            <div className="d-flex justify-content-around">
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
      case 'inhabitant':
        return(
            <div className="d-flex justify-content-around">
                <div className="col">Numer</div>
                <div className="col">Użytkownik</div>
                <div className="col">Data</div>
                <div className="col"></div>
                <div className="col"></div>
            </div>
        );
      default:
        return 'BLAD';
    }
}