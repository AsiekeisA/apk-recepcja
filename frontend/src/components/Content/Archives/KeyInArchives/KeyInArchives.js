import styles from '../../KeysFolder/KeyFolder/Key.module.css';

/**
 * 
 * @param props 
 * @returns Zarchiwizowane pobranie klucza 
 */
export default function KeyInArchives(props) {

    const keyIndex = [...props.backKeys].findIndex(x=>x._id===props.key_id)
    console.log(props.backKeys[keyIndex])
    const userIndex = [...props.users].findIndex(x=>x._id===props.user_id)
    console.log(props.users[userIndex])
    const date=new Date(props.data).toLocaleString();
    const dateQ=new Date(props.dataQuit).toLocaleString();


    return (
        <div className={`${styles.key} flexbox-container`}>
        <div className="col">{props.backKeys[keyIndex].numer+' '+props.backKeys[keyIndex].blok}</div>
        <div className="col">{props.users[userIndex].lastName+' '+props.users[userIndex].firstName}</div>
        <div className="col">{date}</div>
        <div className="col">{dateQ}</div>
        </div>
    );
}