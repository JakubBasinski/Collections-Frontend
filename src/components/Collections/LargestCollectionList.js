import * as React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { motion } from "framer-motion"
import classes from './LargestCollectionList.module.css';

const dummyCollectionBooks = {
  name: 'My Fav books',
  description: 'A fantastic collection made by ME ofc',
  topic: 'Books',
  image: 'https://picsum.photos/seed/picsum/200/300',
};

const dummyCollectionAlc = {
  name: 'Alcohols',
  description: 'A fantastic collection made by ME ofc',
  topic: 'Books',
  image: 'https://picsum.photos/seed/picsum/200/300',
};

const dummyCollectionExamples = {
  name: 'Example',
  description: 'A fantastic collection made by ME ofc',
  topic: 'Books',
  image: 'https://picsum.photos/seed/picsum/200/300',
};

const dummyCollectionDragons = {
  name: 'Nice',
  description: 'A fantastic collection made by ME ofc',
  topic: 'Books',
  image: 'https://picsum.photos/seed/picsum/200/300',
};

const dummyCollectionFeniks = {
  name: 'Zlo',
  description: 'A fantastic collection made by ME ofc',
  topic: 'Books',
  image: 'https://picsum.photos/seed/picsum/200/300',
};

const allCollections = [
  dummyCollectionBooks,
  dummyCollectionAlc,
  dummyCollectionExamples,
  dummyCollectionDragons,
  dummyCollectionFeniks,
];

const LargestCollectionList = () => {
  return (
    <React.Fragment>
      <Grid
        item
        md={2}
        marginX="50px"
        sx={{
          borderRight: 0.5,
          borderColor: 'rgba(255, 255, 255, 0.2)',
        }}
      >
        <Box
          sx={{
            marginTop: '150px',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <motion.div className={classes.cloudTagButton}>
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
                fontSize: '1.6em',
              }}
            >
              Largest collections
            </Typography>

            <ul className={classes.cloudTagButtonUl}>
              {allCollections.map((collection) => {
                return (
                  <Typography
                    key={collection.name}
                    fontFamily={'Quicksand'}
                    component={motion.li}
                    sx={{
                      borderLeft: 0.5,
                      borderBottom: 0.5,
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      letterSpacing: 1.5,
                      listStyleType: 'none',
                      textDecoration: 'none',
                      paddingTop: '8px',
                      paddingRight: '8px',
                      paddingBottom: '10px',
                      paddingLeft: '15px',
                      cursor: 'pointer',
                      fontSize: '1.4em',
                      marginTop: '17px',
                      width: '70%',
                      color: '#DCD7C9',
                    }}
                    whileHover={{
                      scale: 1.15,
                      originX: 0,
                      color: '#f8e112',
                      textShadow: '0px 0px 8px rgb(255,255,255)',
                    }}
                  >
                    {collection.name}
                  </Typography>
                );
              })}
            </ul>
          </motion.div>
        </Box>
      </Grid>
    </React.Fragment>
  );
};

export default LargestCollectionList;
