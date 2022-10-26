import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, TextField, Typography } from '@mui/material';
import { FormControl } from '@mui/material';
import AuthContext from '../../store/aut-context';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const initialFieldValues = {
  name: '',
  email: '',
  password: '',
  confirmation: '',
};

const errorsFieldValues = {
  nameError: false,
  emailError: false,
  passwordError: false,
  confirmationError: false,
};

const AuthForm = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState(errorsFieldValues);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };


  const [singInMessage, setSignInMessage] = useState(null);

  const signInMessageHandler = (message) => {
    setSignInMessage(message);
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setErrors({
      nameError: false,
      emailError: false,
      passwordError: false,
      confirmationError: false,
    });
    setValues({
      name: '',
      email: '',
      password: '',
    });
  };



  // Snackbar
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
        type="button"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  ///

  const submitHandler = (event) => {
    let url;
    let isSignInSuccessfull;
    event.preventDefault();
    console.log(isLogin);
    console.log(values.email.trim());

    if (values.email.trim() === '') {
      setErrors({
        ...errors,
        emailError: true,
      });
      return;
    }
    if (values.password.trim() === '') {
      setErrors({
        ...errors,
        passwordError: true,
      });
      return;
    }

    if (!isLogin) {
      if (values.name.trim() === '') {
        setErrors({
          ...errors,
          nameError: true,
        });
        return;
      }

      if (values.password !== values.confirmation) {
        setErrors({
          ...errors,
          confirmationError: true,
        });
        return;
      }
    }

    setErrors({
      nameError: false,
      emailError: false,
      passwordError: false,
      confirmationError: false,
    });

    if (isLogin) {
      url = 'http://localhost:3001/login';
    } else {
      url = 'http://localhost:3001/signup';
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        console.log(res.status);
        if (res.status === 409) {
          isSignInSuccessfull = false;
          return res.json();
        } else {
          isSignInSuccessfull = true;
          return res.json();
        }
      })
      .then((data) => {
        const userId = data.userId
        signInMessageHandler(data.message);
        setOpen(true);
        if (isSignInSuccessfull && !isLogin) {
          switchAuthModeHandler();
        }

        if (data.token) {
          authCtx.login(data.token);
          navigate(`/profile/${userId}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid container justifyContent="center" marginTop="100px">
      <Grid item md={3} justifyContent="center">
        <form onSubmit={submitHandler}>
          <FormControl
            sx={{
              width: '100%',
              gap: 3,
              justifyContent: 'center',
              alignItems: 'center',
              paddingY: '50px',
              borderRadius: '10px',
              color: 'grey',
              border: 1,
              backdropFilter: 'invert(10%)',
            }}
          >
            <Typography
              variant="h5"
              fontWeight={600}
              fontFamily={'Quicksand'}
              sx={{
                paddingBottom: 1,
                paddingLeft: 1.1,
                color: '#DCD7C9',
                letterSpacing: 2,
                fontSize: '1.6em',
              }}
            >
              {isLogin ? 'Login' : 'Sign up'}
            </Typography>
            {!isLogin && (
              <TextField
                label="Name"
                name="name"
                color="success"
                variant="filled"
                value={values.name}
                onChange={handleInputChange}
                sx={{ width: '60%' }}
                error={errors.nameError}
                helperText={errors.nameError && 'Required'}
                autoComplete="off"
              />
            )}

            <TextField
              variant="filled"
              name="email"
              onChange={handleInputChange}
              color="success"
              label="Email"
              value={values.email}
              sx={{ width: '60% ' }}
              type="email"
              error={errors.emailError}
              helperText={errors.emailError && 'Required'}
              autoComplete="off"
            />
            <TextField
              variant="filled"
              onChange={handleInputChange}
              name="password"
              color="success"
              label="Password"
              value={values.password}
              sx={{ width: '60%' }}
              error={errors.passwordError}
              helperText={errors.passwordError && 'Required'}
              autoComplete="off"
            />

            {!isLogin && (
              <TextField
                variant="filled"
                color="success"
                name="confirmation"
                label="Confirm Password"
                value={values.confirmation}
                onChange={handleInputChange}
                sx={{ width: '60%' }}
                autoComplete="off"
                required
                error={errors.confirmationError}
                helperText={
                  errors.confirmationError && 'Passwrods does not match'
                }
              />
            )}

            <Button
              sx={{
                fontFamily: 'Quicksand',
                paddingX: '20px',
                paddingY: '5px',
                color: '#DCD7C9',
                textTransform: 'none',
                fontSize: '1em',
                background: '#1A373C',
                '&:hover': {
                  color: '#f8e112',
                  background: '#1A373C',
                },
              }}
              type="submit"
            >
              {isLogin ? 'Login' : 'Sign up'}
            </Button>
            <Button
              sx={{
                fontFamily: 'Quicksand',
                paddingX: '20px',
                paddingY: '5px',
                color: '#DCD7C9',
                borderColor: 'black',
                textTransform: 'none',
                fontSize: '1em',
                background: '#1A373C',

                '&:hover': {
                  color: '#f8e112',
                  background: '#1A373C',
                },
              }}
              type="button"
              onClick={switchAuthModeHandler}
            >
              {isLogin ? ' Create new account' : 'Login with existing account'}
            </Button>
          </FormControl>
        </form>
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={singInMessage}
        action={action}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
      />
    </Grid>
  );
};

export default AuthForm;
