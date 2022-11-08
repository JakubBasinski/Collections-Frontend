import React, { useContext } from 'react';
import { CardActionArea, makeStyles } from '@material-ui/core/';
import ReactMarkdown from 'react-markdown';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import DataContext from '../../store/data-context';

const useStyles = makeStyles({
  media: {
    width: '100%',
    height: '55%',
  },

  actions: {
    width: '100%',
    height: '35%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
  },
});

const Collections = () => {
  const classes = useStyles();
  const dataCtx = useContext(DataContext);
  console.log(dataCtx.collections);

  return (
    <Grid
      container
      sx={{ height: '100%', marginTop: '75px' }}
      justifyContent="start"
    >
      <Grid item sx={{ marginX: 'auto' }} md={9}>
        <Grid container >
          {dataCtx.collections.map((collectionObject) => {
            let collection = collectionObject.collection;
            let url = collectionObject.imageUrl;
            return (
              <Grid item md={3} key={collection._id}>
                <Card
                  sx={{
                    height: '100%',
                    width: '90%',
                    backgroundColor: 'transparent',
                    backdropFilter: 'invert(10%)',
                    color: '#A2CDCB',
                    flexWrap: 'wrap',
                  }}
                >
                  <CardActionArea className={classes.media}>
                    {url ? (
                      <CardMedia
                        sx={{
                          height: '100%',
                          objectFit: 'cover',
                          width: '100%',
                        }}
                        component="img"
                        image={url}
                        title=""
                        alt={collection.name}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          height: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'column',
                          borderColor: '#A2CDCB',
                          borderBottom: 1,
                          borderTop: 0,
                          borderLeft: 0,
                          borderRight: 0,
                          borderStyle: 'solid',
                          wordWrap: 'break-word',
                        }}
                      >
                        <ImageNotSupportedIcon fontSize="large" />
                      </Box>
                    )}
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
                        height: '70%',
                      }}
                    >
                      <Typography
                        sx={{
                          width: '100%',
                          padding: 0,
                          margin: 0,
                          flex: 1,
                          wordWrap: 'break-word',
                          color: '#A2CDCB',
                          fontFamily: 'Source Sans Pro',
                          textShadow: '2px 2px 4px rgb(0,0,0)',
                          wordWrap: 'break-word',
                        }}
                        variant="h4"
                      >
                        {collection.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: 'Source Sans Pro',
                        }}
                        gutterBottom
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {collection.topic}
                      </Typography>

                      <Typography
                        sx={{
                          fontFamily: 'Source Sans Pro',
                          wordWrap: 'break-word',
                        }}
                        variant="body1"
                        color="textSecondary"
                        component="p"
                      >
                        Description
                      </Typography>
                      <ReactMarkdown
                        sx={{
                          width: '100%',
                          textShadow: '2px 2px 4px rgb(0,0,0)',
                        }}
                        children={collection.description}
                      />
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Collections;
