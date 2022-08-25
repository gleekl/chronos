import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
} from '@mui/material';

const ProfileDetails = ({ user }) => (
    <Card {...user}>
        <CardContent>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                >
                    {`${user.first_name} ${user.last_name}`}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body2"
                >
                    {user.email}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body2"
                >
                    {user.phone}
                </Typography>
            </Box>
        </CardContent>
        <Divider />
        <CardActions>
            <Button
                color="primary"
                fullWidth
                variant="text"
            >
                Upload picture
            </Button>
        </CardActions>
    </Card>
);

export default ProfileDetails