import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";

import './App.css';
import Clients from './components/Clients/Clients';
import NavigationBar from './components/Navigation/NavigationBar';
import Timesheets from './components/Timesheets/Timesheets';
import Login from './components/Users/Login';
import Logout from './components/Users/Logout';
import Register from './components/Users/Register';
import Users from './components/Users/Users';
import Profile from './components/Profile/Profile';
import Projects from './components/Projects/Projects';
import Dashboard from './components/Dashboard/Dashboard';
import ThemeProvider from './theme';

const App = () => {
  // Logged in user
  const [user, setUser] = useState(null)
  const [authorised, setAuthorised] = useState(null);

  // Users
  const [users, setUsers] = useState([])
  // Clients
  const [clients, setClients] = useState([])
  // Projects
  const [projects, setProjects] = useState([])
  // Timesheets
  const [timesheets, setTimesheets] = useState([])
  // Activities
  const [activities, setActivities] = useState([])

  const navigate = useNavigate();

  const getUsers = async () => {
    const url = "/users";
    const res = await fetch(url);
    const data = await res.json();
    setUsers(data)
  }

  const getClients = async () => {
    const url = "/clients";
    const res = await fetch(url);
    const data = await res.json();
    setClients(data)
  }

  const getProjects = async () => {
    const url = "/projects";
    const res = await fetch(url);
    const data = await res.json();
    setProjects(data)
  }

  const getTimesheets = async () => {
    const url = "/timesheets";
    const res = await fetch(url);
    const data = await res.json();
    setTimesheets(data)
  }

  const getActivities = async () => {
    const url = "/activities";
    const res = await fetch(url);
    const data = await res.json();
    setActivities(data)
  }

  useEffect(() => {
    const checkLoggedIn = async () => {
      const res = await fetch('/is-authenticated')
      const data = await res.json()
      setUser(data.user)
    }
    if (!user) checkLoggedIn()
  }, [])

  const handleSubmit = (whichForm) => {
    return async (fields) => {
      const res = await fetch(`/${whichForm}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fields)
      })
      const data = await res.json()
      setUser(data.user)
      navigate("/");
    }
  }

  const handleLogout = async () => {
    const res = await fetch('/logout', {
      method: 'POST'
    })
    const data = await res.json()
    if (data.success) setUser(null)
    navigate('/login')
  }

  const handleAuthentication = (authed) => {
    setAuthorised(authed);
    navigate("/");
  };

  const checkIfLoggedIn = async () => {
    const res = await fetch("/is-authenticated");
    const data = await res.json();
    setAuthorised(data.authorised);
  };

  useEffect(() => {
    checkIfLoggedIn();
    getUsers()
    getClients()
    getProjects()
    getTimesheets()
    getActivities()
  }, [])

  return (
    <ThemeProvider>
      <div className="App">
        {user !== undefined && <NavigationBar />}
        <main>
          {user ? <p>Logged in as {user.username}</p> : <p>Anonymous user</p>}
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route
              path='/profile'
              element={
                <Profile
                  user={user}
                />
              }
            />
            <Route
              path='/timesheets'
              element={
                <Timesheets
                  timesheets={timesheets}
                />
              }
            />
            <Route
              path='/users'
              element={
                <Users
                  users={users}
                />
              }
            />
            <Route
              path='/clients'
              element={
                <Clients
                  clients={clients}
                />
              }
            />
            <Route
              path='/projects'
              element={
                <Projects
                  projects={projects}
                />
              }
            />
            <Route
              path='/register'
              element={
                <Register
                  handleSubmit={handleSubmit("register")}
                />
              }
            />
            <Route
              path='/login'
              element={
                <Login
                  handleSubmit={handleSubmit("login")}
                  handleLogin={handleAuthentication}
                />
              }
            />
            <Route
              path='/logout'
              element={
                <Logout handleLogout={handleLogout}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}


export default App;