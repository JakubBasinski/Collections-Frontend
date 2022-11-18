import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import useGetSingleItem from '../../Hooks/useGetSingleItem';
import ItemCard from '../../components/Item/ItemCard';
import * as cls from './styles/SingleItemSX';
import CommentList from './CommenList';


const SingleItem = () => {
  const { itemId } = useParams();
  const { mutate: getSingleItem, fetchedItem } = useGetSingleItem();
  const userId = localStorage.getItem('userId');
  console.log('userId', userId);

  useEffect(() => {
    getSingleItem(itemId);
  }, []);

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid
        sx={{
          marginY: '75px',
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
        }}
        gap={5}
        container
      >
        <Grid item md={3} sx={{ height: '100%' }}>
          <ItemCard
            cardClass={cls.card}
            name={fetchedItem.name}
            collection={fetchedItem.collectionName}
            author={fetchedItem.author}
          />
        </Grid>
        <Grid item md={6} sx={{  height: '100%' }}>
          <CommentList currentUserId={userId} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SingleItem;
