import * as React from 'react';
import { Grid } from '@mui/material';
import LargestCollectionList from '../components/Collections/LargestCollectionList';
import RecentlyAddedCards from '../components/Items/RecentlyAddedCards';


const MainPage = () => {
  
  return (
    <Grid container sx={{ height: '100vh' }} gap={8} justifyContent="start">
      <LargestCollectionList />
      <RecentlyAddedCards />
    </Grid>
  );
};

export default MainPage;
