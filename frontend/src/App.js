import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Keys  from './components/KeysFolder/Keys';

function App(){
  return (
    <div className="App">
      <Header />
      <Menu />
      <Keys />
    </div>);
}

export default App;