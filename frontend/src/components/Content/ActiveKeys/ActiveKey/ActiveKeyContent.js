import ActiveKey from './ActiveKey'
import ActiveKeyRooms from './ActiveKeyRooms'
import ActiveKeyInhabitants from './ActiveKeyInhabitants'

/**
 * Komponent zmieniający zawartość w zależności od wyboru
 * @param  props 
 * @returns wybrany komponent związany z rezerwacją kluczy 
 */
export default function ActiveKeyContent(props) {
        
    switch(props.content) {
      case 'rooms':
        return(
            <>{props.active
              .sort((a, b) => a.dataQuit > b.dataQuit ? -1 : 1)
              .sort((a, b) => a.data > b.data ? 1 : -1)
              .map(active => (
                <ActiveKeyRooms
                    key={active._id}
                    {...active}
                    backKeys={props.backKeys}
                    keys={props.keys}
                    users={props.users}
                    onEdit={props.onEdit}
                    onDelete={props.onDelete}></ActiveKeyRooms>
            ))}</>);
      case 'active':
        return( 
            <>{props.active
              .sort((a, b) => a.dataQuit > b.dataQuit ? -1 : 1)
              .sort((a, b) => a.data > b.data ? 1 : -1)
              .map(active => (
                <ActiveKey
                    key={active._id}
                    {...active}
                    backKeys={props.backKeys}
                    keys={props.keys}
                    users={props.users}
                    onEdit={props.onEdit}
                    onDelete={props.onDelete}></ActiveKey>    
            ))}</>);
      case 'inhabitant':
        return( 
            <>{props.backKeys.filter(x=>x.funkcja==="pokój")
            .sort((a, b) => a.numer > b.numer ? -1 : 1)
            .sort((a, b) => a.blok > b.blok ? 1 : -1)
            .map(keys => (
                <ActiveKeyInhabitants
                    key={keys._id}
                    {...keys}
                    active={props.active}
                    users={props.users}
                    makeTemp={props.makeTemp}
                    onEdit={props.onEdit}
                    onDelete={props.onDelete}></ActiveKeyInhabitants>    
            ))}</>);
      default:
        return '404 NOT FOUND';
}
    
}