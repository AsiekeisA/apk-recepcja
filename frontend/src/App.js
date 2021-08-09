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
import DataHeader from './components/DataHeader/DataHeader';
import { Switch } from 'react-router-dom';
import SwitchSearch from './components/UI/Searching/switch/switchSearch';

const reducer = (state,action) => {
  switch (action.type) {
    case 'set-backKeys':
      return { ...state, backKeys: action.backKeys};
    case 'set-showKeys':
      return { ...state, showKeys: action.showKeys};
    case 'set-keys':
      return { ...state, keys: action.keys};
    case 'set-users':
      return { ...state, users: action.users};
    case 'set-active':
      return { ...state, active: action.active};
    case 'set-archives':
      return { ...state, archives: action.archives};
    case 'set-loading':
      return { ...state, loading: action.loading};
    case 'change-content':
      return { ...state, content: action.content};
    case 'change-lastContent':
      return { ...state, lastContent: action.lastContent};
    default:
      throw new Error (' nie ma takiej funkcji '+ action.type)
  }
}
// const backKeys = [];
const initialState = {
  showKeys: [],
  backKeys: [],
  keys: [],
  users: [],
  active: [],
  archives: [],
  loading: true,
  lastContent:'',
  content: 'calendar',
  //theme: 'primary'
}

function App(){
  const [state, dispatch] = useReducer(reducer, initialState);
  

  const fetchBack = async () => {
    const resKeys = await axios.get('/keys');
    const resUsers = await axios.get('/users');
    const resActive = await axios.get('/active');
    const resArchives = await axios.get('/archives')
    const keys = resKeys.data;
    const users = resUsers.data;
    const active = resActive.data;
    const archives = resArchives.data;
    // setShowKeys(keys);
    // setKeys(keys);
    // // setAvailable(keys);
    // setBackKeys(keys);
    // setUsers(users);
    // setActive(active);
    dispatch({type: 'set-showKeys', showKeys:keys});
    dispatch({type: 'set-backKeys', backKeys:keys});
    dispatch({type: 'set-keys', keys:keys});
    dispatch({type: 'set-users', users:users});
    dispatch({type: 'set-active', active:active});
    dispatch({type: 'set-archives', archives:archives});
  }
//   const deleteKey = async(_id) => {
//     console.log('usuwanie', _id);
//     const keys = [...props.keys].filter(key => key._id !== _id);
//     await axios.delete('/keys/'+ _id);
//     props.setKeys(keys);
// }

  const searchHandler = name => {
    console.log('szukaj z app', name)
    const searchKeys = [...state.backKeys]
                    .filter(x => x.blok
                    .toLowerCase()
                    .includes(name.toLowerCase()));
    dispatch({type: 'set-keys', keys:searchKeys});
    // <SwitchSearch
    //   content={state.content}
    // />
  }

  useEffect(()=>{
    setTimeout(() => {
      fetchBack();
      // setLoading(false);
      dispatch({type: 'set-loading', loading:false});
    }, 1000);
  
  },[]);
  
  const changeContent = (content) => {
    dispatch({type: 'change-lastContent', lastContent:state.content})
    dispatch({type: 'change-content', content:content});  
  }


  // const available = useCallback( ()=> {
  //   var table = [...keys];
  //   for (var i=active.length; i>0; i--){
  //     const act =active[i-1].key_id;
  //     const ava = [...table].filter(keys=>(keys.numer+' '+keys.blok)!==act);
  //     table =ava;
  //     console.log(table.lenght)
  //   }
  //   return table;
  //   //setAvailable(table)
  // }, [active]);



  const header = <Header>
    <Searching  onSearch={name => searchHandler(name)}/>
  </Header>
  const menu = (
    <Menu changeContent={content=>changeContent(content)}/>
  );
  const content = (
    state.loading ? 
    <Loading />
    :<Content 
        content={state.content}
        lastContent={state.lastContent}
        keys={state.keys}
        active={state.active}
        archives={state.archives}
        users={state.users}
        showKeys={state.showKeys}
        backKeys={state.backKeys}
        // availableKeys={availableKeys}
        changeContent={changeContent}
        setBackKeys={keys=>dispatch({type: 'set-backKeys', backKeys:keys})}
        setKeys={keys=>dispatch({type: 'set-keys', keys:keys})}
        setUsers={users=>dispatch({type: 'set-users', users:users})}
        setActive={active=>dispatch({type: 'set-active', active:active})}
        setArchives={archives=>dispatch({type: 'set-archives', archives:archives})}
        setShowKeys={showKeys=>dispatch({type: 'set-showKeys', showKeys:showKeys})}
        // setAvailable={setAvailable}
        // available={available}
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