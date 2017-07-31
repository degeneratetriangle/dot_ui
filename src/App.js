import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Menu from './Menu';


class App extends Component {
  render() {
    return (
        <MuiThemeProvider>
            <Menu />
        </MuiThemeProvider>
    );
  }
}

export default App;
