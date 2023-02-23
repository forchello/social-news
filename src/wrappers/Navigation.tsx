import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from 'pages/Home';
import Login from 'pages/Login';
import Profile from "pages/Profile";
import News from "pages/News";
import RestrictedWrapper from "./Restricted";

const NavigationWrapper = () => (
    <BrowserRouter basename={'/social-news'}>
        <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/news" element={<News />} />
            <Route path="/profile" element={
                <RestrictedWrapper>
                    <Profile />
                </RestrictedWrapper>
            } />
        </Routes>
    </BrowserRouter>
);

export default NavigationWrapper;