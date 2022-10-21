import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import classes from './CollectionForms.module.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import {
  Box,
  Grid,
  FormControl,
  Button,
  TextField,
  Typography,
  MenuItem,
} from '@mui/material';

const initialFieldValues = {
  name: '',
  topic: '',
};

const showOptionalFields = {
  integer1: false,
  integer2: false,
  integer3: false,
  string1: false,
  string2: false,
  string3: false,
};

const initialOptionalValuesFields = {
  integer1name: null,
  integer1value: null,
  integer2name: null,
  integer2value: null,
  integer3name: null,
  integer3value: null,
  string1name: null,
  string1value: null,
  string2name: null,
  string2value: null,
  string3name: null,
  string3value: null
};

const CollectionForm = () => {
  const [input, setInput] = useState('');
  const [values, setValues] = useState(initialFieldValues);
  const [optinalValues, setOptionalValues] = useState(
    initialOptionalValuesFields
  );
  const [optionalFields, setOptionalCheckboxes] = useState(showOptionalFields);

  const [descriptionPreview, setDescriptionPreview] = useState(false);
  const [customizationPreview, setCustomizationPreview] = useState(false);
  const [uploadFile, setFile] = useState(null);

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

  const handleOptionalInputChange = (e) => {
    const { name, value } = e.target;
    setOptionalValues({
      ...optinalValues,
      [name]: value,
    });
  };

  const handleOptional = (e) => {
    let { name } = e.target;
    console.log(optionalFields.integer1);
    setOptionalCheckboxes({
      ...optionalFields,
      [name]: !optionalFields[name],
    });
  };

  const submitCollectionHandler = (event) => {
    event.preventDefault()
    const tokenUser = localStorage.getItem('token');
    console.log(tokenUser);

    const url = 'http://localhost:3001/collection/create';
    console.log(
      optinalValues.integer2name,
      optinalValues.integer3name,
      optinalValues.integer1name
    );
    fetch(url, {
      method: 'POST',

      body: JSON.stringify({
        name: values.name,
        topic: values.topic,
        what: '???',
        optionalInt1name: optinalValues.integer1name,
        optionalInt1value: optinalValues.integer1value,
        optionalInt2name: optinalValues.integer2name,
        optionalInt2value: optinalValues.integer2value,
        optionalInt3name: optinalValues.integer3name,
        optionalInt3value: optinalValues.integer3value,
        optionalString1name: optinalValues.string1name,
        optionalString1value: optinalValues.string1value,
        optionalString2name: optinalValues.string2name,
        optionalString2value: optinalValues.string2value,
        optionalString3name: optinalValues.string3name,
        optionalString3value: optinalValues.string3value,
        image: uploadFile
      }),
      headers: { 'Content-Type': 'multipart/form-data', Authorization: tokenUser },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err);
      });
  };

  const setInputHandler = (text) => {
    setInput(<ReactMarkdown children={text} />);
  };

  return (
    <Grid item md={7} sx={{ maxHeight: '90%', marginY: '50px' }}>
      <form className={classes.form} onSubmit={submitCollectionHandler}>
        <FormControl
          sx={{
            width: '90%',
            gap: 1,
            paddingY: '50px',
            borderRadius: '10px',
            color: 'grey',
            backdropFilter: 'invert(10%)',
            paddingX: '50px',
            display: 'flex',
            minHeight: '50%',
            maxHeight: '80%',
            margin: 'auto',
            overflow: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, height: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                width: '50%',
              }}
            >
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  name="name"
                  label="Collection Name"
                  color="success"
                  variant="filled"
                  sx={{ width: '50%' }}
                  autoComplete="off"
                  onChange={handleInputChange}
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TextField type="file" onChange={fileSelectedHandler} />
              </Box>
              <TextField
                variant="filled"
                name="Description"
                color="success"
                label="Description"
                sx={{ width: '100%' }}
                multiline
                rows="4"
                type="text"
                autoComplete="off"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></TextField>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {descriptionPreview ? (
                  <VisibilityOffIcon
                    sx={{
                      background: '#1A373C',

                      borderRadius: ' 50%',
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

                      borderRadius: ' 50%',
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
                    width: '50%',
                    fontSize: '1em',
                    borderColor: '#1A373C',
                  }}
                >
                  Description preview
                </Typography>

                {customizationPreview ? (
                  <VisibilityOffIcon
                    sx={{
                      background: '#1A373C',

                      borderRadius: ' 50%',
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
                      background: '#1A373C',

                      borderRadius: ' 50%',
                      padding: '6px',
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
                    width: '50%',
                    fontSize: '1em',
                    borderColor: '#1A373C',
                  }}
                >
                  Customize items
                </Typography>
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
                  <ReactMarkdown children={input} />
                </Box>
              )}
            </Box>
          </Box>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              marginTop: '10px',
            }}
          ></Box>

          {customizationPreview && (
            <Box
              sx={{
                width: '100%,',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{ width: '30%', display: 'flex', flexDirection: 'column' }}
              >
                <Typography
                  sx={{
                    display: 'flex',
                    color: '#DCD7C9',
                    letterSpacing: 2,
                    fontSize: '1.3em',
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
                      name="integer1"
                      onClick={handleOptional}
                    >
                      {optionalFields.integer1 ? '-' : '+'}
                    </Button>

                    {optionalFields.integer1 && (
                      <Box
                        sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                      >
                        <TextField
                          onChange={handleOptionalInputChange}
                          name="integer1name"
                          value={optinalValues.integer1name}
                          sx={{ width: '40%' }}
                          label="Name"
                          size="small"
                          inputProps={{
                            className: classes.optionalInput,
                          }}
                        />
                        <TextField
                          name="integer1value"
                          value={optinalValues.integer1value}
                          onChange={handleOptionalInputChange}
                          size="small"
                          label="Value"
                          type="number"
                          inputProps={{
                            className: classes.optionalInput,
                          }}
                          sx={{ width: '40%' }}
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
                          value={optinalValues.integer2name}
                          size="small"
                          name="integer2name"
                          label="Name"
                          inputProps={{
                            className: classes.optionalInput,
                          }}
                          onChange={handleOptionalInputChange}
                        />
                        <TextField
                          value={optinalValues.integer2value}
                          size="small"
                          label="Value"
                          type="number"
                          name="integer2value"
                          inputProps={{
                            className: classes.optionalInput,
                          }}
                          sx={{ width: '40%' }}
                          onChange={handleOptionalInputChange}
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
                          value={optinalValues.integer3name}
                          size="small"
                          name="integer3name"
                          label="Name"
                          inputProps={{
                            className: classes.optionalInput,
                          }}
                          onChange={handleOptionalInputChange}
                        />
                        <TextField
                          sx={{ width: '40%' }}
                          value={optinalValues.integer3value}
                          size="small"
                          name="integer3value"
                          type="number"
                          label="Name"
                          inputProps={{
                            className: classes.optionalInput,
                          }}
                          onChange={handleOptionalInputChange}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{ width: '30%', display: 'flex', flexDirection: 'column' }}
              >
                <Typography
                  sx={{
                    display: 'flex',
                    color: '#DCD7C9',
                    letterSpacing: 2,
                    fontSize: '1.3em',
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
                          onChange={handleOptionalInputChange}
                          name="string1name"
                          value={optinalValues.string1name}
                          sx={{ width: '40%' }}
                          label="Name"
                          size="small"
                          inputProps={{
                            className: classes.optionalInput,
                          }}
                        />
                        <TextField
                          name="string1value"
                          value={optinalValues.string1value}
                          onChange={handleOptionalInputChange}
                          size="small"
                          label="Value"
                          inputProps={{
                            className: classes.optionalInput,
                          }}
                          sx={{ width: '40%' }}
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
                          value={optinalValues.string2name}
                          size="small"
                          name="string2name"
                          label="Name"
                          inputProps={{
                            className: classes.optionalInput,
                          }}
                          onChange={handleOptionalInputChange}
                        />
                        <TextField
                          value={optinalValues.string2value}
                          size="small"
                          label="Value"
                          name="string2value"
                          inputProps={{
                            className: classes.optionalInput,
                          }}
                          sx={{ width: '40%' }}
                          onChange={handleOptionalInputChange}
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
                          value={optinalValues.string3name}
                          size="small"
                          name="string3name"
                          label="Name"
                          inputProps={{
                            className: classes.optionalInput,
                          }}
                          onChange={handleOptionalInputChange}
                        />
                        <TextField
                          sx={{ width: '40%' }}
                          value={optinalValues.string3value}
                          size="small"
                          name="string3value"
                          label="Name"
                          inputProps={{
                            className: classes.optionalInput,
                          }}
                          onChange={handleOptionalInputChange}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{ width: '30%', display: 'flex', flexDirection: 'column' }}
              >
                <Typography
                  sx={{
                    display: 'flex',
                    color: '#DCD7C9',
                    letterSpacing: 2,
                    fontSize: '1.3em',
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
                      name="integer1"
                      onClick={handleOptional}
                    >
                      {optionalFields.integer1 ? '-' : '+'}
                    </Button>

                    {optionalFields.integer1 && (
                      <Box
                        sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                      >
                        <TextField
                          onChange={handleOptionalInputChange}
                          name="integer1name"
                          value={optinalValues.integer1name}
                          sx={{ width: '40%' }}
                          label="Name"
                          size="small"
                          inputProps={{
                            className: classes.optionalInput,
                          }}
                        />
                        <TextField
                          name="integer1value"
                          value={optinalValues.integer1value}
                          onChange={handleOptionalInputChange}
                          size="small"
                          label="Value"
                          type="number"
                          inputProps={{
                            className: classes.optionalInput,
                          }}
                          sx={{ width: '40%' }}
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
                          value={optinalValues.integer2name}
                          size="small"
                          name="integer2name"
                          label="Name"
                          inputProps={{
                            className: classes.optionalInput,
                          }}
                          onChange={handleOptionalInputChange}
                        />
                        <TextField
                          value={optinalValues.integer2value}
                          size="small"
                          label="Value"
                          type="number"
                          name="integer2value"
                          inputProps={{
                            className: classes.optionalInput,
                          }}
                          sx={{ width: '40%' }}
                          onChange={handleOptionalInputChange}
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
                          value={optinalValues.integer3name}
                          size="small"
                          name="integer3name"
                          label="Name"
                          inputProps={{
                            className: classes.optionalInput,
                          }}
                          onChange={handleOptionalInputChange}
                        />
                        <TextField
                          sx={{ width: '40%' }}
                          value={optinalValues.integer3value}
                          size="small"
                          name="integer3value"
                          label="Name"
                          inputProps={{
                            className: classes.optionalInput,
                          }}
                          onChange={handleOptionalInputChange}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          )}

          <Button
            sx={{
              width: '20%',
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
            Add Colleciont
          </Button>
        </FormControl>
      </form>
    </Grid>
  );
};

export default CollectionForm;
