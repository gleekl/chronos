import { useState, useEffect } from 'react'

// const Register = (props) => {
//     const initialState = {
//         first_name: '',
//         last_name: '',
//         email: '',
//         phone: '',
//         username: '',
//         password: '',
//     }

//     const [fields, setFields] = useState(initialState)

//     const handleChange = (e) => {
//         setFields({
//             ...fields,
//             [e.target.name]: e.target.value
//         })
//         console.log(fields);
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         props.handleSubmit(fields)
//         // setFields(initialState)
//     }

//     return (
//         <form onSubmit={handleSubmit}>

//             <label htmlFor="register-first_name">First Name</label>
//             <input
//                 onChange={handleChange}
//                 value={fields.first_name}
//                 name="first_name"
//                 id="register-first_name"
//                 type="text" />

//             <label htmlFor="register-last_name">Last Name</label>
//             <input
//                 onChange={handleChange}
//                 value={fields.last_name}
//                 name="last_name"
//                 id="register-last_name"
//                 type="text" />

//             <label htmlFor="register-email">Email</label>
//             <input
//                 onChange={handleChange}
//                 value={fields.email}
//                 name="email"
//                 id="register-email"
//                 type="email" />

//             <label htmlFor="register-phone">Phone</label>
//             <input
//                 onChange={handleChange}
//                 value={fields.phone}
//                 name="phone"
//                 id="register-phone"
//                 type="tel" />

//             <label htmlFor="register-username">Username</label>
//             <input
//                 onChange={handleChange}
//                 value={fields.username}
//                 name="username"
//                 id="register-username"
//                 type="text" />

//             <label htmlFor="register-password">Password</label>
//             <input
//                 onChange={handleChange}
//                 value={fields.password}
//                 name="password"
//                 id="register-password"
//                 type="Password" />

//             <input type="submit" value="Register" />

//         </form>
//     )
// }

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const theme = createTheme();

const Register = (props) => {
    const initialState = {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        username: '',
        password: '',
    }

    const [fields, setFields] = useState(initialState)

    const handleChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
        console.log(fields);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.handleSubmit(fields)
        // setFields(initialState)
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={fields.first_name}
                                    onChange={handleChange}
                                    autoComplete="given-name"
                                    name="first_name"
                                    required
                                    fullWidth
                                    id="first_name"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={fields.last_name}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                    id="last_name"
                                    label="Last Name"
                                    name="last_name"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={fields.email}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={fields.phone}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone"
                                    name="phone"
                                    autoComplete="phone"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={fields.username}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                    name="username"
                                    label="Username"
                                    type="username"
                                    id="username"
                                    autoComplete="new-username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={fields.password}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 5 }} /> */}
            </Container>
        </ThemeProvider>
    );
}

export default Register