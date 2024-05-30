import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PopularPage.css';

function PopularPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=6c60e7f9faa167c5a152da49115e39ee')
      .then(response => response.json())
      .then(data => {
        setMovies(data.results);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="movie-list">
          {movies.map(movie => (
            <div key={movie.id} className="movie">
              <Link to={`/movie/${encodeURIComponent(movie.title)}`} className="movie-link">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className="movie-info">
                  <div className="movie-title">{movie.title}</div>
                  <div className="movie-average">⭐{movie.vote_average}</div>
                </div>
                <div className="movie-details">
                <h3>{movie.title}</h3>
                <p className="overview">{movie.overview}</p>
              </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PopularPage;
