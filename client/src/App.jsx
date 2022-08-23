import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";

import './App.css';
import NavigationBar from './components/Navigation/NavigationBar';

const App = () => {
  return (
    <div className="App">
      <NavigationBar />
      <main>
        <h1>Test</h1>
      </main>
    </div>
  );
}

export default App;