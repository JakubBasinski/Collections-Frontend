import React, { useContext } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import classes from './LargestCollectionList.module.css';
import DataContext from '../../store/data-context';
import { useNavigate } from 'react-router-dom';

const LargestCollectionList = () => {
  const dataCtx = useContext(DataContext);
  const largestColl = dataCtx.largestCollections;
  const navigate = useNavigate();

  const goToCollection = (e) => {
    navigate(`/collection/${e}`);
  };

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
              {largestColl.map((collection) => {
                return (
                  <Typography
                    onClick={() => {
                      goToCollection(collection._id)
                    }}
                    key={collection._id}
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
