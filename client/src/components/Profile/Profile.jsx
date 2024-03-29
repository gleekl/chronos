import { useState } from 'react';
import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import DashboardLayout from '../Navigation/DashboardLayout';
import ProfileDetails from './ProfileDetails';
import ProfileForm from './ProfileForm';

const Profile = ({ user, users, handleEditUser }) => {

  return (
    <>
      <Head>
        <title>
          Profile
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg" className='profile'>
          <Typography
            sx={{ mb: 3 }}
            variant="h4"
          >
            User Profile
          </Typography>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <ProfileDetails user={user} />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <ProfileForm
                user={user}
                users={users}
                handleEditUser={handleEditUser}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
};

Profile.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Profile;