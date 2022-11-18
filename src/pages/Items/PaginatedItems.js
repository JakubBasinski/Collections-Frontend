import { Grid } from '@mui/material';
import ItemCard from '../../components/Item/ItemCard';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import classes from './PaginatedItems.module.css';

const PaginatedItemList = (props) => {
  const itemsPerPage = 9;
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % props.fetchedData.length;
    setItemOffset(newOffset);
    console.log('newOffset', newOffset);
  };
  const endOffset = itemOffset + itemsPerPage;

  useEffect(() => {
    setCurrentItems(props.fetchedData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(props.fetchedData.length / itemsPerPage));
  }, [props, itemOffset]);

  return (
    <Grid container spacing={4}>
      <Grid item md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <ReactPaginate
          breakLabel="..."
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< "
          renderOnZeroPageCount={null}
          containerClassName={classes.pagination}
          pageLinkClassName={classes.pagenum}
          previousLinkClassName={classes.pagenum}
          nextLinkClassName={classes.pagenum}
          activeClassName={classes.active}
        />
      </Grid>
      {currentItems ? (
        currentItems.map((singleItem) => {
          return (
            <Grid item md={4} key={singleItem._id}>
              <ItemCard
                name={singleItem.name}
                collection={singleItem.collectionName}
              />
            </Grid>
          );
        })
      ) : (
        <p>No items</p>
      )}
    </Grid>
  );
};

export default PaginatedItemList;
