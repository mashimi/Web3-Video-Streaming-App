import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './scss/app.scss';
import 'aos/dist/aos.css';
import HomePage from './pages/home';
import VideoSinglePage from './pages/video-single';
import VideoSignleMock from './mock-components/VideoSignleMock';
import MintVideoPage from './pages/mint';
import UserPage from './pages/account';
import Layout from './pages/Layout';
import AdminPage from './pages/admin';
import DiscoverPage from './pages/discover';
import ActivitesPage from './pages/activity';
import FeaturesRequestsPage from './pages/features-requests';
import FAQsPage from './pages/faqs';
import SearchPage from './pages/search';
import MyListPage from './pages/watchlist';
import NotFound from './components/NotFound';

import * as bootstrap from 'bootstrap';
import useVideos from './hooks/useVideos';
import useWeb3 from './hooks/useWeb3';
window.bootstrap = bootstrap;

function App() {
    const { owner } = useVideos();
    const { account } = useWeb3();
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route exact path='/' element={<HomePage />} />
                    <Route path='/account' element={<UserPage />} />
                    <Route path='/mint' element={<MintVideoPage />} />
                    <Route path='/discover' element={<DiscoverPage />} />
                    <Route path='/videos/:id' element={<VideoSinglePage />} />
                    <Route path='/video-mock' element={<VideoSignleMock />} />
                    <Route path='/activities' element={<ActivitesPage />} />
                    <Route path='/watchlist' element={<MyListPage />} />
                    <Route path='/faqs' element={<FAQsPage />} />
                    <Route path='/search' element={<SearchPage />} />
                    <Route path='/features-requests' element={<FeaturesRequestsPage />} />
                    {owner === account && <Route path='/admin' element={<AdminPage />} />}
                    <Route path='/*' element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
