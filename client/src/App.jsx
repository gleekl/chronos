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
import CreateProject from './components/Projects/CreateProject';
import CreateClient from './components/Clients/CreateClient';

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
  // Project Duration
  const [projectDuration, setProjectDuration] = useState([])
  // Project Duration
  const [projectSplit, setProjectSplit] = useState([])

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

  // Dashboard Chart Use
  const getProjectDuration = async () => {
    const url = "/dashboard/projectduration";
    const res = await fetch(url);
    const data = await res.json();
    setProjectDuration(data)
  }

  const getProjectSplit = async () => {
    const url = "/dashboard/projectsplit";
    const res = await fetch(url);
    const data = await res.json();
    setProjectSplit(data)
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

  // const handleEditUser = (editedUser) => {
  //   return async (fields) => {
  //     const res = await fetch(`/users/${editedUser.id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(fields)
  //     })
  //     const data = await res.json()
  //     const index = users.indexOf(users.find((user) => user.id === editedUser.id))
  //     setUser([
  //       ...users.splice(0, index),
  //       data,
  //       ...users.splice(index + 1)
  //     ])
  //     navigate('/profile')
  //   }
  // }

  const handleEditUser = async (userObj, userID) => {
    const formData = new FormData();

    for (let field in userObj) {
      formData.append(field, userObj[field]);
    }

    const res = await fetch(`/users/${userID}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      getUsers();

      let updatedUser = { ...users.find((user) => user._id === userID) };

      const index = users.findIndex((user) => user._id === userID);

      setUsers([...users.slice(0, index), updatedUser, ...users.slice(index + 1)]);

      navigate(`/`);

    } else {
      console.log("Error editing user.", userID);
    }
  };

  // const handleEditClient = async (client) => {
  //   const res = await fetch(`/clients/<${client.id}>`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(client)
  //   })
  //   const returnedItem = await res.json()
  //   const index = products.indexOf(products.find((item) => item.item_id === client.item_id))
  //   setProducts([
  //     ...products.splice(0, index),
  //     returnedItem,
  //     ...products.splice(index + 1)
  //   ])
  //   navigate("/items")
  // }

  ////////////////////////////////////////////////////////
  // Users
  ////////////////////////////////////////////////////////
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
    getProjectDuration()
    getProjectSplit()
  }, [])

  return (
    <ThemeProvider>
      <div className="App">
        {user !== undefined && <NavigationBar />}
        <main>
          {user ? <p>Logged in as {user.username}</p> : <p>Anonymous user</p>}
          <Routes>
            <Route
              path='/'
              element={
                <Dashboard
                projectDuration={projectDuration}
                projectSplit={projectSplit}
                />
              }
            />
            <Route
              path='/profile'
              element={
                <Profile
                  user={user}
                  users={users}
                  handleEditUser={handleEditUser}
                />
              }
            />

            {/* Timesheets */}
            <Route
              path='/timesheets'
              element={
                <Timesheets
                  timesheets={timesheets}
                />
              }
            />

            {/* Users */}
            <Route
              path='/users'
              element={
                <Users
                  users={users}
                />
              }
            />
            {/* Clients */}
            <Route
              path='/clients'
              element={
                <Clients
                  clients={clients}
                />
              }
            />
            {/* Create new client */}
            <Route
              path='/clients/new'
              element={
                <CreateClient
                  clients={clients}
                />
              }
            />

            {/* Projects */}
            <Route
              path='/projects'
              element={
                <Projects
                  projects={projects}
                />
              }
            />

            {/* Create new project */}
            <Route
              path='/projects/new'
              element={
                <CreateProject
                  projects={projects}
                  handleSubmit={handleSubmit}
                />
              }
            />

            {/* Register */}
            <Route
              path='/register'
              element={
                <Register
                  handleSubmit={handleSubmit("register")}
                />
              }
            />

            {/* Login */}
            <Route
              path='/login'
              element={
                <Login
                  handleSubmit={handleSubmit("login")}
                  handleLogin={handleAuthentication}
                />
              }
            />

            {/* Logout */}
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