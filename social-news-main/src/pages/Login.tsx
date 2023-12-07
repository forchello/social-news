import {ChangeEvent, useEffect, useState} from 'react';
import {TextField, Button, Paper, Typography, Box, InputAdornment, IconButton, Alert,  } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch } from "hooks/redux";
import { IUser } from "models/User";
import { userSlice } from "store/reducers/UserSlice";
import LocalStorageService from "../services/LocalStorageService";
import { useTranslation } from "react-i18next";
import Header from "components/header";
import { Visibility, VisibilityOff}  from "@mui/icons-material";

const Login = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        username: false,
        password: false
    });
    const [ showPassword, setShowPassword ] = useState<boolean>(false);
    const [ user, setUser ] = useState<IUser>({
        username: '',
        password: ''
    });

    const { t } = useTranslation();
    const { login } = userSlice.actions;

    const dispatch = useAppDispatch();

    const handleError = () => {
        const isUsernameInvalid = user.username !== process.env.REACT_APP_USERNAME;
        const isPasswordInvalid = user.password !== process.env.REACT_APP_PASSWORD;

        setErrors(prevState => ({ ...prevState, username: isUsernameInvalid }));
        setErrors(prevState => ({ ...prevState, password: isPasswordInvalid }));

        return isUsernameInvalid || isPasswordInvalid;
    }

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUser({ ...user, username: event.target.value});
    }
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUser({ ...user, password: event.target.value})
    }

    const handleSubmit = () => {
        if ( !handleError() ) {
            dispatch(login(user));
            navigate('/profile');
        }
    };

    const handleShowPasswordClick = () => {
        setShowPassword(!showPassword);
    };

    if ( LocalStorageService.get('user') ) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            <Header/>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 8 }}>
                <Paper sx={{ display: 'flex', flexDirection: 'column', py: 8,  px: { xs: 2, sm: 8 }, gap: 1, width: { xs: '80%', sm: '40vh' } }}>
                    <Typography variant="h4" sx={{ pb: 2 }}>
                        {t('login.title')}
                    </Typography>

                    <TextField
                        required
                        label={t('login.username')}
                        value={user.username}
                        onChange={handleUsernameChange}
                        error={errors.username}
                        id="outlined-error-helper-text"
                        helperText={ errors.username ? t('login.invalid_username') : ""}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        required
                        label={t('login.password')}
                        value={user.password}
                        onChange={handlePasswordChange}
                        error={errors.password}
                        id="outlined-error-helper-text"
                        helperText={ errors.password ? t('login.invalid_password') : ""}
                        fullWidth
                        type={showPassword ? "password" : ""}
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
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{mt: 4}}
                        onClick={handleSubmit}
                    >
                        {t('login.title')}
                    </Button>
                </Paper>
            </Box>
        </>
    );
}

export default Login;