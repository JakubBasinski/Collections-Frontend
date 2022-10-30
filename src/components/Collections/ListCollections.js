import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardActionArea, makeStyles } from '@material-ui/core/';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useDeleteCollection from '../Hooks/useDeleteCollection';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import useGetCollections from '../Hooks/useGetCollections';
import CollectionContext from '../../store/collection';

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

const ListCollection = () => {
  const collContext = useContext(CollectionContext);
  const navigate = useNavigate();
  const classes = useStyles();
  const [openDialog, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [bindCollectionId, setBindId] = useState('');

  const {
    mutate: getCollections,
    fetchedCollectionsState,
    isLoading: uploading,
    error: uploadError,
  } = useGetCollections();

  const { mutate: deleteCollection, isLoading, error } = useDeleteCollection();

  useEffect(() => {
    getCollections();
    console.log('count', count);
  }, [count]);

  const toDetailsPage = (id) => {
    navigate(`../details/${id}`);
  };

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
              <Grid item md={3} key={collection._id}>
                <Card
                  onClick={(e) => {
                    toDetailsPage(collection._id);
                  }}
                  sx={{
                    height: '400px',
                    width: '90%',
                    backgroundColor: 'transparent',
                    backdropFilter: 'invert(10%)',
                    color: '#A2CDCB',
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
                          padding: 0,
                          margin: 0,
                          color: '#A2CDCB',
                          fontFamily: 'Source Sans Pro',
                          textShadow: '2px 2px 4px rgb(0,0,0)',
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
                          height: '55%',
                          fontStyle: 'italic',
                          display: 'flex',
                          alignItems: 'start',
                          fontSize: '1.1rem',
                          color: 'black',
                        }}
                        component="p"
                      >
                        {collection.description}...
                      </Typography>
                    </CardContent>
                  </CardActionArea>

                  <CardActions
                    sx={{
                      width: '100%',
                      height: '10%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0,
                    }}
                  >
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        collContext.setMode('edit');
                        navigate(`./../edition/${collection._id}`);
                      }}
                      sx={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        fontFamily: 'Source Sans Pro',
                        fontSize: '1em',
                        color: '#A2CDCB',
                        '&:hover': {
                          color: '#f8e112',
                          background: 'rgb(3, 60, 65)',
                        },
                      }}
                      type="button"
                    >
                      Edit
                      <EditIcon sx={{ marginLeft: '5px' }} fontSize="small" />
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setBindId(collection._id);
                        setOpen(true);
                      }}
                      sx={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        fontFamily: 'Source Sans Pro',
                        fontSize: '1em',
                        color: '#A2CDCB',
                        '&:hover': {
                          color: '#cb8777',
                          background: 'rgb(3, 60, 65)',
                        },
                      }}
                      type="button"
                    >
                      Delete
                      <DeleteIcon sx={{ marginLeft: '5px' }} fontSize="small" />
                    </Button>
                  </CardActions>
                </Card>

                <Dialog
                  open={openDialog}
                  onClose={() => {
                    setOpen(false);
                  }}
                  aria-labelledby="dialog-title"
                >
                  <DialogTitle id="dialog-title">
                    Delete the Collection ?
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="dialog-description">
                      Are you sure you wand to delete collection? All data will
                      be gone..
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={(e) => {
                        setOpen(false);
                        deleteCollection(bindCollectionId);
                        setTimeout(() => {
                          setCount((s) => s + 1);
                        }, 2000);
                      }}
                      autoFocus
                    >
                      Confirm
                    </Button>
                    <Button
                      onClick={() => {
                        setOpen(false);
                        return;
                      }}
                      autoFocus
                    >
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Grid>
  );
};

export default ListCollection;
