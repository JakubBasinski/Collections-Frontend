import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import classes from './CollectionForms.module.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import {
  Box,
  Grid,
  FormControl,
  Button,
  TextField,
  Typography,
  MenuItem,
  Snackbar,
} from '@mui/material';
import useMutation from '../Hooks/useMutation';

const initialFieldValues = {
  name: '',
  topic: '',
  description: '',
  integer1name: '',
  integer2name: '',
  integer3name: '',
  string1name: '',
  string2name: '',
  string3name: '',
  data1name: '',
  data2name: '',
  data3name: '',
  text1name: '',
  text2name: '',
  text3name: '',
  checkbox1name: '',
  checkbox2name: '',
  checkbox3name: '',
};

const showOptionalFields = {
  integer1: false,
  integer2: false,
  integer3: false,
  string1: false,
  string2: false,
  string3: false,
  data1: false,
  data2: false,
  data3: false,
  text1: false,
  text2: false,
  text3: false,
  checkbox1: false,
  checkbox2: false,
  checkbox3: false,
};

const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];
const url = 'http://localhost:3001/collection/create';

const CollectionForm = () => {
  const [values, setValues] = useState(initialFieldValues);
  const [optionalFields, setOptionalCheckboxes] = useState(showOptionalFields);
  const [descriptionPreview, setDescriptionPreview] = useState(false);
  const [customizationPreview, setCustomizationPreview] = useState(false);
  const [uploadFile, setFile] = useState(null);
  const [singInMessage, setSignInMessage] = useState(null);
  const [open, setOpen] = useState(false);

  const signInMessageHandler = (message) => {
    setOpen(true);
    setSignInMessage(message);
  };

  const fileSelectedHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const hadleDescriptionPreview = () => {
    setDescriptionPreview((prevState) => !prevState);
  };

  const handleCustomizationPreview = () => {
    setCustomizationPreview((prevState) => !prevState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleOptional = (e) => {
    let { name } = e.target;
    setOptionalCheckboxes({
      ...optionalFields,
      [name]: !optionalFields[name],
    });
  };

  const {
    mutate: uploadImage,
    isLoading: uploading,
    error: uploadError,
  } = useMutation(url);

  const submitCollectionHandler = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const fd = new FormData();
    if (uploadFile) {
      if (!validFileTypes.find((type) => type === uploadFile.type)) {
        signInMessageHandler('File must be in JPG/PNG format');
        setOpen(true);
      }
      fd.append('image', uploadFile);
    }
    for (const property in values) {
      fd.append(property, values[property]);
    }
    try {
      await uploadImage(fd, token);
      signInMessageHandler('Collection successfully created');
      setOpen(true);
      setValues(initialFieldValues);
      setOptionalCheckboxes(showOptionalFields)

    } catch (error) {
      console.log(error);
    }
  };

  // Snackbar
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

  return (
    <Grid item md={8} sx={{ marginY: '40px' }}>
      <form
        className={classes.form}
        onSubmit={submitCollectionHandler}
        encType="multipart/form"
      >
        <FormControl
          sx={{
            gap: 4,
            paddingY: '50px',
            borderRadius: '10px',
            color: 'grey',
            backdropFilter: 'invert(10%)',
            paddingX: '50px',
            display: 'flex',
            overflow: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '60%',
                justifyContent: 'start',
              }}
            >
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  label="Collection Name"
                  name="name"
                  color="success"
                  variant="filled"
                  sx={{ width: '50%' }}
                  autoComplete="off"
                  value={values.name}
                  onChange={handleInputChange}
                  required
                />

                <TextField
                  name="topic"
                  label="Select topic"
                  color="success"
                  variant="filled"
                  sx={{ width: '50%' }}
                  autoComplete="off"
                  value={values.topic}
                  select
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="alcohols">Alcohols</MenuItem>
                  <MenuItem value="books">Books</MenuItem>
                  <MenuItem value="films">Films</MenuItem>
                  <MenuItem value="cars">Cars</MenuItem>
                  <MenuItem value="boardGames">BoardGames</MenuItem>
                  <MenuItem value="animals">Animals</MenuItem>
                  <MenuItem value="nature">Nature</MenuItem>
                </TextField>
              </Box>
              <Typography
                sx={{
                  widht: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#DCD7C9',
                }}
              ></Typography>

              <TextField
                variant="filled"
                name="description"
                color="success"
                label="Description"
                sx={{ width: '100%' }}
                multiline
                rows="4"
                type="text"
                autoComplete="off"
                value={values.description}
                onChange={handleInputChange}
                required
              ></TextField>

              <Box sx={{ display: 'flex', gap: 1 }}>
                {descriptionPreview ? (
                  <VisibilityOffIcon
                    sx={{
                      background: '#1A373C',
                      borderRadius: '50%',
                      padding: '4px',
                      '&:hover': {
                        cursor: 'pointer',
                        color: '#f8e112',
                        background: '#1A373C',
                      },
                    }}
                    onClick={hadleDescriptionPreview}
                  />
                ) : (
                  <VisibilityIcon
                    sx={{
                      background: '#1A373C',
                      borderRadius: '50%',
                      padding: '4px',
                      '&:hover': {
                        cursor: 'pointer',
                        color: '#f8e112',
                        background: '#1A373C',
                      },
                    }}
                    onClick={hadleDescriptionPreview}
                  />
                )}

                <Typography
                  sx={{
                    fontFamily: 'Quicksand',
                    color: '#DCD7C9',
                    textTransform: 'none',

                    fontSize: '1em',
                    borderColor: '#1A373C',
                  }}
                >
                  Description preview
                </Typography>

                {customizationPreview ? (
                  <VisibilityOffIcon
                    sx={{
                      marginLeft: '1rem',
                      background: '#1A373C',
                      borderRadius: '50%',
                      padding: '4px',
                      '&:hover': {
                        cursor: 'pointer',
                        color: '#f8e112',
                        background: '#1A373C',
                      },
                    }}
                    onClick={handleCustomizationPreview}
                  />
                ) : (
                  <VisibilityIcon
                    sx={{
                      marginLeft: '1rem',
                      background: '#1A373C',
                      borderRadius: '50%',
                      padding: '4px',
                      '&:hover': {
                        cursor: 'pointer',
                        color: '#f8e112',
                        background: '#1A373C',
                      },
                    }}
                    onClick={handleCustomizationPreview}
                  />
                )}

                <Typography
                  sx={{
                    fontFamily: 'Quicksand',
                    color: '#DCD7C9',
                    textTransform: 'none',

                    fontSize: '1em',
                    borderColor: '#1A373C',
                  }}
                >
                  Customize
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'start',
                  gap: 4,
                }}
              >
                <label htmlFor="upload-photo">
                  <input
                    style={{ display: 'none' }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    onChange={fileSelectedHandler}
                  />
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
                    component="span"
                  >
                    Upload image
                  </Button>
                </label>
                {/* {error && <TextField> {error}</TextField>}
                <div> POSTS </div>
                {imagesLoading && <div> LOADING SPINNER </div>}
                {fetchError && <div> Error - failed to load images</div>} */}
                <Button
                  sx={{
                    width: '40%',
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
                  Add Collection
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '50%',
                height: '100',
                gap: 1,
                justifyContent: 'start',
              }}
            >
              {descriptionPreview && (
                <Box
                  sx={{
                    widht: '100%',
                    height: '100%',
                    color: '#DCD7C9',
                    background: '#1A373C',
                    paddingX: '20px',
                    borderRadius: '10px',
                    gap: 2,
                  }}
                >
                  <ReactMarkdown children={values.description} />
                </Box>
              )}
            </Box>
          </Box>

          {customizationPreview && (
            <Grid container spacing={4}>
              <Grid item md={4}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography
                    sx={{
                      display: 'flex',
                      color: '#DCD7C9',
                      letterSpacing: 2,
                      fontSize: '1.2em',
                      fontFamily: 'QuickSand',
                      marginBottom: '10px',
                    }}
                  >
                    Integer fields
                  </Typography>
                  <Box
                    sx={{
                      width: '100%,',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      height: '50%',
                      justifyContent: 'start',
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Button
                        sx={{
                          minWidth: '1.4rem',
                          padding: 0,
                          height: '1.4rem',
                          borderRadius: '50%',
                          color: '#DCD7C9',
                          background: '#1A373C',
                          display: 'flex',
                          fontSize: '1.2rem',
                          justifyContent: 'center',
                          alignItems: 'center',
                          '&:hover': {
                            color: 'gold',

                            background: '#1A373C',
                          },
                        }}
                        name="integer1"
                        onClick={handleOptional}
                      >
                        {optionalFields.integer1 ? '-' : '+'}
                      </Button>

                      {optionalFields.integer1 && (
                        <Box
                          sx={{
                            display: 'flex',
                            gap: 1,
                            alignItems: 'center',
                          }}
                        >
                          <TextField
                            onChange={handleInputChange}
                            name="integer1name"
                            value={values.integer1name}
                            sx={{ width: '40%' }}
                            label="Name"
                            size="small"
                            inputProps={{
                              className: classes.optionalInput,
                            }}
                          />
                        </Box>
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Button
                        sx={{
                          minWidth: '1.4rem',
                          padding: 0,
                          height: '1.4rem',
                          borderRadius: '50%',
                          color: '#DCD7C9',
                          background: '#1A373C',
                          display: 'flex',
                          fontSize: '1.2rem',
                          justifyContent: 'center',
                          alignItems: 'center',
                          '&:hover': {
                            color: 'gold',
                            border: 1,
                            background: '#1A373C',
                          },
                        }}
                        name="integer2"
                        onClick={handleOptional}
                      >
                        {optionalFields.integer2 ? '-' : '+'}
                      </Button>

                      {optionalFields.integer2 && (
                        <Box
                          sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                        >
                          <TextField
                            sx={{ width: '40%' }}
                            value={values.integer2name}
                            size="small"
                            name="integer2name"
                            label="Name"
                            inputProps={{
                              className: classes.optionalInput,
                            }}
                            onChange={handleInputChange}
                          />
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Button
                        sx={{
                          minWidth: '1.4rem',
                          padding: 0,
                          height: '1.4rem',
                          borderRadius: '50%',
                          color: '#DCD7C9',
                          background: '#1A373C',
                          display: 'flex',
                          fontSize: '1.2rem',
                          justifyContent: 'center',
                          alignItems: 'center',
                          '&:hover': {
                            color: 'gold',
                            border: 1,
                            background: '#1A373C',
                          },
                        }}
                        name="integer3"
                        onClick={handleOptional}
                      >
                        {optionalFields.integer3 ? '-' : '+'}
                      </Button>

                      {optionalFields.integer3 && (
                        <Box
                          sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                        >
                          <TextField
                            sx={{ width: '40%' }}
                            value={values.integer3name}
                            size="small"
                            name="integer3name"
                            label="Name"
                            inputProps={{
                              className: classes.optionalInput,
                            }}
                            onChange={handleInputChange}
                          />
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={4}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography
                    sx={{
                      display: 'flex',
                      color: '#DCD7C9',
                      letterSpacing: 2,
                      fontSize: '1.2em',
                      fontFamily: 'QuickSand',
                      marginBottom: '10px',
                    }}
                  >
                    String fields
                  </Typography>
                  <Box
                    sx={{
                      width: '100%,',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      height: '50%',
                      justifyContent: 'start',
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Button
                        sx={{
                          minWidth: '1.4rem',
                          padding: 0,
                          height: '1.4rem',
                          borderRadius: '50%',
                          color: '#DCD7C9',
                          background: '#1A373C',
                          display: 'flex',
                          fontSize: '1.2rem',
                          justifyContent: 'center',
                          alignItems: 'center',
                          '&:hover': {
                            color: 'gold',
                            border: 1,
                            background: '#1A373C',
                          },
                        }}
                        name="string1"
                        onClick={handleOptional}
                      >
                        {optionalFields.string1 ? '-' : '+'}
                      </Button>

                      {optionalFields.string1 && (
                        <Box
                          sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                        >
                          <TextField
                            onChange={handleInputChange}
                            name="string1name"
                            value={values.string1name}
                            sx={{ width: '40%' }}
                            label="Name"
                            size="small"
                            inputProps={{
                              className: classes.optionalInput,
                            }}
                          />
                        </Box>
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Button
                        sx={{
                          minWidth: '1.4rem',
                          padding: 0,
                          height: '1.4rem',
                          borderRadius: '50%',
                          color: '#DCD7C9',
                          background: '#1A373C',
                          display: 'flex',
                          fontSize: '1.2rem',
                          justifyContent: 'center',
                          alignItems: 'center',
                          '&:hover': {
                            color: 'gold',
                            border: 1,
                            background: '#1A373C',
                          },
                        }}
                        name="string2"
                        onClick={handleOptional}
                      >
                        {optionalFields.string2 ? '-' : '+'}
                      </Button>

                      {optionalFields.string2 && (
                        <Box
                          sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                        >
                          <TextField
                            sx={{ width: '40%' }}
                            value={values.string2name}
                            size="small"
                            name="string2name"
                            label="Name"
                            inputProps={{
                              className: classes.optionalInput,
                            }}
                            onChange={handleInputChange}
                          />
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Button
                        sx={{
                          minWidth: '1.4rem',
                          padding: 0,
                          height: '1.4rem',
                          borderRadius: '50%',
                          color: '#DCD7C9',
                          background: '#1A373C',
                          display: 'flex',
                          fontSize: '1.2rem',
                          justifyContent: 'center',
                          alignItems: 'center',
                          '&:hover': {
                            color: 'gold',
                            border: 1,
                            background: '#1A373C',
                          },
                        }}
                        name="string3"
                        onClick={handleOptional}
                      >
                        {optionalFields.string3 ? '-' : '+'}
                      </Button>

                      {optionalFields.string3 && (
                        <Box
                          sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                        >
                          <TextField
                            sx={{ width: '40%' }}
                            value={values.string3name}
                            size="small"
                            name="string3name"
                            label="Name"
                            inputProps={{
                              className: classes.optionalInput,
                            }}
                            onChange={handleInputChange}
                          />
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={4}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography
                    sx={{
                      display: 'flex',
                      color: '#DCD7C9',
                      letterSpacing: 2,
                      fontSize: '1.2em',
                      fontFamily: 'QuickSand',
                      marginBottom: '10px',
                    }}
                  >
                    Data fields
                  </Typography>
                  <Box
                    sx={{
                      width: '100%,',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      height: '50%',
                      justifyContent: 'start',
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Button
                        sx={{
                          minWidth: '1.4rem',
                          padding: 0,
                          height: '1.4rem',
                          borderRadius: '50%',
                          color: '#DCD7C9',
                          background: '#1A373C',
                          display: 'flex',
                          fontSize: '1.2rem',
                          justifyContent: 'center',
                          alignItems: 'center',
                          '&:hover': {
                            color: 'gold',
                            border: 1,
                            background: '#1A373C',
                          },
                        }}
                        name="data1"
                        onClick={handleOptional}
                      >
                        {optionalFields.data1 ? '-' : '+'}
                      </Button>

                      {optionalFields.data1 && (
                        <Box
                          sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                        >
                          <TextField
                            onChange={handleInputChange}
                            name="data1name"
                            value={values.data1name}
                            sx={{ width: '40%' }}
                            label="Name"
                            size="small"
                            inputProps={{
                              className: classes.optionalInput,
                            }}
                          />
                        </Box>
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Button
                        sx={{
                          minWidth: '1.4rem',
                          padding: 0,
                          height: '1.4rem',
                          borderRadius: '50%',
                          color: '#DCD7C9',
                          background: '#1A373C',
                          display: 'flex',
                          fontSize: '1.2rem',
                          justifyContent: 'center',
                          alignItems: 'center',
                          '&:hover': {
                            color: 'gold',
                            border: 1,
                            background: '#1A373C',
                          },
                        }}
                        name="data2"
                        onClick={handleOptional}
                      >
                        {optionalFields.data2 ? '-' : '+'}
                      </Button>

                      {optionalFields.data2 && (
                        <Box
                          sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                        >
                          <TextField
                            sx={{ width: '40%' }}
                            value={values.data2name}
                            size="small"
                            name="data2name"
                            label="Name"
                            inputProps={{
                              className: classes.optionalInput,
                            }}
                            onChange={handleInputChange}
                          />
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Button
                        sx={{
                          minWidth: '1.4rem',
                          padding: 0,
                          height: '1.4rem',
                          borderRadius: '50%',
                          color: '#DCD7C9',
                          background: '#1A373C',
                          display: 'flex',
                          fontSize: '1.2rem',
                          justifyContent: 'center',
                          alignItems: 'center',
                          '&:hover': {
                            color: 'gold',
                            border: 1,
                            background: '#1A373C',
                          },
                        }}
                        name="data3"
                        onClick={handleOptional}
                      >
                        {optionalFields.data3 ? '-' : '+'}
                      </Button>

                      {optionalFields.data3 && (
                        <Box
                          sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                        >
                          <TextField
                            sx={{ width: '40%' }}
                            value={values.data3name}
                            size="small"
                            name="data3name"
                            label="Name"
                            inputProps={{
                              className: classes.optionalInput,
                            }}
                            onChange={handleInputChange}
                          />
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={4}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography
                    sx={{
                      display: 'flex',
                      color: '#DCD7C9',
                      letterSpacing: 2,
                      fontSize: '1.2em',
                      fontFamily: 'QuickSand',
                      marginBottom: '10px',
                    }}
                  >
                    Text fields
                  </Typography>
                  <Box
                    sx={{
                      width: '100%,',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      height: '50%',
                      justifyContent: 'start',
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Button
                        sx={{
                          minWidth: '1.4rem',
                          padding: 0,
                          height: '1.4rem',
                          borderRadius: '50%',
                          color: '#DCD7C9',
                          background: '#1A373C',
                          display: 'flex',
                          fontSize: '1.2rem',
                          justifyContent: 'center',
                          alignItems: 'center',
                          '&:hover': {
                            color: 'gold',
                            border: 1,
                            background: '#1A373C',
                          },
                        }}
                        name="text1"
                        onClick={handleOptional}
                      >
                        {optionalFields.text1 ? '-' : '+'}
                      </Button>

                      {optionalFields.text1 && (
                        <Box
                          sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                        >
                          <TextField
                            onChange={handleInputChange}
                            name="text1name"
                            value={values.text1name}
                            sx={{ width: '40%' }}
                            label="Name"
                            size="small"
                            inputProps={{
                              className: classes.optionalInput,
                            }}
                          />
                        </Box>
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Button
                        sx={{
                          minWidth: '1.4rem',
                          padding: 0,
                          height: '1.4rem',
                          borderRadius: '50%',
                          color: '#DCD7C9',
                          background: '#1A373C',
                          display: 'flex',
                          fontSize: '1.2rem',
                          justifyContent: 'center',
                          alignItems: 'center',
                          '&:hover': {
                            color: 'gold',
                            border: 1,
                            background: '#1A373C',
                          },
                        }}
                        name="text2"
                        onClick={handleOptional}
                      >
                        {optionalFields.text2 ? '-' : '+'}
                      </Button>

                      {optionalFields.text2 && (
                        <Box
                          sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                        >
                          <TextField
                            sx={{ width: '40%' }}
                            value={values.text2name}
                            size="small"
                            name="text2name"
                            label="Name"
                            inputProps={{
                              className: classes.optionalInput,
                            }}
                            onChange={handleInputChange}
                          />
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Button
                        sx={{
                          minWidth: '1.4rem',
                          padding: 0,
                          height: '1.4rem',
                          borderRadius: '50%',
                          color: '#DCD7C9',
                          background: '#1A373C',
                          display: 'flex',
                          fontSize: '1.2rem',
                          justifyContent: 'center',
                          alignItems: 'center',
                          '&:hover': {
                            color: 'gold',
                            border: 1,
                            background: '#1A373C',
                          },
                        }}
                        name="text3"
                        onClick={handleOptional}
                      >
                        {optionalFields.text3 ? '-' : '+'}
                      </Button>

                      {optionalFields.text3 && (
                        <Box
                          sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                        >
                          <TextField
                            sx={{ width: '40%' }}
                            value={values.text3name}
                            size="small"
                            name="text3name"
                            label="Name"
                            inputProps={{
                              className: classes.optionalInput,
                            }}
                            onChange={handleInputChange}
                          />
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid item md={4}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography
                    sx={{
                      display: 'flex',
                      color: '#DCD7C9',
                      letterSpacing: 2,
                      fontSize: '1.2em',
                      fontFamily: 'QuickSand',
                      marginBottom: '10px',
                    }}
                  >
                    Checkboxes
                  </Typography>
                  <Box
                    sx={{
                      width: '100%,',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      height: '50%',
                      justifyContent: 'start',
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Button
                        sx={{
                          minWidth: '1.4rem',
                          padding: 0,
                          height: '1.4rem',
                          borderRadius: '50%',
                          color: '#DCD7C9',
                          background: '#1A373C',
                          display: 'flex',
                          fontSize: '1.2rem',
                          justifyContent: 'center',
                          alignItems: 'center',
                          '&:hover': {
                            color: 'gold',
                            border: 1,
                            background: '#1A373C',
                          },
                        }}
                        name="checkbox1"
                        onClick={handleOptional}
                      >
                        {optionalFields.checkbox1 ? '-' : '+'}
                      </Button>

                      {optionalFields.checkbox1 && (
                        <Box
                          sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                        >
                          <TextField
                            onChange={handleInputChange}
                            name="checkbox1name"
                            value={values.checkbox1name}
                            sx={{ width: '40%' }}
                            label="Name"
                            size="small"
                            inputProps={{
                              className: classes.optionalInput,
                            }}
                          />
                        </Box>
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Button
                        sx={{
                          minWidth: '1.4rem',
                          padding: 0,
                          height: '1.4rem',
                          borderRadius: '50%',
                          color: '#DCD7C9',
                          background: '#1A373C',
                          display: 'flex',
                          fontSize: '1.2rem',
                          justifyContent: 'center',
                          alignItems: 'center',
                          '&:hover': {
                            color: 'gold',
                            border: 1,
                            background: '#1A373C',
                          },
                        }}
                        name="checkbox2"
                        onClick={handleOptional}
                      >
                        {optionalFields.checkbox2 ? '-' : '+'}
                      </Button>

                      {optionalFields.checkbox2 && (
                        <Box
                          sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                        >
                          <TextField
                            sx={{ width: '40%' }}
                            value={values.checkbox2name}
                            size="small"
                            name="checkbox2name"
                            label="Name"
                            inputProps={{
                              className: classes.optionalInput,
                            }}
                            onChange={handleInputChange}
                          />
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Button
                        sx={{
                          minWidth: '1.4rem',
                          padding: 0,
                          height: '1.4rem',
                          borderRadius: '50%',
                          color: '#DCD7C9',
                          background: '#1A373C',
                          display: 'flex',
                          fontSize: '1.2rem',
                          justifyContent: 'center',
                          alignItems: 'center',
                          '&:hover': {
                            color: 'gold',
                            border: 1,
                            background: '#1A373C',
                          },
                        }}
                        name="checkbox3"
                        onClick={handleOptional}
                      >
                        {optionalFields.checkbox3 ? '-' : '+'}
                      </Button>

                      {optionalFields.checkbox3 && (
                        <Box
                          sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                        >
                          <TextField
                            sx={{ width: '40%' }}
                            value={values.checkbox3name}
                            size="small"
                            name="checkbox3name"
                            label="Name"
                            inputProps={{
                              className: classes.optionalInput,
                            }}
                            onChange={handleInputChange}
                          />
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )}
        </FormControl>
      </form>

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

export default CollectionForm;
