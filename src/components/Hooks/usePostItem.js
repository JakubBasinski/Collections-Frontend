import { useState } from 'react';
import axios from 'axios';

const usePostItem = () => {
  const [state, setState] = useState({
    isLoading: 'false',
    error: '',
  });
  const url = 'http://localhost:3001/createItem';
  const fn = async (data, token) => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    axios
      .post(url, data, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setState({ isLoading: false, error: '' });
      })
      .catch((error) => setState({ isLoading: false, error }));
  };

  return { mutate: fn, ...state };
};

export default usePostItem;
