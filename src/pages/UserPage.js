import React, { useState } from 'react';
import { Grid } from '@mui/material';
import UserMenu from '../components/User/UserMenu';
import CollectionForm from '../components/Collections/CollectionForm';
import EditCollection from '../components/Collections/EditCollections';

const UserPage = () => {
  const [userAction, setUserAction] = useState('add');

  const setUserHandler = (action) => {
    setUserAction(action);
  };

  return (
    <Grid container sx={{ height: '90vh' }} gap={8} justifyContent="start">
      <UserMenu handleAction={setUserHandler} />
      {userAction === 'add' && <CollectionForm />}
      {userAction === 'edit' && <EditCollection />}
      {userAction === 'singleCollection'}
    </Grid>
  );
};

export default UserPage;
