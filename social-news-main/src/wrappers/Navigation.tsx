import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import Home from 'pages/Home';
import Login from 'pages/Login';
import Profile from 'pages/Profile';
import News from 'pages/News';
import RestrictedWrapper from './Restricted';

const NavigationWrapper = () => (
  <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/news" element={<News />} />
      <Route
        path="/profile"
        element={
          <RestrictedWrapper>
            <Profile />
          </RestrictedWrapper>
        }
      />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);

export default NavigationWrapper;
