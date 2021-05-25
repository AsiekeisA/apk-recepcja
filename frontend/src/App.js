import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
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
import Content from './components/Content/Content';
import ActiveKeys from './components/Content/ActiveKeys/ActiveKeys';
import NewActive from './components/Content/ActiveKeys/NewActive/NewActive';
import ActiveKey from './components/Content/ActiveKeys/ActiveKey/ActiveKey';

// const backKeys = [];

function App(){
  const [backKeys, setBackKeys] = useState([]);
  const [keys, setKeys] = useState([]);
  const [users, setUsers] = useState([]);
  const [active, setActive] = useState([]);
  const [availableKeys, setAvailable]  = useState([]);
  // const [showEditModal, setEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('primary');
  // const [contentState, setContentState] = useState('keys');
  const [state, dispatch] = useReducer((state, action) => {
    //if(action.type === 'change-Content'){
      state=action.value;
    //}
    return state;
  }, 'keys');

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
    setAvailable(keys);
    
}
  

//   const deleteKey = async(_id) => {
//     console.log('usuwanie', _id);
//     const keys = [...props.keys].filter(key => key._id !== _id);
//     await axios.delete('/keys/'+ _id);
//     props.setKeys(keys);
// }

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

  // const available = () => {
  //   var table = [...keys];
  //   for (var i=active.length; i>0; i--){
  //     const act =active[i-1].key_id;
  //     const ava = [...table].filter(keys=>(keys.numer+' '+keys.blok)!==act);
  //     table =ava;
  //     console.log(active.length)
  //   }
  //   setAvailable(table)
  // }



  const header = <Header>
    <Searching  onSearch={name => searchHandler(name)}/>
  </Header>
  const menu = (
    <Menu changeContent={content=>changeContent(content)}/>
  );
  const content = (
    loading ? 
    <Loading />
    : <Content 
        state={state}
        changeContent={changeContent}
        keys={keys}
        active={active}
        setKeys={setKeys}
        users={users}
        setUsers={setUsers}
        setActive={setActive}
      />
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