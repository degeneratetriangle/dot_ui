import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Menu from './Menu';
import Wizard from './Wizard';


class App extends Component {
  render() {
    return (
        <MuiThemeProvider>
            <div>
                <Menu />
                <Wizard />
            </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
