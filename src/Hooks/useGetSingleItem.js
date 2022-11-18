import { useState } from 'react';
import axios from 'axios';

const useGetSingleItem = () => {
  const [state, setState] = useState({
    isLoading: 'false',
    error: '',
    fetchedItem: {},
  });

  const fn = async (itemId) => {
    let url = process.env.REACT_APP_URL;
    await axios
      .get(`${url}/items/${itemId}`)
      .then((res) => {
        let item;
        if (res.data) {
          item = res.data.item
          console.log(item);
          setState({
            isLoading: 'false',
            error: '',
            fetchedItem: item,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  return { mutate: fn, ...state };
};

export default useGetSingleItem;
