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

const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    city: 'Los Angeles',
    country: 'USA',
    jobTitle: 'Senior Developer',
    name: 'Katarina Smith',
    timezone: 'GTM-7'
};

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
                <Avatar
                    src={user.avatar}
                    sx={{
                        height: 64,
                        mb: 2,
                        width: 64
                    }}
                />
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