import React from 'react';

function Key(props) {
    return (
        <div className="key">
            <p>{props.numer} {props.blok}</p>
            <div className="funkcja">{props.funkcja}</div>
            <button>edytuj</button>
            <button className="delete">usuń</button>
        </div>
    );
}

export default Key;