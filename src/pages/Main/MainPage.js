import React, { useEffect, useContext } from 'react';
import { Grid } from '@mui/material';
import LargestCollections from './LargestCollections/LargestCollections';
import NewItems from './NewItems/NewItems';
import DataContext from '../../store/data-context';
import axios from 'axios';

const MainPage = () => {
  const dataCtx = useContext(DataContext);
  useEffect(() => {
    let url = process.env.REACT_APP_URL;
    axios
      .get(`${url}/getAll`)
      .then((res) => {
        const data = res.data;
        if (data) {
          dataCtx.setCollections(data.updatedCollection);
          dataCtx.setItems(data.items);
          dataCtx.setLargestCollections(data.largestCollections);
          dataCtx.setNewItems(data.newestItems);
          dataCtx.setUsers(data.users);
          let arrayofptions = [];
          for (let element of data.uniqueTags) {
            arrayofptions.push({ value: element, label: element });
          }
          dataCtx.setTags(arrayofptions);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Grid container sx={{ height: '100vh' }} gap={8} justifyContent="start">
      <LargestCollections />
      <NewItems />
    </Grid>
  );
};

export default MainPage;
