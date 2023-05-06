import React from 'react';
import AuthContextProvider from './contexts/AuthContext/AuthContextProvider.js';
import ThemeContextProvider from './contexts/ThemeContext/ThemeContextProvider.js';
import PageContextProvider from './contexts/PageContext/PageContextProvider.js';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom' // BrowserRouter used on top level app render 
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

// console.log = () => {}
// console.error = () => {}
// console.debug = () => {}

root.render( // renders app 
  <BrowserRouter> 
    <AuthContextProvider>
      <ThemeContextProvider>
        <PageContextProvider>
          <App />
        </PageContextProvider>
      </ThemeContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
