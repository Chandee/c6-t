import { useState } from 'react';
import './App.css';
import Calculadora from './components/Calculadora';

function App() {
  return (
    <div className='App'>
      <div className='myHeader'>
        <h1>C6 bank</h1>
      </div>
      <div className='content'>
        <Calculadora />
      </div>
    </div>
  );
}

export default App;
