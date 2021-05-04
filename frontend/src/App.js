import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Keys  from './components/KeysFolder/Keys';
import Users  from './components/Users/Users';
import Layout from './components/Layout/Layout';
import axios from './axios';
import Loading from './components/UI/Loading/Loading';
import Searching from './components/UI/Searching/Searching';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: [],
      //  {
      //     id: '2154',
      //     numer: 32,
      //     blok: 'C',
      //     funkcja: 'pralnia',
      //     ile: 1
      // },
      // {
      //     id: '2100',
      //     numer: 328,
      //     blok: 'C',
      //     funkcja: 'room',
      //     ile: 3
      // }
      
      editKey: {},
      showEditModal: false,
      loading: true,
    };
  }

  async fetchKeys() {
    const res = await axios.get('/keys');
    const keys = res.data;
    this.setState({keys,loading: false});
}

componentDidMount() {
  this.fetchKeys();
  //Modal.setAppElement('body');
}

  searchHandler(name) {
    console.log('szukaj z app', name)
    const keys = [...this.state.keys]
                    .filter(x => x.blok
                    .toLowerCase()
                    .includes(name));
    this.setState({keys});
  }

  render() {
    return (
      <div className="App" >
          {/* <Layout 
            header={ */}
              <Header />
            {/*  }
            menu={ */}
              <Menu>
                <Searching onSearch={name => this.searchHandler(name)}/>
              </Menu>
            {/* }
            content={ */}
            {this.state.loading ? 
              <Loading />
               : 
                <Keys 
                  keys={this.state.keys} 
                  editKey={this.state.editKey} 
                  showEditModal={this.state.showEditModal}
                  setKeyState={keys => this.setState({keys})}
                />   
              }
              
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
}

export default App;