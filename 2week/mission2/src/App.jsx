import React, { useState, useEffect } from 'react';
import moviesData from './movies.json';
import './App.css'; // CSS 파일 import

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(moviesData.results);
  }, []);

  return (
    <div className="App">
      <div className="movie-list">
        {movies.map(movie => (
          <div key={movie.id} className="movie">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <div className="movie-info">
            <div className="movie-title">{movie.title}</div>
            <div className="movie-average">{movie.vote_average}</div>
          </div>
          <div className="movie-details">
            <h3>{movie.title}</h3>
            <p className="overview">{movie.overview}</p>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}

export default App;
