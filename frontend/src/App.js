import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Keys  from './components/KeysFolder/Keys';
import Users  from './components/Users/Users';
import Layout from './components/Layout/Layout';

function App(){
  return (
 <div className="App" >
      {/* <Layout 
       header={ */}
          <Header />
       {/*  }
        menu={ */}
          <Menu />
        {/* }
        content={ */}
          <Keys />
          </div>
      //  }
      //   footer={
      //    <div>stopka</div>
      //   }
      // />
      /* <Keys /> */
      /* <Users /> */
  );
}

export default App;