import React, { useEffect, useContext } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import { createTheme, ThemeProvider } from '@material-ui/core';
import AdminPage from './pages/AdminPage';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AuthForm from './components/Auth/AuthForm';
import UserPage from './pages/UserPage';
import DataContext from './store/data-context';
import CollectionsPage from './pages/CollectionsPage'
import axios from 'axios';
import SingleCollection from './components/Collections/SingleCollection';

const theme = createTheme({
  typography: {
    fontFamily: ['Quicksand', 'sans-serif'].join(','),
  },
});

function App() {
  const dataCtx = useContext(DataContext);
  useEffect(() => {
    let url = process.env.REACT_APP_URL;
    axios
      .get(`${url}/getAll`)
      .then((res) => {
        const data = res.data;
  
        if (data) {
          dataCtx.setCollections(data.updatedCollection);
          dataCtx.setItems(data.items);
          dataCtx.setLargestCollections(data.largestCollections);
          dataCtx.setNewItems(data.newestItems);
          dataCtx.setUsers(data.users)
          let arrayofptions = [];
          for (let element of data.uniqueTags) {
            arrayofptions.push({ value: element, label: element });
          }

          dataCtx.setTags(arrayofptions);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/adminPanel" element={<AdminPage />} />
          <Route path="login" element={<AuthForm />} />
          <Route path="profile/:userId/*" element={<UserPage />} />
          <Route path="collections" element={<CollectionsPage />}></Route>
          <Route path="collection/:collectionId" element={<SingleCollection />}></Route>
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
