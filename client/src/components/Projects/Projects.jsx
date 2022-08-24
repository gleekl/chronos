import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';

const Projects = ({ projects, ...rest }) => {
  const [selectedProjectIds, setSelectedProjectIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedProjectIds;

    if (event.target.checked) {
      newSelectedProjectIds = projects.map((project) => project.id);
    } else {
      newSelectedProjectIds = [];
    }

    setSelectedProjectIds(newSelectedProjectIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedProjectIds.indexOf(id);
    let newSelectedProjectIds = [];

    if (selectedIndex === -1) {
      newSelectedProjectIds = newSelectedProjectIds.concat(selectedProjectIds, id);
    } else if (selectedIndex === 0) {
      newSelectedProjectIds = newSelectedProjectIds.concat(selectedProjectIds.slice(1));
    } else if (selectedIndex === selectedProjectIds.length - 1) {
      newSelectedProjectIds = newSelectedProjectIds.concat(selectedProjectIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedProjectIds = newSelectedProjectIds.concat(
        selectedProjectIds.slice(0, selectedIndex),
        selectedProjectIds.slice(selectedIndex + 1)
      );
    }

    setSelectedProjectIds(newSelectedProjectIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedProjectIds.length === projects.length}
                    color="primary"
                    indeterminate={
                      selectedProjectIds.length > 0
                      && selectedProjectIds.length < projects.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Project Name
                </TableCell>
                <TableCell>
                  User
                </TableCell>
                <TableCell>
                  Client
                </TableCell>
                <TableCell>
                  Date Start
                </TableCell>
                <TableCell>
                  Date End
                </TableCell>
                <TableCell>
                  Total Duration
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.slice(0, limit).map((project) => (
                <TableRow
                  hover
                  key={project.id}
                  selected={selectedProjectIds.indexOf(project.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedProjectIds.indexOf(project.id) !== -1}
                      onChange={(event) => handleSelectOne(event, project.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={project.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {project.name}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {project.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {project.email}
                  </TableCell>
                  <TableCell>
                    {project.phone}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={projects.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

// projectListResults.propTypes = {
//   projects: PropTypes.array.isRequired
// };

export default Projects