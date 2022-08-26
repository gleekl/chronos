
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

const Users = ({ users, ...rest }) => {
    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const handleSelectAll = (event) => {
        let newSelectedCustomerIds;

        if (event.target.checked) {
            newSelectedCustomerIds = users.map((customer) => customer.id);
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
                    Users
                </Typography>
                <Button variant="contained" component={RouterLink} to="/users/new" startIcon={<Iconify icon="eva:plus-fill" />}>
                    New User
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
                                        checked={selectedCustomerIds.length === users.length}
                                        color="primary"
                                        indeterminate={
                                            selectedCustomerIds.length > 0
                                            && selectedCustomerIds.length < users.length
                                        }
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                                <TableCell>
                                    First Name
                                </TableCell>
                                <TableCell>
                                    Last Name
                                </TableCell>
                                <TableCell>
                                    Email
                                </TableCell>
                                <TableCell>
                                    Phone
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.slice(0, limit).map((user) => (
                                <TableRow
                                    hover
                                    key={user.id}
                                    selected={selectedCustomerIds.indexOf(user.id) !== -1}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedCustomerIds.indexOf(user.id) !== -1}
                                            onChange={(event) => handleSelectOne(event, user.id)}
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
                                                src={user.avatarUrl}
                                                sx={{ mr: 2 }}
                                            >
                                                {user.name}
                                            </Avatar>
                                            <Typography
                                                color="textPrimary"
                                                variant="body1"
                                            >
                                                {user.first_name}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {user.last_name}
                                    </TableCell>
                                    <TableCell>
                                        {user.email}
                                    </TableCell>
                                    <TableCell>
                                        {user.phone}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={users.length}
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

export default Users

Users.propTypes = {
    users: PropTypes.array.isRequired
};