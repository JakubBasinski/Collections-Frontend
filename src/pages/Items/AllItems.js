import { Grid, Typography } from '@mui/material';
import PaginatedItemList from './PaginatedItems';
import { useContext } from 'react';
import DataContext from '../../store/data-context';


const AllItems = () => {
    const dataCtx = useContext(DataContext)  
    const items = dataCtx.items  
  return (
    <Grid container justifyContent="center">
      <Grid item md={8} sx={{ marginTop: '75px' }}>
       
          {items.length > 0 && items ? (
            <PaginatedItemList fetchedData={items} />
          ) : (
            <Typography
              sx={{
                height: '300px',
                color: 'primary.main',
                backgroundColor: ' #022b31',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '1.2rem',
                borderRadius: '10px',
              }}
            >
              No Items found.
            </Typography>
          )}
        
      </Grid>
    </Grid>
  );
};

export default AllItems;
