import { useContext } from 'react';
import JakisKontekst from '../../context/theme';

const Footer = () => {
    const theme = useContext(JakisKontekst);
    return(
        <div className={`text-center text-${theme}`}>stopka</div>
    );
}

export default Footer;