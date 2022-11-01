import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import DataContext from '../../store/data-context';
import { Typography } from '@material-ui/core';

const SingleCollection = () => {
  const { collectionId } = useParams();
  const dataCtx = useContext(DataContext);
  return (
    <Grid container gutterBottom sx={{ height: '100vh' }  } gap={8} justifyContent="center">
      <Grid  sx={{marginTop: '75px'}} item>
      <Typography > Connectiond Id: {collectionId}</Typography>
      </Grid>
      
    </Grid>
  );
};

export default SingleCollection;
