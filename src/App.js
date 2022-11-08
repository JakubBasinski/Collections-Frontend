import React from 'react';
import './App.css';
import Layout from './Layout/Layout';
import AdminPage from './pages/Admin/AdminPage';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/Main/MainPage';
import AuthForm from './pages/Auth/AuthForm';
import UserPage from './pages/User/UserPage';
import CollectionsPage from './pages/Collections/CollectionsPage';
import SingleCollection from './pages/Collections/SingleCollection';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material';

import theme from './theme';

function App() {
  // const dataCtx = useContext(DataContext);
  // useEffect(() => {
  //   let url = process.env.REACT_APP_URL;
  //   axios
  //     .get(`${url}/getAll`)
  //     .then((res) => {
  //       const data = res.data;
  //       if (data) {
  //         dataCtx.setCollections(data.updatedCollection);
  //         dataCtx.setItems(data.items);
  //         dataCtx.setLargestCollections(data.largestCollections);
  //         dataCtx.setNewItems(data.newestItems);
  //         dataCtx.setUsers(data.users);
  //         let arrayofptions = [];
  //         for (let element of data.uniqueTags) {
  //           arrayofptions.push({ value: element, label: element });
  //         }
  //         dataCtx.setTags(arrayofptions);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <Layout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/panel" element={<AdminPage />} />
            <Route path="/login" element={<AuthForm />} />
            <Route path="/profile/:userId/*" element={<UserPage />} />
            <Route path="/collections" element={<CollectionsPage />}></Route>
            <Route
              path="collection/:collectionId"
              element={<SingleCollection />}
            ></Route>
          </Routes>
        </Layout>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
