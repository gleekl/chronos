import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";

import './App.css';
import Clients from './components/Clients/Clients';
import NavigationBar from './components/Navigation/NavigationBar';
import Projects from './components/Projects/Projects';
import Timesheets from './components/Timesheets/Timesheets';
import Users from './components/Users/Users';

const App = () => {
  return (
    <div className="App">
      <NavigationBar />
      <main>
        <h1>Test</h1>
        {/* <Clients />
        <Timesheets />
        <Projects /> */}
        <Routes>
          <Route path='/users' element={<Users />}/>
          <Route path='/clients' element={<Clients />}/>
          <Route path='/projects' element={<Timesheets />}/>
          <Route path='/timesheets' element={<Projects />}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;