// import { filter } from 'lodash';
// import { sentenceCase } from 'change-case';
// import { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// // material
// import {
//     Card,
//     Table,
//     Stack,
//     Avatar,
//     Button,
//     Checkbox,
//     TableRow,
//     TableBody,
//     TableCell,
//     Container,
//     Typography,
//     TableContainer,
//     TablePagination,
// } from '@mui/material';

// // Misc components
// import Page from '../Page';
// import Label from '../Label';
// import Scrollbar from '../Scrollbar';
// import Iconify from '../Iconify';
// import SearchNotFound from '..//SearchNotFound';

// // Table components
// import TableListHead from '../Table/TableListHead';
// import TableListToolbar from '../Table/TableListToolbar';
// import TableMoreMenu from '../Table/TableMoreMenu';

// // ----------------------------------------------------------------------

// const TABLE_HEAD = [
//     { id: 'name', label: 'Name', alignRight: false },
//     { id: 'company', label: 'Company', alignRight: false },
//     { id: 'role', label: 'Role', alignRight: false },
//     { id: 'isVerified', label: 'Verified', alignRight: false },
//     { id: 'status', label: 'Status', alignRight: false },
//     { id: '' },
// ];

// // ----------------------------------------------------------------------

// function descendingComparator(a, b, orderBy) {
//     if (b[orderBy] < a[orderBy]) {
//         return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//         return 1;
//     }
//     return 0;
// }

// function getComparator(order, orderBy) {
//     return order === 'desc'
//         ? (a, b) => descendingComparator(a, b, orderBy)
//         : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function applySortFilter(array, comparator, query) {
//     const stabilizedThis = array.map((el, index) => [el, index]);
//     stabilizedThis.sort((a, b) => {
//         const order = comparator(a[0], b[0]);
//         if (order !== 0) return order;
//         return a[1] - b[1];
//     });
//     if (query) {
//         return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
//     }
//     return stabilizedThis.map((el) => el[0]);
// }

// const Projects = ({ projects }) => {
//     const [page, setPage] = useState(0);
//     const [order, setOrder] = useState('asc');
//     const [selected, setSelected] = useState([]);
//     const [orderBy, setOrderBy] = useState('name');
//     const [filterName, setFilterName] = useState('');
//     const [rowsPerPage, setRowsPerPage] = useState(5);

//     const handleRequestSort = (event, property) => {
//         const isAsc = orderBy === property && order === 'asc';
//         setOrder(isAsc ? 'desc' : 'asc');
//         setOrderBy(property);
//     };

//     const handleSelectAllClick = (event) => {
//         if (event.target.checked) {
//             const newSelecteds = projects.map((n) => n.name);
//             setSelected(newSelecteds);
//             return;
//         }
//         setSelected([]);
//     };

