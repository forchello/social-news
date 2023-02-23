import { FC, useState, MouseEvent } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Box,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    Avatar,
    Container,
    Button, LinearProgress
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

import { useTranslation } from "react-i18next";
import { userSlice } from "store/reducers/UserSlice";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useTheme } from "@mui/styles";
import { Theme } from "@mui/material";

import SelectLanguage from 'components/selectLanguage';
const Header:FC<{isLoading?: boolean}> = ({isLoading = false}) => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const { t } = useTranslation();

    const { user } = useAppSelector(state => state.userReducer );

    const { logout } = userSlice.actions;
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const location = useLocation();

    const theme: Theme = useTheme();
    const pages = [
        {
            title: t('appbar.home'),
            link: '/'
        },
        {
            title: t('appbar.news'),
            link: '/news'
        }
    ];

    const settings = [
        {
            title: t('appbar.profile'),
            onClick: () => navigate('/profile')
        },
        {
            title: t('appbar.logout'),
            onClick: () => {
                dispatch(logout());
                handleCloseUserMenu();
            }
        }
    ];
    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (link?: string) => {
        if ( link ) {
            navigate(link)
        }
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <HistoryEduIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        onClick={() => handleCloseNavMenu("/")}
                        sx={{
                            mr: 2,
                            cursor: 'pointer',
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        ALEKSEENKO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={() => handleCloseNavMenu()}
                            sx={{
                                display: { xs: 'block', md: 'none' }
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.title}
                                    onClick={() => handleCloseNavMenu(page.link)}
                                    sx={{
                                        m: 1,
                                        background: location.pathname === page.link ? theme.palette.secondary.main : 'inherit',
                                        color: location.pathname === page.link ? 'white' : 'inherit',
                                        borderRadius: 2,
                                        '&:hover': {
                                            background: theme.palette.secondary.main,
                                            color: 'white'
                                        }
                                    }}
                                >
                                    <Typography textAlign="center">
                                        {page.title}
                                    </Typography>
                                </MenuItem>
                            ))}
                            <SelectLanguage sx={{ m: 1, mt: 3, color: theme.palette.secondary.main }} iconColor={theme.palette.secondary.main} />
                        </Menu>
                    </Box>
                    <HistoryEduIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        onClick={() => handleCloseNavMenu("/")}
                        sx={{
                            mr: 2,
                            cursor: 'pointer',
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        ALEKSEENKO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1}}>
                        {pages.map((page) => (
                            <Button
                                key={page.title}
                                onClick={() => handleCloseNavMenu(page.link)}
                                sx={{
                                    color: 'white',
                                    background: location.pathname === page.link ? theme.palette.secondary.main : 'inherit',
                                    '&:hover': {
                                        background: theme.palette.secondary.main
                                    }
                                }}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>

                    <SelectLanguage sx={{display: { xs: 'none', md: 'flex' }}} />

                    {
                        user ? (
                            <Box sx={{ flexGrow: 0 }}>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar variant="circular" sx={{background: theme.palette.secondary.main}}>
                                        <PersonIcon />
                                    </Avatar>
                                </IconButton>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem
                                            key={setting.title}
                                            onClick={setting.onClick}
                                        >
                                            <Typography textAlign="center">{setting.title}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        ) : (
                            <Button
                                onClick={() => navigate('/login')}
                                sx={{
                                    color: 'white',
                                    background: theme.palette.secondary.main,
                                    '&:hover': {
                                        background: theme.palette.secondary.main
                                    }
                                }}
                            >
                                {t('appbar.login')}
                            </Button>
                        )
                    }

                </Toolbar>
            </Container>

            {
                isLoading && (
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                )
            }
        </AppBar>
    );
}
export default Header;


