import ActiveKey from './ActiveKey'
import ActiveKeyRooms from './ActiveKeyRooms'
import ActiveKeyInhabitants from './ActiveKeyInhabitants'


export default function ActiveKeyContent(props) {
  
    switch(props.content) {
      case 'rooms':
        return(
            <>{props.active.map(active => (
                <ActiveKeyRooms
                    key={active._id}
                    {...active}
                    keys={props.keys}
                    users={props.users}
                    onEdit={props.onEdit}
                    onDelete={props.onDelete}></ActiveKeyRooms>
            ))}</>);
      case 'active':
        return( 
            <>{props.active.map(active => (
                <ActiveKey
                    key={active._id}
                    {...active}
                    keys={props.keys}
                    users={props.users}
                    onEdit={props.onEdit}
                    onDelete={props.onDelete}></ActiveKey>    
            ))}</>);
      case 'inhabitant':
        return( 
            <>{props.active.map(active => (
                <ActiveKeyInhabitants
                    key={active._id}
                    {...active}
                    keys={props.keys}
                    users={props.users}
                    onEdit={props.onEdit}
                    onDelete={props.onDelete}></ActiveKeyInhabitants>    
            ))}</>);
      default:
        return '404 NOT FOUND';
}
    
}