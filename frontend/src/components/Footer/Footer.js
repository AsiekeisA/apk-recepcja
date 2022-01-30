import styles from './Footer.module.css'

/**
 * 
 * @returns tekst stopki
 */
const Footer = () => {
    return(
        <div className={`text-end ${styles.footer}`}>by Joanna Dębek 2022</div>
    );
}

export default Footer;