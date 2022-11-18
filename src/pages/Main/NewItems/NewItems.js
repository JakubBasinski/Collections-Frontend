import React, { useContext } from 'react';
import { Grid, Box } from '@mui/material';
import ItemCard from '../../../components/Item/ItemCard';
import DataContext from '../../../store/data-context';
import AreaHeaderText from '../../../muiComponents/AreaHeaderText';

const NewItems = () => {
  const dataCtx = useContext(DataContext);
  const newItems = dataCtx.newItems;

  return (
    <Grid item md={7}>
      <Box sx={{ marginTop: '75px' }}>
        <AreaHeaderText> Recently added items </AreaHeaderText>
        <Grid container spacing={3}>
          {newItems.map((singleItem) => {
            return (
              <Grid item md={4} key={singleItem._id}>
                <ItemCard
                  _id={singleItem._id}
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

export default NewItems;
