import { useState } from 'react';
import axios from 'axios';

const useGetCollections = () => {
  const [state, setState] = useState({
    isLoading: 'false',
    error: '',
  });

  const fn = async (data, token) => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    axios
      .get('http://localhost:3001/profile', data, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        setState({ isLoading: false, error: '' });
      })
      .catch((error) => setState({ isLoading: false, error }));
  };

  return { mutate: fn, ...state };
};

export default useGetCollections;
