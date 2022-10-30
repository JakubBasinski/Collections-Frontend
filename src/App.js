import React from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import { createTheme, ThemeProvider } from '@material-ui/core';
import AdminPage from './pages/AdminPage';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AuthForm from './components/Auth/AuthForm';
import UserPage from './pages/UserPage';

const theme = createTheme({
  typography: {
    fontFamily: ['Quicksand', 'sans-serif'].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/adminPanel" element={<AdminPage />} />
          <Route path="login" element={<AuthForm />} />
          <Route path="profile/:userId/*" element={<UserPage />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
