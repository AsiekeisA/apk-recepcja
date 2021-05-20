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
import Content from './components/Content/content';
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
  const [newActiveTemp, setKeyA] = useState({})
  const idIntoKey = (key) => {
      setKeyA(key);
    console.log(newActiveTemp);
    changeContent('newActive')
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

  const available = () => {
      for (var i=active.length; i>0; i--){
      const act =active[i-1];
      const ava = [...availableKeys].filter(keys=>(keys.numer+' '+keys.blok)!==act.key_id);
      console.log(ava); 
      //setAvailable(ava);
      //console.log(availableKeys);
    }}

  const addActive = async(aactive) => {
    const actives = [...active];
    const res = await axios.post('/active', aactive);
    const newActive = res.data;
    actives.push(newActive);
    setActive(actives);
    console.log('dodawanie');
  }

  const switchCase = () =>{
    switch(state) {
        case 'keys':
          return(<Keys
            idIntoKey={idIntoKey}
            changeContent={changeContent}
            keys={availableKeys}
            active={active}
            //setWhich={whichKey => setWhich(whichKey)}
            setKeys={setKeys}
          />);
        case 'users':
          return(<Users
            users={users}
            setUsers={users => setUsers(users)}
          />);
        case 'active':
          return(<ActiveKeys
            keys={keys}
            active={active}
            setActive={active => setActive(active)}
          />);
          case 'newActive':
            
            return(<NewActive
              key_id={newActiveTemp.numer+' '+newActiveTemp.blok}
              key_idDB={newActiveTemp._id}
              setKeyA={setKeyA}
              changeContent={content=>changeContent(content)}
              onAdd={(active) => addActive(active)}
            />);
        default:
          return 'BLAD';
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