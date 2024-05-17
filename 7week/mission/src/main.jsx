import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import MainPage from './components/MainPage.jsx';
import PopularPage from './components/PopularPage.jsx';
import Footer from './Footer.jsx';
import TopRatedPage from './components/TopRatedPage.jsx'
import UpComing from './components/UpComing.jsx';
import NowPlayingPage from './components/NowPlayingPage.jsx'
import MovieDetailPage from './components/MovieDetailPage.jsx';
import NotFound from './components/NotFound.jsx';
import SignUp from './components/SignUpPage.jsx';
import Login from './components/Login.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={
            <>
              <Navbar />
              <MainPage />
              <Footer />
            </>
          }
        />
        <Route path="/popular" element={
            <>
              <Navbar />
              <PopularPage />
              <Footer />
            </>
          }
        />
        <Route path="/now-playing" element={
            <>
              <Navbar />
              <NowPlayingPage />
              <Footer />
            </>
          }
        />
        <Route path="/top-rated" element={
            <>
              <Navbar />
              <TopRatedPage />
              <Footer />
            </>
          }
        />
        <Route path="/upcoming" element={
            <>
              <Navbar />
              <UpComing />
              <Footer />
            </>
          }
        />
        <Route path="/signup" element={
            <>
              <Navbar />
              <SignUp />
              <Footer />
            </>
          }
        />
        <Route path="/movie/:movieId" element={
            <>
              <Navbar />
              <MovieDetailPage />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={
            <>
              <Navbar />
              <Login />
              <Footer />
            </>
          }
        />
        
        <Route path="*" element={
          <NotFound />
        }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
