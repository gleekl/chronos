import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";

import './App.css';
import Clients from './components/Clients/Clients';
import NavigationBar from './components/Navigation/NavigationBar';
import Projects from './components/Projects/Projects';
import Timesheets from './components/Timesheets/Timesheets';
import Users from './components/Users/Users';
import Profile from './pages/Profile';

const App = () => {
  const [users, setUsers] = useState([])
  console.log(users);

  const getUsers = async () => {
    const url = "/users";
    const res = await fetch(url);
    const data = await res.json();
    setUsers(data)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="App">
      <NavigationBar />
      <main>
        <Routes>
          {/* <Route path='/' element={<Dashboard />}/> */}
          <Route
            path='/profile'
            element={
              <Profile 
                users={users}
              />
            }
          />
          <Route path='/timesheets' element={<Projects />} />
          <Route
            path='/users'
            element={
              <Users
                users={users}
              />
            }
          />
          <Route path='/clients' element={<Clients />} />
          <Route path='/projects' element={<Timesheets />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;