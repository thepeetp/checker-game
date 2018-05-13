import React, { Component } from 'react';
import './App.css';
import Board from './Board';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>Checker Game</header>
        <Board size={8}/>
      </div>
    );
  }
}

export default App;
