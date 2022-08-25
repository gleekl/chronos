import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";
import { isDisabled } from "@testing-library/user-event/dist/utils";

const initialState = {
  projectName: "",
  client: "",
  user: "",
  startDate: "",
  endDate: "",
  totalDuration: 0
};

const CreateClient = (props) => {
  const [fields, setFields] = useState(initialState);
  const [image, setImage] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedFields = {
      ...fields,
      [name]: value,
    };
    setFields(updatedFields);
    const isDisabled = Object.values(updatedFields).some((v) => !v);
    setButtonDisabled(isDisabled);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleCreate({ ...fields, image: image });
    setFields(initialState);
    setImage(null);
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
                id="outlined-basic projectName"
                label="Project Name"
                variant="outlined"
                name="projectName"
                value={fields.projectName}
                onChange={handleChange}
                placeholder="projectName"
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
                id="outlined-basic client"
                label="Client"
                variant="outlined"
                name="client"
                value={fields.client}
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
                InputLabelProps={{ shrink: true }}
                id="outlined-basic startDate"
                label="Start Date"
                variant="outlined"
                name="startDate"
                value={fields.startDate}
                onChange={handleChange}
                placeholder="startDate"
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
                label="project End Date"
                variant="outlined"
                name="endDate"
                value={fields.endDate}
                onChange={handleChange}
                placeholder="endDate"
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
                name="totalCost"
                value={fields.totalCost}
                onChange={handleChange}
                placeholder="Total duration"
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
                disabled={buttonDisabled}
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
