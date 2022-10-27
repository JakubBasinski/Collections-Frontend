import React, { useEffect } from 'react';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import { CardActionArea, makeStyles } from '@material-ui/core/';
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from '@mui/material';
import useGetCollections from '../Hooks/useGetCollections';

const useStyles = makeStyles({
  root: {
    height: '250px',
    width: '100%',
    display: 'flex',
    background: 'none',
  },
  actions: {
    width: '65%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    backdropFilter: 'invert(10%)',
  },
  media: {
    width: '35%',
    backdropFilter: 'invert(10%)',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  btn: {
    display: 'flex',
    justifyContent: 'start',
    paddingLeft: '20px',
    width: '100%',
    height: '100%',
    fontFamily: 'Quicksand',
    color: '#A2CDCB',
    fontSize: '1.2em',
    textDecoration: 'none',
    backgroundColor: '#1A373C',
    '&:hover': {
      color: '#f8e112',

      backgroundColor: '#1A373C',
    },
  },
});

const EditCollections = () => {
  const {
    mutate: getCollections,
    fetchedCollectionsState,
    isLoading: uploading,
    error: uploadError,
  } = useGetCollections();

  useEffect(() => {
    getCollections();
  }, []);

  const classes = useStyles();

  return (
    <Grid item md={8}>
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
          Your Collections
        </Typography>
        <Grid container spacing={2}>
          {fetchedCollectionsState.map((collectionObject) => {
            let collection = collectionObject.collection;
            let url = collectionObject.imageUrl;
            return (
              <Grid item md={4} key={collection._id}>
                <Card className={classes.root}>
                  <CardActionArea className={classes.media}>
                    {url && (
                      <CardMedia
                        className={classes.img}
                        component="img"
                        image={url}
                        title=""
                      />
                    )}
                    {!url && <p>hi</p>}
                  </CardActionArea>

                  <CardActionArea className={classes.actions}>
                    <CardContent
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        alignItems: 'start',
                        gap: 0,
                        padding: '15px',
                        height: '80%',
                      }}
                    >
                      <Typography
                        sx={{
                          padding: 0,
                          margin: 0,
                          color: '#A2CDCB',
                          fontFamily: 'Source Sans Pro',
                          textShadow: '2px 2px 4px rgb(0,0,0)',
                          height:'22%'
                        }}
                    
                        variant="h4"
                      >
                        {collection.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: 'Source Sans Pro',
                          paddingLeft: '2px',
                         
                          height:'10%'
                        }}
                        gutterBottom
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        
                      </Typography>
                 
                      <Typography
                        sx={{
                          fontFamily: 'Source Sans Pro',
                          paddingLeft: '2px',
                          margin: 0,
                          height:'55%',
                          fontStyle: 'italic',
                          display: 'flex',
                          alignItems: 'start',
                          fontSize: '1.1rem'
                          
                        }}
                       
                    
                        component="p"
                      >
                        {collection.description}...
                      </Typography>
                    </CardContent>

                    <CardActions
                      sx={{
                        width: '100%',
                        height: '20%',
                        display: 'flex',
                        alignItems: 'start',
                        justifyContent: 'start',
                        padding: 0,
                      }}
                    >
                      <Button className={classes.btn}>
                        More Info
                        <KeyboardDoubleArrowRightIcon />
                      </Button>
                    </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Grid>
  );
};

export default EditCollections;
