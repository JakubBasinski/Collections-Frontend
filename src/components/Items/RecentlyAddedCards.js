import React, { useContext } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import ItemCard from './ItemCard';
import DataContext from '../../store/data-context';

const RecentlyAddedCards = () => {
  const dataCtx = useContext(DataContext);
  const newItems = dataCtx.newItems;
  console.log(dataCtx);

  return (
    <Grid item md={7}>
      <Box sx={{ marginTop: '75px' }}>
        <Typography
          variant="h5"
          fontWeight={600}
          fontFamily={'Quicksand'}
          sx={{
            paddingBottom: 1,
            paddingLeft: 1.1,
            borderBottom: 0.5,
            borderColor: 'rgba(255, 255, 255, 0.2)',
            color: '#DCD7C9',
            letterSpacing: 2,
            fontSize: 27,
            width: '35%',
            marginBottom: '40px',
          }}
        >
          Recently added items
        </Typography>
        <Grid container spacing={3}>
          {newItems.map((singleItem) => {
            return (
              <Grid item md={4} key={singleItem._id}>
                <ItemCard
                  name={singleItem.name}
                  author={singleItem.author}
                  collection={singleItem.collectionName}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Grid>
  );
};

export default RecentlyAddedCards;
