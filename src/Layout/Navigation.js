import React, { useContext } from 'react';
import AuthorizationContext from '../store/authorization-context';
import {
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Stack,
  Button,
} from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import * as cls from './NavigationSx';

const Navbar = () => {
  const authCtx = useContext(AuthorizationContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const userId = localStorage.getItem('userId');
  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <React.Fragment>
      <AppBar
        position="static"
        sx={{
          borderBottom: 1,
          borderColor: 'rgba(255, 255, 255, 0.2)',
          backgroundColor: 'transparent',
          fontFamily: 'Quicksand',
        }}
      >
        <Toolbar color="#eeeee">
          <CatchingPokemonIcon sx={cls.navIcon} />

          <Typography variant="h5" component="div" sx={cls.navHeader}>
            Collections
          </Typography>

          <Stack direction="row" spacing={5} alignItems="center">
            {isLoggedIn && (
              <NavLink
                to="/panel"
                style={({ isActive }) => (isActive ? cls.activeLink : cls.link)}
              >
                Admin Panel
              </NavLink>
            )}

            {isLoggedIn && (
              <NavLink
                to={`/profile/${userId}/list`}
                style={({ isActive }) => (isActive ? cls.activeLink : cls.link)}
              >
                Profile
              </NavLink>
            )}

            <NavLink
              to={'/collections'}
              style={({ isActive }) => (isActive ? cls.activeLink : cls.link)}
            >
              Collections
            </NavLink>

            <NavLink
              to={'/items'}
              style={({ isActive }) => (isActive ? cls.activeLink : cls.link)}
            >
              Items
            </NavLink>

            <NavLink
              to={'/'}
              end
              style={({ isActive }) => (isActive ? cls.activeLink : cls.link)}
            >
              Main Page
            </NavLink>

            {isLoggedIn && (
              <NavLink onClick={logoutHandler} style={cls.link}>
                Logout
              </NavLink>
            )}

            {!isLoggedIn && (
              <NavLink
                to={'/Login'}
                style={({ isActive }) => (isActive ? cls.activeLink : cls.link)}
              >
                Login
              </NavLink>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
