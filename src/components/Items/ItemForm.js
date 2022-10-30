import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { FormControl, TextField, Box, Button } from '@mui/material';
import CreatableSelect from 'react-select/creatable';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import usePostItem from '../Hooks/usePostItem';

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

const options = [
  { value: 'Kuba', label: 'Kuba', color: '#b00b69' },
  { value: 'Michał', label: 'Michał', color: '#b00b69' },
  { value: 'Jan', label: 'Jan', color: '#b00b69' },
  { value: 'Kiełbasa', label: 'Kiełbasa', color: '#b00b69' },
  { value: 'Kuba', label: 'Kuba', color: '#b00b69' },
  { value: 'Michał', label: 'Michał', color: '#b00b69' },
  { value: 'Jan', label: 'Jan', color: '#b00b69' },
  { value: 'Kiełbasa', label: 'Kiełbasa', color: '#b00b69' },
  { value: 'Kuba', label: 'Kuba', color: '#b00b69' },
];

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

const initialFieldValues = {
  name: '',
  id: '',
};

const ItemForm = (props) => {
  const { collectionID } = useParams();
  const collection = props.collection;
  const [itemValues, setFieldValues] = useState(initialFieldValues);
  const handleCheck = (e) => {
    const { name, checked } = e.target;
    setFieldValues({
      ...itemValues,
      [name]: checked,
    });
  };

  const handleData1Input = (e) => {
    const date1 = collection.data1name;
    setFieldValues({
      ...itemValues,
      [date1]: e,
    });
  };
  const handleData2Input = (e) => {
    const date2 = collection.data2name;
    setFieldValues({
      ...itemValues,
      [date2]: e,
    });
  };
  const handleData3Input = (e) => {
    const date3 = collection.data3name;
    setFieldValues({
      ...itemValues,
      [date3]: e,
    });
  };
  const handleTags = (e) => {
    const pickedTags = e.map(({ value, label }) => value);
    setFieldValues({
      ...itemValues,
      tags: pickedTags,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFieldValues({
      ...itemValues,
      [name]: value,
    });
  };

  const optCheckboxes = [
    collection.checkbox1name,
    collection.checkbox2name,
    collection.checkbox3name,
  ];
  const optInts = [
    collection.integer1name,
    collection.integer2name,
    collection.integer3name,
  ];
  const optStrings = [
    collection.string1name,
    collection.string2name,
    collection.string3name,
  ];
  const optTexts = [
    collection.text1name,
    collection.text2name,
    collection.text3name,
  ];

  const {
    mutate: uploadItem,
    isLoading: uploading,
    error: uploadError,
  } = usePostItem();

  const submitHandler = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const fd = new FormData();
    fd.append('collectionId', collectionID);
    for (const property in itemValues) {
      fd.append(property, itemValues[property]);
    }
    try {
      console.log('here?');
      await uploadItem(fd, token);
    } catch (err) {
      console.log(err);
    }
  };

  const loadOption = (searchValue, callback) => {
    setTimeout(() => {
      const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      );
      console.log(searchValue, filteredOptions);
      callback(filteredOptions);
    }, 2000);
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

        {/* <Select
        onChange={handleChange}
        isMulti
        styles={customStyles}
        options={options}
      ></Select>
      <AsyncSelect
        loadOptions={loadOption}
        onChange={handleChange}
        defaultOptions
        isMulti
      ></AsyncSelect>
      <CreatableSelect isClearable options={options} /> */}

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
            {collection.data1name ? (
              <DatePicker
                sx={{ width: '30%' }}
                label={collection.data1name}
                onChange={(date) => {
                  handleData1Input(date);
                }}
                renderInput={(params) => <TextField {...params} />}
                showDaysOutsideCurrentMonth
              />
            ) : null}
            {collection.data2name ? (
              <DatePicker
                label={collection.data2name}
                onChange={(date) => {
                  handleData2Input(date);
                }}
                renderInput={(params) => <TextField {...params} />}
                showDaysOutsideCurrentMonth
              />
            ) : null}
            {collection.data3name ? (
              <DatePicker
                label={collection.data3name}
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
          {optInts.map((int, index) => {
            return int ? (
              <TextField
                key={index}
                label={int}
                name={int}
                onChange={handleInputChange}
                value={itemValues.int}
                type="number"
              />
            ) : null;
          })}
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
          {optStrings.map((string, index) => {
            return string ? (
              <TextField
                key={index}
                label={string}
                name={string}
                onChange={handleInputChange}
                value={itemValues.string}
              />
            ) : null;
          })}
        </Box>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {optTexts.map((text, index) => {
            return text ? (
              <TextField
                key={index}
                label={text}
                name={text}
                multiline
                rows={3}
                onChange={handleInputChange}
                value={itemValues.text}
              />
            ) : null;
          })}
        </Box>

        <FormGroup
          sx={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-evenly',
          }}
        >
          {optCheckboxes.map((box, index) => {
            return box ? (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleOutlineIcon />}
                    icon={<RadioButtonUncheckedIcon />}
                    sx={checkBoxStyle}
                    onChange={handleCheck}
                    value={itemValues.box}
                    name={box}
                  />
                }
                label={box}
                sx={formControlLabel}
              />
            ) : null;
          })}
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
    </form>
  );
};

export default ItemForm;
