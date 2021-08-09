import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from '../../KeysFolder/KeyFolder/Key.module.css';
import {Link} from 'react-router-dom';

function ActiveKeyInhabitants(props) {

    // const editHandler = () => {
    //     props.onEdit({
    //         _id: props._id, 
    //         key_id: props.key_id,
    //         user_id: props.user_id,
    //         data: props.data,
    //         dataQuit: props.dataQuit,
    //         live:props.live
    //     })
    // }

    // const keyIndex = [...props.backKeys].findIndex(x=>x._id===props.key_id)
    // const userIndex = [...props.users].findIndex(x=>x._id===props.user_id)
    // const date=new Date(props.data).toLocaleDateString();
    // const dateQ=new Date(props.dataQuit).toLocaleDateString();

    const inhabitant = [...props.active].filter(active => active.key_id===props._id&&active.live)
    const names = useMemo(() => {
        var table=[]
        for (let i=0; i<props.ile; i++){
            if (inhabitant[i]){
                const u_id=[...props.users].findIndex(user=>user._id===inhabitant[i].user_id)
                table.push(<div className='col'>{props.users[u_id].lastName} {props.users[u_id].firstName}</div>)
            }else{
                table.push(<div className='col'><button>wynajmij</button></div>)
            }
        }
        return table
},[])

    return (
        <div className={`${styles.key} flexbox-container`}>
            {inhabitant[0]?<>
                <div className='col'>{props.numer} {props.blok}</div>
                {names}</>
            :<></>}
        </div>
    //     {/* {props.backKeys[keyIndex].funkcja==='pokój' && props.live ?
    //     <div className={`${styles.key} flexbox-container`}>
    //     <div className="col">{props.backKeys[keyIndex].numer+' '+props.backKeys[keyIndex].blok}</div>
    //     <div className="col">{props.users[userIndex].lastName+' '+props.users[userIndex].firstName}</div>
    //     <div className="col">{date} - {dateQ}</div>
    //     <div className="col"><button className={`${styles.button} btn btn-primary`} onClick={editHandler}>edytuj</button></div>
    //     <div className="col"><button className={`${styles.button} btn btn-primary`} onClick={() => {props.onDelete(props._id, props.data)}}>usuń</button></div>
    //     </div>
    // :<></>} */}
    );
}

export default ActiveKeyInhabitants;