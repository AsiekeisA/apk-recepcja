import { useState } from 'react';
import styles from '../KeysFolder/Keys.module.css';
import KeyInArchives from './KeyInArchives/KeyInArchives';
import DataHeader from '../../DataHeader/DataHeader';


function Archives(props) {

    const [archives, setArchives]=useState(props.archives)

    return (
        <div className={`${styles.keys} flexbox-container`}>
            <DataHeader 
                content={props.content}
            />
            {archives
                .sort((a, b) => a.dataQuit > b.dataQuit ? -1 : 1)
                .sort((a, b) => a.data > b.data ? 1 : -1)
                .map(archives => (
                <KeyInArchives
                    {...archives}
                    backKeys={props.backKeys}
                    users={props.users}
            />))}
        </div>
        );
}
export default Archives;