import { useState } from 'react';
import axios from 'axios';

const useMutation = (url) => {
  const [state, setState] = useState({
    isLoading: 'false',
    error: '',
  });

  const fn = async (data, token) => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    console.log('token' + token);
    axios
      .post(
        'http://localhost:3001/collection/create',
         data ,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(() => {
        setState({ isLoading: false, error: '' });
      })
      .catch((error) => setState({ isLoading: false, error }));
  };
  return { mutate: fn, ...state };
};

export default useMutation;
