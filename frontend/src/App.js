import { useEffect, useReducer, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Keys  from './components/Content/KeysFolder/Keys';
import Users  from './components/Content/Users/Users';
import Layout from './components/Layout/Layout';
import axios from './axios';
import Loading from './components/UI/Loading/Loading';
import Searching from './components/UI/Searching/Searching';
import Footer from './components/Footer/Footer';
import JakisKontekst from './context/theme';
import ContentContext from  './context/contentContext';
import Content from './components/Content/content';
import ActiveKeys from './components/Content/ActiveKeys/ActiveKeys';

// const backKeys = [];

function App(){
  const [backKeys, setBackKeys] = useState([]);
  const [keys, setKeys] = useState([]);
  const [users, setUsers] = useState([]);
  const [active, setActive] = useState([]);
  // const [showEditModal, setEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('primary');
  // const [contentState, setContentState] = useState('keys');

  const [state, dispatch] = useReducer((state, action) => {
    //if(action.type === 'change-Content'){
      state=action.value;
    //}
    return state;
  }, 'active');

  const fetchBack = async () => {
    const resKeys = await axios.get('/keys');
    const resUsers = await axios.get('/users');
    const resActive = await axios.get('/active');
    const keys = resKeys.data;
    const users = resUsers.data;
    const active = resActive.data;
    setKeys(keys);
    setBackKeys(keys);
    setUsers(users);
    setActive(active);
}

  const searchHandler = name => {
    console.log('szukaj z app', name)
    const searchKeys = [...backKeys]
                    .filter(x => x.blok
                    .toLowerCase()
                    .includes(name.toLowerCase()));
    setKeys(searchKeys);
  }

  useEffect(()=>{
    setTimeout(() => {
      fetchBack();
      setLoading(false);
    }, 1000);
  },[]);
  
  const changeContent = (value) => {
    dispatch({type: 'change-Content', value});  
  }
  const switchCase = () =>{
    switch(state) {
        case 'keys':
          return(<Keys
            keys={keys} 
            setKeys={keys => setKeys(keys)}
          />);
        case 'users':
          return(<Users
            users={users}
            setUsers={users => setUsers(users)}
          />);
        case 'active':
          return(<ActiveKeys
            active={active}
            setActive={active => setActive(active)}
          />);
        default:
          return 'active';
  }}

  const header = <Header />
  const menu = (
    <Menu changeContent={content=>changeContent(content)}>
      <Searching  onSearch={name => searchHandler(name)}/>
    </Menu>
  );
  const content = (
    // <ContentContext.Provider value={{
    //   whichContent: state, 
    //   onChange: changeContent
    // }}>
    // {
    loading ? 
    <Loading />
    : switchCase()
    
    // }
    // </ContentContext.Provider>
  );
      
  const footer = <Footer />

  return(
    <JakisKontekst.Provider value="primary">
          <Layout 
            header={header}
            menu={menu}
            content={content}
            footer={footer}
          /> 
      </JakisKontekst.Provider>
  );
}

export default App;