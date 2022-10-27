import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './store/aut-context';
import { CollectionContextProvider } from './store/collection-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <AuthContextProvider>
      <CollectionContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CollectionContextProvider>
    </AuthContextProvider>

);

reportWebVitals();
