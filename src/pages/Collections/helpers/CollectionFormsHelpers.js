import { TextField, MenuItem } from '@mui/material';

export const initialFieldValues = {
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

export const showOptionalFields = {
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

export const TextFieldName = (props) => {
  return (
    <TextField
      label="Collection Name"
      name="name"
      variant="filled"
      sx={props.class}
      autoComplete="off"
      value={props.value}
      onChange={props.handleChange}
      required
    />
  );
};

export const TextFieldTopic = (props) => {
  return (
    <TextField
      name="topic"
      label="Select topic"
      variant="filled"
      sx={props.class}
      autoComplete="off"
      value={props.value}
      onChange={props.handleChange}
      select
      required
    >
      <MenuItem value="Alcohols">Alcohols</MenuItem>
      <MenuItem value="Books">Books</MenuItem>
      <MenuItem value="Films">Films</MenuItem>
      <MenuItem value="Cars">Cars</MenuItem>
      <MenuItem value="Board Games">BoardGames</MenuItem>
      <MenuItem value="Animals">Animals</MenuItem>
      <MenuItem value="Nature">Nature</MenuItem>
    </TextField>
  );
};

export const TextFieldDescription = (props) => {
  return (
    <TextField
      variant="filled"
      name="description"
      label="Description"
      sx={props.class}
      multiline
      rows="4"
      type="text"
      autoComplete="off"
      value={props.value}
      onChange={props.handleChange}
      required
    />
  );
};
