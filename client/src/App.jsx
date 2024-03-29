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
import ProtectedRoute from './components/Protected/ProtectedRoute';

const App = () => {
  // Logged in user
  const [user, setUser] = useState(null)
  const [authorised, setAuthorised] = useState(null);
  // Activities
  const [activities, setActivities] = useState([])
  // Clients
  const [clients, setClients] = useState([])
  // Projects
  const [projects, setProjects] = useState([])
  // Project Duration
  const [projectDuration, setProjectDuration] = useState([])
  // Project Duration
  const [projectSplit, setProjectSplit] = useState([])
  // Tasks
  const [tasks, setTasks] = useState([])
  // Timesheets
  const [timesheets, setTimesheets] = useState([])
  // Users
  const [users, setUsers] = useState([])

  const navigate = useNavigate();

  const getActivities = async () => {
    const url = "/api/activities";
    const res = await fetch(url);
    const data = await res.json();
    setActivities(data)
  }

  const getClients = async () => {
    const url = "/api/clients";
    const res = await fetch(url);
    const data = await res.json();
    setClients(data)
  }

  const getProjects = async () => {
    const url = "/api/projects";
    const res = await fetch(url);
    const data = await res.json();
    setProjects(data)
  }

  // Dashboard Chart Use
  const getProjectDuration = async () => {
    const url = "/api/dashboard/projectduration";
    const res = await fetch(url);
    const data = await res.json();
    setProjectDuration(data)
  }

  const getProjectSplit = async () => {
    const url = "/api/dashboard/projectsplit";
    const res = await fetch(url);
    const data = await res.json();
    setProjectSplit(data)
  }

  const getTasks = async () => {
    const url = "/api/tasks";
    const res = await fetch(url);
    const data = await res.json();
    setTasks(data)
  }

  const getUser = async () => {
    const url = "/api/users";
    const res = await fetch(url);
    const data = await res.json();
    const filteredUser = data.filter((currentUser) => console.log(currentUser))
    setUsers(data)
  }

  const getUsers = async () => {
    const url = "/api/users";
    const res = await fetch(url);
    const data = await res.json();
    setUsers(data)
  }

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

  const handleCreateClient = async (newClient) => {
    const res = await fetch("/api/clients/new", {
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
    const res = await fetch("/api/projects/new", {
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
    const res = await fetch(`/api/users/${userID}`, {
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
      getClients();
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
  const handleSubmit = (whichForm) => {
    return async (fields) => {
      const res = await fetch(`/${whichForm}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fields)
      })

      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
        navigate("/")
      } else {
        console.log(`Error when trying to ${whichForm}.`);
      }

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

  useEffect(() => {
    const getTimesheets = async () => {
      const url = "/api/timesheets";
      const res = await fetch(url);
      const data = await res.json();
      const filteredTimesheets = data.filter((timesheet) => timesheet.user_id === user.id)
      setTimesheets(filteredTimesheets)
    }
    getTimesheets()
  }, [timesheets])

  useEffect(() => {
    getActivities()
    getClients()
    getProjects()
    getTasks()
    getUsers()
    getProjectDuration()
    getProjectSplit()
  }, [])

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const res = await fetch("/is-authenticated");
      const data = await res.json();
      setUser(data.user);
    };
    if (!user) checkIfLoggedIn();
  }, [])

  return (
    <ThemeProvider>
      <div className="App">
        <NavigationBar user={user} authorised={authorised} />
        <main>
          {/* {user ? <p>Logged in as {user.username}</p> : <p>Anonymous user</p>} */}
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute user={user} >
                  <Dashboard
                    clients={clients}
                    projects={projects}
                    projectDuration={projectDuration}
                    projectSplit={projectSplit}
                    user={user}
                    users={users}
                    tasks={tasks}
                  />
                </ProtectedRoute>
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
                <ProtectedRoute user={user} >
                  <Timesheets
                    timesheets={timesheets}
                    user={user}
                  />
                </ProtectedRoute>
              }
            />

            {/* Users */}
            <Route
              path='/users'
              element={
                <ProtectedRoute user={user} >
                  <Users
                    users={users}
                  />
                </ProtectedRoute>

              }
            />

            {/* Clients */}
            <Route
              path='/clients'
              element={
                <ProtectedRoute user={user} >
                  <Clients
                    clients={clients}
                  />
                </ProtectedRoute>
              }
            />

            {/* Create new client */}
            <Route
              path='/clients/new'
              element={
                <ProtectedRoute user={user} >
                  <CreateClient
                    clients={clients}
                    handleCreateClient={handleCreateClient}
                  />
                </ProtectedRoute>
              }
            />

            {/* Projects */}
            <Route
              path='/projects'
              element={
                <ProtectedRoute user={user} >
                  <Projects
                    projects={projects}
                  />
                </ProtectedRoute>
              }
            />

            {/* Create new project */}
            <Route
              path='/projects/new'
              element={
                <ProtectedRoute user={user} >
                  <CreateProject
                    projects={projects}
                    user={user}
                    clients={clients}
                    handleCreateProject={handleCreateProject}
                  />
                </ProtectedRoute>
              }
            />

            {/* Register */}
            <Route
              path='/register'
              element={
                <Register
                  handleSubmit={handleSubmit("register")}
                  user={user}
                />
              }
            />

            {/* Login */}
            <Route
              path='/login'
              element={
                <Login
                  handleSubmit={handleSubmit("login")}
                  user={user}
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