import styles from '../../KeysFolder/KeyFolder/Key.module.css';

/**
 * Komponent wyświetlający daną rezerwację pokoju przez gości
 * @param {*} props 
 * @returns Wiersz z informacjami rezerwacji
 */
function ActiveKey(props) {

    const editHandler = () => {
        props.onEdit({
            _id: props._id, 
            key_id: props.key_id,
            user_id: props.user_id,
            data: props.data,
            dataQuit: props.dataQuit,
            live:props.live
        })
    }

    const keyIndex = [...props.backKeys].findIndex(x=>x._id===props.key_id)
    const userIndex = [...props.users].findIndex(x=>x._id===props.user_id)
    const date=new Date(props.data).toLocaleDateString();
    const dateQ=new Date(props.dataQuit).toLocaleDateString();

    return (
        <>
        {props.backKeys[keyIndex].funkcja==='pokój' && !props.live ?
        <div className={`${styles.key} flexbox-container`}>
        <div className="col">{props.backKeys[keyIndex].numer+' '+props.backKeys[keyIndex].blok}</div>
        <div className="col">{props.users[userIndex].lastName+' '+props.users[userIndex].firstName}</div>
        <div className="col">{date} - {dateQ}</div>
        <div className="col"><button className={`${styles.button} btn btn-primary`} onClick={editHandler}>Podgląd</button></div>
        </div>
    :<></>}</>);
}

export default ActiveKey;