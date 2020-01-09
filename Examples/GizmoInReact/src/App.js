import React from 'react';
import logo from './logo.svg';
import './App.css';

import GraphComponent from './GraphComponent'

function App() {

  
  return (
    <div className="App">
      <header className="App-header">
        <GraphComponent id="renderingId_1" />
      </header>
    </div>
  );
}

export default App;
