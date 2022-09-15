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

  ////////////////////////////////////////////////////////
  // Chart auto-refresh
  ////////////////////////////////////////////////////////
  
  // useEffect(() => {
  //   const reloadProjectDuration = async () => {
  //     const res = await fetch("/dashboard/projectduration")
  //     const data = await res.json()
  //     setProjectDuration(data)
  //   }

  //   const interval = setInterval(() => {
  //     reloadProjectDuration()
  //   }, 10000)

  //   return () => clearInterval(interval)

  // }, [projectDuration])

  // // 
  // useEffect(() => {
  //   const reloadProjectSplit = async () => {
  //     const res = await fetch("/dashboard/projectsplit")
  //     const data = await res.json()
  //     setProjectSplit(data)
  //   }

  //   const interval = setInterval(() => {
  //     reloadProjectSplit()
  //   }, 10000)

  //   return () => clearInterval(interval)

  // }, [projectSplit])

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

  const handleCreateClient = async (newClient) => {
    const res = await fetch("/clients/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newClient)
    })
    if (res.ok) {
      const data = await res.json()
      setClients([
        ...clients,
        data
      ])
      navigate("/clients")
    } else {
      console.log("Error creating new Client.");
    }
  }

  const handleCreateProject = async (newProject) => {
    const res = await fetch("/projects/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject)
    })
    if (res.ok) {
      const data = await res.json()
      setProjects([
        ...projects,
        data
      ])
      navigate("/projects")
    } else {
      console.log("Error creating new Project.");
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
    console.log(...formData);
    const res = await fetch(`/users/${userID}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      getUsers();
      let updatedUser = { ...users.find((user) => user._id === userID) };
      const index = users.findIndex((user) => user._id === userID);
      setUsers([...users.slice(0, index), updatedUser, ...users.slice(index + 1)]);
      navigate(`/profile`);
    } else {
      console.log("Error editing user.", userID);
    }
  };

  const handleEditClient = async (clientObj, clientID) => {
    const formData = new FormData();
    for (let field in clientObj) {
      formData.append(field, clientObj[field]);
    }

    const res = await fetch(`/clients/${clientID}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      getUsers();
      let updatedClient = { ...users.find((client) => client._id === clientID) };
      const index = clients.findIndex((client) => client._id === clientID);
      setClients([...clients.slice(0, index), updatedClient, ...clients.slice(index + 1)]);
      navigate(`/clients`);
    } else {
      console.log("Error editing user.", clientID);
    }
  };

  const handleEditProject = async (projectObj, projectID) => {
    const formData = new FormData();
    for (let field in projectObj) {
      formData.append(field, projectObj[field]);
    }
    console.log(...formData);
    const res = await fetch(`/projects/${projectID}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      getProjects();
      let updatedProject = { ...projects.find((project) => project._id === projectID) };
      const index = projects.findIndex((project) => project._id === projectID);
      setProjects([...projects.slice(0, index), updatedProject, ...projects.slice(index + 1)]);
      navigate(`/projects`);
    } else {
      console.log("Error editing user.", projectID);
    }
  };

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
        <NavigationBar />
        <main>
          {/* {user ? <p>Logged in as {user.username}</p> : <p>Anonymous user</p>} */}
          <Routes>
            <Route
              path='/'
              element={
                <Dashboard
                  users={users}
                  projects={projects}
                  clients={clients}
                  projectDuration={projectDuration}
                  projectSplit={projectSplit}
                />
              }
            />
            <Route
              path='/profile'
              element={
                user && <Profile
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
                  handleCreateClient={handleCreateClient}
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
                  user={user}
                  clients={clients}
                  handleCreateProject={handleCreateProject}
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