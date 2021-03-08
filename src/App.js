import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout/Layout';
import { BrowserRouter } from 'react-router-dom';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      testState: true
    };

  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Layout />  
        </div>
      </BrowserRouter>
    );
  } 
}

export default App;
