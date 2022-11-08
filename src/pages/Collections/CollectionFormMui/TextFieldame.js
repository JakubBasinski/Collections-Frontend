import { TextField, MenuItem } from '@mui/material';

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
