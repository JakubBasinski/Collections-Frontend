import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import DataContext from '../../store/data-context';
import { Typography } from '@material-ui/core';

const SingleCollection = () => {
  const { collectionId } = useParams();
  
  const dataCtx = useContext(DataContext);
  return (
    <Grid
      container
      gutterBottom
      sx={{ height: '100vh' }}
      gap={8}
    >
      <Grid sx={{ marginTop: '75px', display: 'flex', flexDirection: 'row', border: 1, width: '100%', justifyContent: 'space-around'}} item>
        <Grid item md={4} sx={{ border: 1, height: '100%' }}>
        <Typography> Connectiond Id: {collectionId}</Typography>
        </Grid>
        <Grid item md={7} sx={{ border: 1, height: '100%'}}> Jestem Tutaj </Grid>
      </Grid>
    </Grid>
  );
};

export default SingleCollection;
