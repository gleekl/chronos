import { useState } from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// Dropdown Selection
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { isDisabled } from "@testing-library/user-event/dist/utils";

const initialState = {
  name: "",
  client_id: "",
  // user_id: "",
  start_date: "",
  end_date: "",
  total_duration: 0
};

const CreateProject = ({ projects, user, clients, handleCreateProject }) => {
  const [fields, setFields] = useState(initialState);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedFields = {
      ...fields,
      [name]: value,
    };
    setFields(updatedFields);

    const isDisabled = Object.values(updatedFields).some((v) => !v);
    setButtonDisabled(isDisabled);
    console.log(user.id);
    console.log(updatedFields);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    handleCreateProject({ ...fields });
    // setFields(initialState);
  };

  return (
    <>
      <div className="project-div">
        <h1 className="project-heading">Create a new project</h1>
        <form onSubmit={handleCreate} className="project-form">
          <div>
            <Box
              // component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic name"
                label="Project Name"
                variant="outlined"
                name="name"
                value={fields.name}
                onChange={handleChange}
                type="text"
              />
            </Box>
          </div>

          {/* <div>
            <Box
              // component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic client"
                label="Client"
                variant="outlined"
                name="client"
                value={fields.client}
                onChange={handleChange}
                type="text"
              />
            </Box>
          </div> */}

          <div>
            <Box
              // component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Client</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  name="client_id"
                  value={fields.client_id}
                  label="Client"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {clients.map((client) => {
                    return (
                      <MenuItem name="client_id" value={client.id}>{`${client.first_name} ${client.last_name}`}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Box>
          </div>

          {/* <div>
            <Box
              // component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-read-only-input"
                label="User"
                name="user_id"
                defaultValue={user}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
          </div> */}

          {/* <div>
            <Box
              // component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">User</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  name="user"
                  value={fields.user}
                  label="User"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {users.map((user) => {
                    return (
                      <MenuItem name="user" value={user.first_name}>{`${user.first_name} ${user.last_name}`}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Box>
          </div> */}

          <div>
            <Box
              // component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                InputLabelProps={{ shrink: true }}
                id="outlined-basic start_date"
                label="Start Date"
                variant="outlined"
                name="start_date"
                value={fields.start_date}
                onChange={handleChange}
                type="date"
              />
            </Box>
          </div>
          <div>
            <Box
              // component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                InputLabelProps={{ shrink: true }}
                id="outlined-basic endDate"
                label="End Date"
                variant="outlined"
                name="end_date"
                value={fields.end_date}
                onChange={handleChange}
                type="date"
              />
            </Box>
          </div>
          <div>
            <Box
              // component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic totalDuration"
                label="Total Duration"
                variant="outlined"
                name="total_duration"
                value={fields.total_duration}
                onChange={handleChange}
                type="number"
              />
            </Box>
          </div>
          <div className="form-padding">
            <br />
            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                type="submit"
              // disabled={buttonDisabled}
              >
                Submit
              </Button>
              <Button variant="contained">
                <Link to={`/projects`}>Cancel</Link>
              </Button>
            </Stack>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProject;
