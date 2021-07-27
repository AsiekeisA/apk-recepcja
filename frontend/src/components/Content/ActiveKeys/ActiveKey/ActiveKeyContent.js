import ActiveKey from './ActiveKey'
import ActiveKeyRooms from './ActiveKeyRooms'


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
      default:
        return '404 NOT FOUND';
}
    
}