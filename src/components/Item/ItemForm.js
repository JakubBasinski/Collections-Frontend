import { useParams } from 'react-router-dom';
import React, { useState, useContext, } from 'react';
import { FormControl, TextField, Box, Button, Snackbar } from '@mui/material';
import CreatableSelect from 'react-select/creatable';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import DataContext from '../../store/data-context';

const checkBoxStyle = {
  '&.MuiCheckbox-root': {
    color: '#DCD7C9',
    backdropFilter: 'non',
  },
  '&.Mui-checked': {
    color: '#A2CDCB',
  },
  '&:hover': {
    boxShadow: 3,
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.2rem',
    padding: 0,
  },
};
const formControlLabel = {
  '& .MuiFormControlLabel-label': {
    fontSize: '1.5rem',
    color: '#DCD7C9',
    marginLeft: '5px',
  },
};

const customStyles = {
  control: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    ...styles,
    height: '140%',
    width: '100%',
    margin: 'auto',
    backgroundColor: '#244546',
    border: isFocused ? 0 : 0,
    boxShadow: isFocused ? 0 : 0,
    color: 'red',
  }),
  option: (provided, { data, isDisabled, isFocused, isSelected }) => ({
    ...provided,
    borderBottom: '1px dotted #2a3b41',
    backgroundColor: '#466768',
    color: '#DCD7C9',
    padding: 20,
    marign: 0,
    ':hover': {
      backgroundColor: '#355657 ',
    },
  }),
  multiValue: (styles, { data }) => {
    const color = 'white';
    return {
      ...styles,
      color: color,
      backgroundColor: '#466768',
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: '#DCD7C9',
  }),
  container: (styles, { data }) => ({
    ...styles,
    zIndex: '100 !important',
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: '#DCD7C9',
    backgroundColor: '#466768',
    ':hover': {
      backgroundColor: '#365759',
      color: '#f8e112',
      cursor: 'pointer',
    },
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: '#DCD7C9',
    };
  },
  input: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: '#DCD7C9',
    };
  },
  menuList: (defaultStyles) => {
    return {
      ...defaultStyles,
      margin: 0,
      padding: 0,
    };
  },
  indicatorSeparator: (defaultStyles) => {
    return {
      display: 'none',
    };
  },
};

