import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import DashboardLayout from '../components/Navigation/DashboardLayout';
import ProfileDetails from '../components/Profile/ProfileDetails';
import ProfileForm from '../components/Profile/ProfileForm';

const Profile = () => (
  <>
    <Head>
      <title>
        Account | Material Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Account
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
            <ProfileDetails />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileForm />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Profile.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Profile;