import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import UserMenu from '../components/User/UserMenu';
import CollectionForm from '../components/Collections/CollectionForm';
import EditCollection from '../components/Collections/EditCollections';
import useGetCollections from '../components/Hooks/useGetCollections';

const UserPage = () => {
  const [userAction, setUserAction] = useState('add');

  const {
    mutate: getCollections,
    isLoading: uploading,
    error: uploadError,
  } = useGetCollections();

  console.log(userAction);
  const setUserHandler = (action) => {
    setUserAction(action);
  };

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <Grid container sx={{ height: '90vh' }} gap={8} justifyContent="start">
      <UserMenu handleAction={setUserHandler} />
      {userAction === 'add' && <CollectionForm />}
      {userAction === 'edit' && <EditCollection />}
    </Grid>
  );
};

export default UserPage;
