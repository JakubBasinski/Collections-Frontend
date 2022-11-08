import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardActionArea, makeStyles } from '@material-ui/core/';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useDeleteCollection from '../../Hooks/useDeleteCollection';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import CollectionCard from '../../components/Collection/CollectionCard';
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
import useGetCollections from '../../Hooks/useGetCollections';
import CollectionContext from '../../store/collection';
import * as cls from './UserCollectionListSx';

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

const UserCollectionList = () => {
  const collContext = useContext(CollectionContext);
  const navigate = useNavigate();
  const classes = useStyles();
  const [openDialog, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [bindCollectionId, setBindId] = useState('');
  const { mutate: getCollections, fetchedCollectionsState } =
    useGetCollections();

  const { mutate: deleteCollection } = useDeleteCollection();

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
        <Typography variant="h5" sx={cls.listHeader}>
          Your Collections
        </Typography>

        <Grid container gap={5}>
          {fetchedCollectionsState.map((collectionObject) => {
            let collection = collectionObject.collection;
            let url = collectionObject.imageUrl;
            return (
              <Grid item md={3} sx={{ height: '400px' }} key={collection._id}>
                <CollectionCard
                  onClick={(e) => {
                    toDetailsPage(collection._id);
                  }}
                  name={collection.name}
                  url={url}
                  topic={collection.topic}
                  card={cls.card}
                  cardActionImage={cls.cardActionImage}
                  cardActionDetails={cls.cardActionDetails}
                  cardContent={cls.cardContent}
                />

                <Box sx={cls.editionButtonsBox}>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      collContext.setMode('edit');
                      navigate(`./../edition/${collection._id}`);
                    }}
                    sx={cls.editionButton}
                    type="button"
                  >
                    Edit
                    <EditIcon sx={cls.editIcons} fontSize="small" />
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setBindId(collection._id);
                      setOpen(true);
                    }}
                    sx={cls.deleteButton}
                    type="button"
                  >
                    Delete
                    <DeleteIcon sx={cls.editIcons} fontSize="small" />
                  </Button>
                </Box>

                <Dialog
                  open={openDialog}
                  onClose={() => {
                    setOpen(false);
                  }}
                  aria-labelledby="dialog-title"
                  sx={{
                    '& .MuiDialog-paper': {
                      background: '#022b31',
                      color: 'primary.main',
                    },
                    '& .MuiDialogContentText-root': { color: 'primary.main' },
                    '& .MuiButtonBase-root': {
                      color: 'primary.main',
                      letterSpacing: 0.5,
                      textTransform: 'none',
                    },
                    '& .MuiButtonBase-root:hover': {
                      color: 'secondary.light',
                      textShadow: '2px 2px 4px rgb(0,0,0)',
                      transition: 'all 0.3s ease 0s',
                      transform: 'translateY(-1px)',
                      letterSpacing: 0.5,
                      textTransform: 'none',
                    },
                  }}
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

export default UserCollectionList;
