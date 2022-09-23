import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
    Avatar,
    Box,
    Button,
    Card,
    Checkbox,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import Iconify from '../Iconify';
import { Container } from '@mui/system';

const getInitials = (name = '') => name
    .replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join('');

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
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Projects
                </Typography>
                <Button variant="contained" component={RouterLink} to="/projects/new" startIcon={<Iconify icon="eva:plus-fill" />}>
                    New Project
                </Button>
            </Stack>


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
                                    Client Company
                                </TableCell>
                                <TableCell>
                                    User
                                </TableCell>
                                <TableCell>
                                    Start Date
                                </TableCell>
                                <TableCell>
                                    End Date
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
                                                {project.project_name}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {project.client_company}
                                    </TableCell>
                                    <TableCell>
                                        {project.user}
                                    </TableCell>
                                    <TableCell>
                                        {project.start_date}
                                    </TableCell>
                                    <TableCell>
                                        {project.end_date}
                                    </TableCell>
                                    <TableCell>
                                        {project.total_duration}
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
        </Container>
    );
};

export default Projects

Projects.propTypes = {
    projects: PropTypes.array.isRequired
};