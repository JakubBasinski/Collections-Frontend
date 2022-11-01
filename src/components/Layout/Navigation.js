import React, { useContext } from 'react';
import AuthContext from '../../store/aut-context';
import {
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Stack,
  Link,
} from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

const Navbar = () => {
  const authCtx = useContext(AuthContext);
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
          <IconButton
            size="large"
            edge="start"
            aria-label="logo"
            color="inherit"
          >
            <CatchingPokemonIcon />
          </IconButton>

          <Typography
            variant="h5"
            component="div"
            sx={{
              color: '#DCD7C9',
              fontWeight: 600,
              letterSpacing: 2,
              flexGrow: 1,
              fontFamily: 'Quicksand',
            }}
          >
            Collections
          </Typography>

          <Stack direction="row" spacing={5} alignItems="center">
            {isLoggedIn && (
              <Link
                underline="none"
                sx={{
                  '&:hover': {
                    color: '#f8e112',
                    textShadow: '0px 0px 8px rgb(255,255,255)',
                  },
                  fontFamily: 'Quicksand',
                  color: '#DCD7C9',
                }}
                href="/adminPanel"
              >
                Admin Panel
              </Link>
            )}

            {isLoggedIn && (
              <Link
                href={`/profile/${userId}`}
                underline="none"
                sx={{
                  '&:hover': {
                    color: '#f8e112',
                    textShadow: '0px 0px 8px rgb(255,255,255)',
                  },
                  fontFamily: 'Quicksand',
                  color: '#DCD7C9',
                }}
              >
                Profile
              </Link>
            )}
        
            <Link
              href="/collections"
              underline="none"
              sx={{
                '&:hover': {
                  color: '#f8e112',
                  textShadow: '0px 0px 8px rgb(255,255,255)',
                },
                fontFamily: 'Quicksand',
                color: '#DCD7C9',
              }}
            >
              Collections
            </Link>

            <Link
              href="/"
              underline="none"
              sx={{
                '&:hover': {
                  color: '#f8e112',
                  textShadow: '0px 0px 8px rgb(255,255,255)',
                },
                fontFamily: 'Quicksand',
                color: '#DCD7C9',
              }}
            >
              Main Page
            </Link>

            {isLoggedIn && (
              <Link
                onClick={logoutHandler}
                underline="none"
                sx={{
                  '&:hover': {
                    color: '#f8e112',
                    textShadow: '0px 0px 8px rgb(255,255,255)',
                    cursor: 'pointer',
                  },
                  fontFamily: 'Quicksand',
                  color: '#DCD7C9',
                }}
              >
                Logout
              </Link>
            )}

            {!isLoggedIn && (
              <Link
                href="/Login"
                underline="none"
                sx={{
                  '&:hover': {
                    color: '#f8e112',
                    textShadow: '0px 0px 8px rgb(255,255,255)',
                    cursor: 'pointer',
                  },
                  fontFamily: 'Quicksand',
                  color: '#DCD7C9',
                }}
              >
                Login
              </Link>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
