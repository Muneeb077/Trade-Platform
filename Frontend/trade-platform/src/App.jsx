import React from 'react'
import {
  BrowserRouter as Router, Routes,
  Route, Navigate,
} from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google';

import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import UserProvider from './context/UserContext'
import Home from './pages/Dashboard/Home';
import Investments from './pages/Dashboard/Investments';
import {Toaster} from "react-hot-toast";

const GOOGLE_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const App = () => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_ID}>
      <UserProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Root />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signUp' element={<SignUp />} />
            <Route path='/dashboard' element={<Home/>} />
            <Route path='/investments' element={<Investments/>} />
          </Routes>
        </Router>
      </UserProvider>

      <Toaster
        toastOptions={{
          className:"",
          style:{
            fontsize:'13px'
          }
        }}
      />
    </GoogleOAuthProvider>
  );
};

const Root = () => {
  // Checking if token exists in localSotrage
  const isAuthenticated = !!localStorage.getItem('token');

  //if the token exists then redirect to dashboiard otherwise to the login page
  return isAuthenticated ? (
    <Navigate to="/dashboard" />) : (<Navigate to="/login" />);
}; 

export default App