//     const handleClick = (event, name) => {
//         const selectedIndex = selected.indexOf(name);
//         let newSelected = [];
//         if (selectedIndex === -1) {
//             newSelected = newSelected.concat(selected, name);
//         } else if (selectedIndex === 0) {
//             newSelected = newSelected.concat(selected.slice(1));
//         } else if (selectedIndex === selected.length - 1) {
//             newSelected = newSelected.concat(selected.slice(0, -1));
//         } else if (selectedIndex > 0) {
//             newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
//         }
//         setSelected(newSelected);
//     };

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const handleFilterByName = (event) => {
//         setFilterName(event.target.value);
//     };

//     const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - projects.length) : 0;

//     const filteredUsers = applySortFilter(projects, getComparator(order, orderBy), filterName);

//     const isUserNotFound = filteredUsers.length === 0;

//     return (
//         <Page title="User">
//             <Container>
//                 <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
//                     <Typography variant="h4" gutterBottom>
//                         Projects
//                     </Typography>
//                     <Button variant="contained" component={RouterLink} to="/projects/new" startIcon={<Iconify icon="eva:plus-fill" />}>
//                         New Project
//                     </Button>
//                 </Stack>

//                 <Card>
//                     <TableListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

//                     <Scrollbar>
//                         <TableContainer sx={{ minWidth: 800 }}>
//                             <Table>
//                                 <TableListHead
//                                     order={order}
//                                     orderBy={orderBy}
//                                     headLabel={TABLE_HEAD}
//                                     rowCount={projects.length}
//                                     numSelected={selected.length}
//                                     onRequestSort={handleRequestSort}
//                                     onSelectAllClick={handleSelectAllClick}
//                                 />
//                                 <TableBody>
//                                     {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
//                                         const { id, name, role, status, company, avatarUrl, isVerified } = row;
//                                         const isItemSelected = selected.indexOf(name) !== -1;

//                                         return (
//                                             <TableRow
//                                                 hover
//                                                 key={id}
//                                                 tabIndex={-1}
//                                                 role="checkbox"
//                                                 selected={isItemSelected}
//                                                 aria-checked={isItemSelected}
//                                             >
//                                                 <TableCell padding="checkbox">
//                                                     <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
//                                                 </TableCell>
//                                                 <TableCell component="th" scope="row" padding="none">
//                                                     <Stack direction="row" alignItems="center" spacing={2}>
//                                                         <Avatar alt={name} src={avatarUrl} />
//                                                         <Typography variant="subtitle2" noWrap>
//                                                             {name}
//                                                         </Typography>
//                                                     </Stack>
//                                                 </TableCell>
//                                                 <TableCell align="left">{company}</TableCell>
//                                                 <TableCell align="left">{role}</TableCell>
//                                                 <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
//                                                 <TableCell align="left">
//                                                     {/* <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
//                                                         {sentenceCase(status)}
//                                                     </Label> */}
//                                                 </TableCell>

//                                                 <TableCell align="right">
//                                                     <TableMoreMenu />
//                                                 </TableCell>
//                                             </TableRow>
//                                         );
//                                     })}
//                                     {emptyRows > 0 && (
//                                         <TableRow style={{ height: 53 * emptyRows }}>
//                                             <TableCell colSpan={6} />
//                                         </TableRow>
//                                     )}
//                                 </TableBody>

//                                 {isUserNotFound && (
//                                     <TableBody>
//                                         <TableRow>
//                                             <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
//                                                 <SearchNotFound searchQuery={filterName} />
//                                             </TableCell>
//                                         </TableRow>
//                                     </TableBody>
//                                 )}
//                             </Table>
//                         </TableContainer>
//                     </Scrollbar>

//                     <TablePagination
//                         rowsPerPageOptions={[5, 10, 25]}
//                         component="div"
//                         count={projects.length}
//                         rowsPerPage={rowsPerPage}
//                         page={page}
//                         onPageChange={handleChangePage}
//                         onRowsPerPageChange={handleChangeRowsPerPage}
//                     />
//                 </Card>
//             </Container>
//         </Page>
//     );
// }

// export default Projects

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
    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const handleSelectAll = (event) => {
        let newSelectedCustomerIds;

        if (event.target.checked) {
            newSelectedCustomerIds = projects.map((customer) => customer.id);
        } else {
            newSelectedCustomerIds = [];
        }

        setSelectedCustomerIds(newSelectedCustomerIds);
    };

    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedCustomerIds.indexOf(id);
        let newSelectedCustomerIds = [];

        if (selectedIndex === -1) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
        } else if (selectedIndex === 0) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
        } else if (selectedIndex === selectedCustomerIds.length - 1) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat(
                selectedCustomerIds.slice(0, selectedIndex),
                selectedCustomerIds.slice(selectedIndex + 1)
            );
        }

        setSelectedCustomerIds(newSelectedCustomerIds);
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
                                        checked={selectedCustomerIds.length === projects.length}
                                        color="primary"
                                        indeterminate={
                                            selectedCustomerIds.length > 0
                                            && selectedCustomerIds.length < projects.length
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
                                    selected={selectedCustomerIds.indexOf(project.id) !== -1}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedCustomerIds.indexOf(project.id) !== -1}
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
                                        {project.date_start}
                                    </TableCell>
                                    <TableCell>
                                        {project.date_end}
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