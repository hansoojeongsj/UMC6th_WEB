import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const MovieDetailContainer = styled.div`
  margin: 3% 15% 5% 20%;
  color: white;
  display: flex;
  justify-content: space-between;
  background-position: center;
  padding: 20px;
`;

const MovieImage = styled.img`
  width: 300px;
  height: auto;
`;

const MovieText = styled.div`
  width: 80%;
  height: auto;
  margin-left: 25px;
`;
const Loading = styled.div`
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin: 0 auto;
`

const calculateStars = (rating) => {
  const maxStars = 10;
  const floorRating = Math.floor(rating);
  const stars = [];
  for (let i = 0; i < maxStars; i++) {
    if (i < floorRating) {
      stars.push('⭐');
    }
  }
  return stars;
};

function MovieDetailPage() {
  const { movieTitle } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=6c60e7f9faa167c5a152da49115e39ee&query=${encodeURIComponent(movieTitle)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        // API에서는 영화 검색 결과가 배열로 반환되므로 첫 번째 결과를 사용합니다.
        const movieData = data.results[0];
        setMovie(movieData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieTitle]);

  if (loading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <MovieDetailContainer>
      <div>
        <MovieImage src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie && movie.title} />
      </div>
      <div>
        <MovieText>
          <h2>{movie.title}</h2>
          <h3>평점 {movie && calculateStars(movie.vote_average)}</h3>
          <h3>개봉일  {movie && movie.release_date}</h3>
          <h3>줄거리</h3>
          {movie && movie.overview ? <p>{movie.overview}</p> : <p>TMDB에서 제공하는 API에 상세 줄거리 정보가 없습니다.</p>}
        </MovieText>
      </div>
    </MovieDetailContainer>
  );
}

export default MovieDetailPage;
