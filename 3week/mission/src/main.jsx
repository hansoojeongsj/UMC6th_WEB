import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import MainPage from './components/MainPage.jsx';
import PopularPage from './components/PopularPage.jsx';
import Footer from './Footer.jsx';
import TopRatedPage from './components/TopRatedPage.jsx'
import UpComing from './components/UpComing.jsx';
import NowPlayingPage from './components/NowPlayingPage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/popular" element={<PopularPage />} />
        <Route path="/now-playing" element={<NowPlayingPage />} />
        <Route path="/top-rated" element={<TopRatedPage />} />
        <Route path="/upcoming" element={<UpComing />} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
);
