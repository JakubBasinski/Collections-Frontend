import React from 'react';
import { Grid } from '@mui/material';
import UserMenu from '../components/User/UserMenu';
import CollectionForm from '../components/Collections/CollectionForm';
import { Routes, Route } from 'react-router-dom';
import ListCollection from '../components/Collections/ListCollections';
import CollectionDetails from '../components/Collections/CollectionDetails';

const UserPage = () => {
  return (
    <Grid container sx={{ height: '90vh' }} gap={8} justifyContent="start">
      <UserMenu />
      <Routes>
        <Route path="add" element={<CollectionForm />} />
        <Route path="edition/:collectionId" element={<CollectionForm />} />
        <Route path="list" element={<ListCollection />} />
        <Route path="details/:collectionID" element={<CollectionDetails />} />

      </Routes>
    </Grid>
  );
};

export default UserPage;

