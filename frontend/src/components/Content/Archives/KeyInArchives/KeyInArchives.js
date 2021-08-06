import styles from '../../KeysFolder/KeyFolder/Key.module.css';

export default function KeyInArchives(props) {

    const keyIndex = [...props.backKeys].findIndex(x=>x._id===props.key_id)
    const userIndex = [...props.users].findIndex(x=>x._id===props.user_id)
    const data=new Date(props.data).toLocaleString();
    console.log(data);


    return (
        <div className={`${styles.key} flexbox-container`}>
        <div className="col">{props.backKeys[keyIndex].numer+' '+props.backKeys[keyIndex].blok}</div>
        <div className="col">{props.users[userIndex].lastName+' '+props.users[userIndex].firstName}</div>
        <div className="col">{props.data}</div>
        <div className="col">{props.dataQuit}</div>
        </div>
    );
}