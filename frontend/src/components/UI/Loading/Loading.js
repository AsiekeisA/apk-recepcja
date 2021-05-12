import JakisKontekst from '../../../context/theme';

export default function Loading() {
    return(
      <JakisKontekst.Consumer>
        {value => (
          <div className={`spinner-border m-5 text-${value}`} role="status">
          {/* <span className="sr-only">Ładowanie...</span> */}
          </div>
        )}
      </JakisKontekst.Consumer>
  );
} 