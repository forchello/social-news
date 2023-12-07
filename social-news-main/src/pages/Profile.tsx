import { useState } from 'react';
import {Box, TextField, Typography, InputAdornment, IconButton, Button, Paper} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Header from "components/header";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {useTranslation} from "react-i18next";
import {userSlice} from "store/reducers/UserSlice";
import {useNavigate} from "react-router-dom";
const Profile = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const { user } = useAppSelector(state => state.userReducer );
    const { t } = useTranslation();
    const { logout } = userSlice.actions;

    const dispatch = useAppDispatch();

    const handleShowPasswordClick = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = () => {
        dispatch(logout());
        navigate('/login');
    }

    return (
        <>
            <Header/>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 8 }}>
                <Paper sx={{ display: 'flex', flexDirection: 'column', py: 8,  px: { xs: 2, sm: 8 }, gap: 1, width: { xs: '80%', sm: '40vh' } }}>
                    <Typography variant="h4" sx={{ pb: 2 }}>
                        {t('profile.title')}
                    </Typography>

                    <TextField
                        disabled
                        label={t('login.username')}
                        variant="filled"
                        value={user?.username}
                        sx={{ mb: 2, width: '100%' }}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        disabled
                        label={t('login.password')}
                        variant="filled"
                        type={showPassword ? 'text' : 'password'}
                        value={user?.password}
                        fullWidth
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleShowPasswordClick}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button variant="contained" color="primary" sx={{mt: 4}} onClick={handleSubmit}>
                        {t('login.logout')}
                    </Button>
                </Paper>
            </Box>
        </>
    );
};

export default Profile;