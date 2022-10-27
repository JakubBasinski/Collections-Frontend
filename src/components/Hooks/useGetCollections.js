import { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../store/aut-context';


const useGetCollections = () => {
  const authCtx = useContext(AuthContext);
  const userId = authCtx.userId;

  const [state, setState] = useState({
    fetchedCollectionsState: [],
    isLoading: 'false',
    error: '',
  });

  const fn = async (data, token) => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    axios
      .get(`http://localhost:3001/profile/${userId}`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        let collectionsArray;
        if (res.data) {
          const fetchedCollections = res.data.updatedCollection;
          collectionsArray = Object.values(fetchedCollections);
        }
        setState({
          isLoading: false,
          error: '',
          fetchedCollectionsState: collectionsArray,
        });
      })
      .catch((error) => setState({ isLoading: false, error }));
  };

  return { mutate: fn, ...state };
};

export default useGetCollections;
