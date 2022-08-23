import { NavLink } from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProfileIcon from '@mui/icons-material/Person';
import ProjectIcon from '@mui/icons-material/HomeRepairService';
import UsersIcon from '@mui/icons-material/PeopleOutline';
import TimeIcon from '@mui/icons-material/AccessTime';
import ChartIcon from '@mui/icons-material/InsertChart';
import ArrowIcon from '@mui/icons-material/ArrowForwardIos';

const drawerWidth = 240;

const navItems = [
    {
        text: "Dashboard",
        component: <DashboardIcon />,
        link: "/"
    },
    {
        text: "Profile",
        component: <ProfileIcon />,
        link: "/profile"
    },
    {
        text: "Projects",
        component: <ProjectIcon />,
        link: "/projects"
    },
    {
        text: "Users",
        component: <UsersIcon />,
        link: "/users"
    },
    {
        text: "Timesheets",
        component: <TimeIcon />,
        link: "/timesheets"
    },
    {
        text: "Reports",
        component: <ChartIcon />,
        link: "/reports"
    }
]

const NavigationBar = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                <List>
                    {navItems.map(({ text, component, link }) => (
                        <NavLink to={link} className="navlink">
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {component}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        </NavLink>
                    ))}
                </List>
                <Divider />
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
            </Box>
        </Box>
    );
}

export default NavigationBar
