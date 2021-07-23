function NewActiveUser(props) {

    const dataChange = () =>{
        props.setUserName(props.firstName);
        props.setUserLastname(props.lastName);
        props.setUser(props._id);
    } 

    return(
       <button onClick={dataChange}>{props.lastName} {props.firstName}</button>
    );
}

export default NewActiveUser;