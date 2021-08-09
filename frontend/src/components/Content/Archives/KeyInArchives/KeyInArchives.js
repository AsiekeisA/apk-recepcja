import styles from '../../KeysFolder/KeyFolder/Key.module.css';

export default function KeyInArchives(props) {

    const keyIndex = [...props.backKeys].findIndex(x=>x._id===props.key_id)
    const userIndex = [...props.users].findIndex(x=>x._id===props.user_id)
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