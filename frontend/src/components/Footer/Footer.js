import { useContext } from 'react';
import JakisKontekst from '../../context/theme';

const Footer = () => {
    const theme = useContext(JakisKontekst);
    return(
        <div className={`text-center text-${theme}`}>LALA</div>
    );
}

export default Footer;