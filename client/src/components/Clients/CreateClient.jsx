import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";
import { isDisabled } from "@testing-library/user-event/dist/utils";

const initialState = {
  first_name: "",
  last_name: "",
  company: "",
  email: "",
  phone: ""
};

const CreateClient = ({ handleCreateClient }) => {
  const [fields, setFields] = useState(initialState);
  const [image, setImage] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedFields = {
      ...fields,
      [name]: value,
    };
    setFields(updatedFields);
    console.log(updatedFields);
    // const isDisabled = Object.values(updatedFields).some((v) => !v);
    // setButtonDisabled(isDisabled);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateClient({ ...fields });
    // setFields(initialState);
  };

  return (
    <>
      <div className="project-div">
        <h1 className="project-heading">Create new project</h1>
        <form onSubmit={handleSubmit} className="project-form">
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
                id="outlined-basic firstName"
                label="First Name"
                variant="outlined"
                name="first_name"
                value={fields.first_name}
                onChange={handleChange}
                type="text"
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
                id="outlined-basic lastName"
                label="Last Name"
                variant="outlined"
                name="last_name"
                value={fields.last_name}
                onChange={handleChange}
                placeholder="client"
                type="text"
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
                id="outlined-basic company"
                label="Company"
                variant="outlined"
                name="company"
                value={fields.company}
                onChange={handleChange}
                placeholder="company"
                type="text"
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
                id="outlined-basic email"
                label="Email"
                variant="outlined"
                name="email"
                value={fields.email}
                onChange={handleChange}
                placeholder="Email"
                type="text"
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
                id="outlined-basic phone"
                label="Phone"
                variant="outlined"
                name="phone"
                value={fields.phone}
                onChange={handleChange}
                placeholder="Phone"
                type="text"
              />
            </Box>
          </div>
          <div className="form-padding">
            <br />
            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                type="submit"
              >
                Submit
              </Button>
              <Button variant="contained">
                <Link to={`/clients`}>Cancel</Link>
              </Button>
            </Stack>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateClient;
