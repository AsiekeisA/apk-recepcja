function NewActiveUser(props) {

    const dataChange = () =>{
        props.setUserName(props.firstName);
        props.setUserLastname(props.lastName);
        props.setUser(props._id);
        props.setIfExist(false);
    } 

    return(
       <button onClick={dataChange}>{props.lastName} {props.firstName} - {props.position}</button>
    );
}

export default NewActiveUser;