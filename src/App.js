import React, { Component } from 'react';
import './App.css';
import './index.css';
import './reset.css';
import './Loading.css';
import Board from "./Board";

class App extends Component {
  render() {
    return (
      <div>
        <Board />
      </div>
    );
  }
}

export default App;
