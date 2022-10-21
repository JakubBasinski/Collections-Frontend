import React, { useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import ItemCard from '../Items/ItemCard';
import { motion } from 'framer-motion';
import classes from './LargestCollectionList.module.css';

const dummySingleItem1 = {
  id: '1251454323451',
  name: 'Zakochany bez pamieci',
  collection: 'Filmy',
  tags: ['nie wiem co to'],
  author: 'Kasia',
};
const dummySingleItem2 = {
  id: '1525142133451',
  name: 'Sok gruszkowy',
  collection: 'Napoje niegazowane',
  tags: ['nie wiem co to'],
  author: 'Kuba',
};
const dummySingleItem3 = {
  id: '125145323451',
  name: 'Papilot',
  collection: 'Wakacje',
  tags: ['nie wiem co to'],
  author: 'Janek',
};
const dummySingleItem4 = {
  id: '125142223451',
  name: 'Wladca pierscieni',
  collection: 'Ksiazki',
  tags: ['nie wiem co to'],
  author: 'Szymon',
};
const dummySingleItem5 = {
  id: '125143423451',
  name: 'Sok gruszkowy',
  collection: 'Napoje niegazowane',
  tags: ['nie wiem co to'],
  author: 'Kuba',
};

const dummyLatestItems = [
  dummySingleItem1,
  dummySingleItem2,
  dummySingleItem3,
  dummySingleItem4,
  dummySingleItem5,
];

const EditCollections = () => {


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
          {dummyLatestItems.map((singleItem) => {
            return (
              <Grid item md={4} key={singleItem.id}>
                <ItemCard
                  name={singleItem.name}
                  author={singleItem.author}
                  collection={singleItem.collection}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Grid>
  );
};

export default EditCollections;