const ItemForm = (props) => {
  const { collectionID } = useParams();
  const [open, setOpen] = useState(false);
  const [singInMessage, setSignInMessage] = useState(null);
  const dataCtx = useContext(DataContext);
  const options = dataCtx.tags;
  const collection = props.collection;
  const date1 = collection.data1name;
  const date2 = collection.data2name;
  const date3 = collection.data3name;
  const string1 = collection.string1name;
  const string2 = collection.string2name;
  const string3 = collection.string3name;
  const int1 = collection.integer1name;
  const int2 = collection.integer2name;
  const int3 = collection.integer3name;
  const text1 = collection.text1name;
  const text2 = collection.text2name;
  const text3 = collection.text3name;
  const check1 = collection.checkbox1name;
  const check2 = collection.checkbox2name;
  const check3 = collection.checkbox3name;

  const fieldNames = {
    date1name: date1,
    date2name: date2,
    date3name: date3,
    string1name: string1,
    string2name: string2,
    string3name: string3,
    int1name: int1,
    int2name: int2,
    int3name: int3,
    text1name: text1,
    text2name: text2,
    text3name: text3,
    check1name: check1,
    chack2name: check2,
    check3name: check3,
  };
  const initialFieldValues = {
    name: '',
    id: '',
    date1value: Date.now(),
    date2value: Date.now(),
    date3value: Date.now(),
    string1value: '',
    string2value: '',
    string3value: '',
    int1value: '',
    int2value: '',
    int3value: '',
    text1value: '',
    text2value: '',
    text3value: '',
    check1value: false,
    check2value: false,
    check3value: false,
  };

  const [itemValues, setFieldValues] = useState(initialFieldValues);
  const [tagValue, setTags] = useState(null);
  const handleTags = (e) => {
    const pickedTags = e.map(({ value, label }) => value);
    setTags(pickedTags);
  };
  const handleCheck1 = (e) => {
    const { checked } = e.target;
    setFieldValues({
      ...itemValues,
      check1value: checked,
    });
  };
  const handleCheck2 = (e) => {
    const { checked } = e.target;
    setFieldValues({
      ...itemValues,
      check2value: checked,
    });
  };
  const handleCheck3 = (e) => {
    const { checked } = e.target;
    setFieldValues({
      ...itemValues,
      check3value: checked,
    });
  };
  const handleData1Input = (e) => {
    setFieldValues({
      ...itemValues,
      date1value: e,
    });
  };
  const handleData2Input = (e) => {
    setFieldValues({
      ...itemValues,
      date2value: e,
    });
  };
  const handleData3Input = (e) => {
    setFieldValues({
      ...itemValues,
      date3value: e,
    });
  };

  const handleString1Input = (e) => {
    const { value } = e.target;
    setFieldValues({
      ...itemValues,
      string1value: value,
    });
  };
  const handleString2Input = (e) => {
    const { value } = e.target;
    setFieldValues({
      ...itemValues,
      string2value: value,
    });
  };
  const handleString3Input = (e) => {
    const { value } = e.target;
    setFieldValues({
      ...itemValues,
      string3value: value,
    });
  };

  const handleInt1Input = (e) => {
    const { value } = e.target;
    setFieldValues({
      ...itemValues,
      int1value: value,
    });
  };
  const handleInt2Input = (e) => {
    const { value } = e.target;
    setFieldValues({
      ...itemValues,
      int2value: value,
    });
  };
  const handleInt3Input = (e) => {
    const { value } = e.target;
    setFieldValues({
      ...itemValues,
      int3value: value,
    });
  };

  const handleText1Input = (e) => {
    const { value } = e.target;
    setFieldValues({
      ...itemValues,
      text1value: value,
    });
  };
  const handleText2Input = (e) => {
    const { value } = e.target;
    setFieldValues({
      ...itemValues,
      text2value: value,
    });
  };
  const handleText3Input = (e) => {
    const { value } = e.target;
    setFieldValues({
      ...itemValues,
      text3value: value,
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFieldValues({
      ...itemValues,
      [name]: value,
    });
  };


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

  const submitHandler = async (event) => {
    let url = process.env.REACT_APP_URL;

    event.preventDefault();
    const token = localStorage.getItem('token');
    const fd = new FormData();
    fd.append('collectionId', collectionID);

    for (const property in fieldNames) {
      fd.append(property, fieldNames[property]);
    }
    for (const value in itemValues) {
      fd.append(value, itemValues[value]);
    }
    fd.append('tags', JSON.stringify(tagValue));
    try {
      axios
        .post(`${url}/createItem`, fd, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          if (res) {
            setOpen(true);
            setSignInMessage(res.data.message);
            setFieldValues(initialFieldValues);
            console.log(tagValue);
            setTags(null);
            console.log(tagValue);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <FormControl
        sx={{
          backgroundColor: 'none',
          width: '100%',
          height: '100%',
          backdropFilter: 'invert(10%)',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          gap: 3,
          borderRadius: '5px',
        }}
      >
        <CreatableSelect
          isMulti
          placeholder={<div>Select Tags</div>}
          styles={customStyles}
          options={options}
          name="tags"
          onChange={handleTags}
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            label="Name"
            name="name"
            color="success"
            variant="filled"
            sx={{ width: '50%', marginX: 'auto' }}
            autoComplete="off"
            value={itemValues.name}
            onChange={handleInputChange}
            required
          ></TextField>
          <TextField
            label="id"
            name="id"
            color="success"
            variant="filled"
            sx={{ width: '50%', marginX: 'auto' }}
            autoComplete="off"
            value={itemValues.id}
            onChange={handleInputChange}
            required
          ></TextField>
        </Box>

        <Box
          sx={{
            marginX: 'auto',
            width: '100%',
            display: 'flex',
            gap: 1,
          }}
        >
          <LocalizationProvider
            sx={{ width: '100%' }}
            dateAdapter={AdapterDayjs}
          >
            {date1 ? (
              <DatePicker
                sx={{ width: '30%' }}
                label={date1}
                value={itemValues['date1value']}
                onChange={(date) => {
                  handleData1Input(date);
                }}
                renderInput={(params) => <TextField {...params} />}
                showDaysOutsideCurrentMonth
              />
            ) : null}
            {date2 ? (
              <DatePicker
                label={date2}
                value={itemValues['date2value']}
                onChange={(date) => {
                  handleData2Input(date);
                }}
                renderInput={(params) => <TextField {...params} />}
                showDaysOutsideCurrentMonth
              />
            ) : null}
            {date3 ? (
              <DatePicker
                label={date3}
                value={itemValues['date3value']}
                onChange={(date) => {
                  handleData3Input(date);
                }}
                renderInput={(params) => <TextField {...params} />}
                showDaysOutsideCurrentMonth
              />
            ) : null}
          </LocalizationProvider>
        </Box>

        <Box
          sx={{
            width: '100',
            display: 'flex',
            gap: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {int1 ? (
            <TextField
              label={int1}
              name={int1}
              onChange={handleInt1Input}
              value={itemValues['int1value']}
              type="number"
            />
          ) : null}
          {int2 ? (
            <TextField
              label={int2}
              name={int2}
              onChange={handleInt2Input}
              value={itemValues['int2value']}
              type="number"
            />
          ) : null}
          {int3 ? (
            <TextField
              label={int3}
              name={int3}
              onChange={handleInt3Input}
              value={itemValues['int3value']}
              type="number"
            />
          ) : null}
        </Box>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            gap: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {string1 ? (
            <TextField
              label={string1}
              name={string1}
              onChange={handleString1Input}
              value={itemValues['string1value']}
            />
          ) : null}
          {string2 ? (
            <TextField
              label={string2}
              name={string2}
              onChange={handleString2Input}
              value={itemValues['string2value']}
            />
          ) : null}
          {string3 ? (
            <TextField
              label={string3}
              name={string3}
              onChange={handleString3Input}
              value={itemValues['string3value']}
            />
          ) : null}
        </Box>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {text1 ? (
            <TextField
              label={text1}
              name={text1}
              multiline
              rows={3}
              onChange={handleText1Input}
              value={itemValues['text1value']}
            />
          ) : null}
          {text2 ? (
            <TextField
              label={text2}
              name={text2}
              multiline
              rows={3}
              onChange={handleText2Input}
              value={itemValues['text2value']}
            />
          ) : null}
          {text3 ? (
            <TextField
              label={text3}
              name={text3}
              multiline
              rows={3}
              onChange={handleText3Input}
              value={itemValues['text3value']}
            />
          ) : null}
        </Box>

        <FormGroup
          sx={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-evenly',
          }}
        >
          {check1 ? (
            <FormControlLabel
              control={
                <Checkbox
                  checkedIcon={<CheckCircleOutlineIcon />}
                  icon={<RadioButtonUncheckedIcon />}
                  sx={checkBoxStyle}
                  onChange={handleCheck1}
                  checked={itemValues['check1value']}
                  name={check1}
                />
              }
              label={check1}
              sx={formControlLabel}
            />
          ) : null}
          {check2 ? (
            <FormControlLabel
              control={
                <Checkbox
                  checkedIcon={<CheckCircleOutlineIcon />}
                  icon={<RadioButtonUncheckedIcon />}
                  sx={checkBoxStyle}
                  onChange={handleCheck2}
                  checked={itemValues['check2value']}
                  name={check2}
                />
              }
              label={check2}
              sx={formControlLabel}
            />
          ) : null}
          {check3 ? (
            <FormControlLabel
              control={
                <Checkbox
                  checkedIcon={<CheckCircleOutlineIcon />}
                  icon={<RadioButtonUncheckedIcon />}
                  sx={checkBoxStyle}
                  onChange={handleCheck3}
                  checked={itemValues['check3value']}
                  name={check3}
                />
              }
              label={check3}
              sx={formControlLabel}
            />
          ) : null}
        </FormGroup>

        <Box
          sx={{
            width: '100%',
            paddingY: '10px',
            display: 'flex',
            justifyContent: 'center',
            color: '#DCD7C9',
          }}
        >
          <Button
            sx={{
              '&.MuiButtonBase-root': {
                width: '40%',
                paddingY: '6px',
                height: '100%',
                fontFamily: 'Quicksand',
                fontSize: '1.2em',
                background: '#1A373C',
                display: 'flex',
              },
              '& .MuiButtonBase-text': {
                color: 'black',
              },

              '&:hover': {
                color: '#f8e112',
                background: '#1A373C',
              },
            }}
            type="submit"
          >
            Add Item
          </Button>
        </Box>
      </FormControl>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={singInMessage}
        action={action}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
      />
    </form>
  );
};

export default ItemForm;
