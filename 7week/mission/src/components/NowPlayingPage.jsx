import { useState, useEffect } from 'react';
import './PopularPage.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AppContainer = styled.div`
  background-color: rgb(9, 9, 52);
  
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingSpinner = styled.div`
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-left-color: #2f80ed;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
`;

const MovieList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* 왼쪽에서부터 정렬 */
`;

const MovieContainer = styled.div`
  position: relative;
  display: inline-block;
  margin: 14.5px;
  background-color: rgb(48, 48, 82);
  border-radius: 3px;
  width: 180px;
  height: 360px;
  justify-content: left;
`;

const MovieLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const MovieImage = styled.img`
  width: 180px;
  height: auto;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const MovieInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;

const MovieTitle = styled.div`
  font-size: 12px;
  color: white;
  font-weight: bold;
  white-space: wrap;
`;

const MovieDetails = styled.div`
  position: absolute;
  font-size: 12px;
  top: 0;
  left: 0;
  width: 160px;
  height: 340px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${MovieContainer}:hover & {
    opacity: 1;
  }
`;

const Overview = styled.div`
  font-size: 10px;
`;
const MovieVote = styled.div`
  font-size: 12px;
  color: white;
  font-weight: bold;`;
const SmallList= styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
function NowPlayingPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchMovies = () => {
    setLoading(true); // 데이터를 가져오는 중임을 표시합니다.
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=6c60e7f9faa167c5a152da49115e39ee&language=ko-KR&page=${page}`)
      .then(response => response.json())
      .then(data => {
        setMovies(prevMovies => [...prevMovies, ...data.results]);
        setLoading(false); // 데이터를 모두 받아온 후 로딩 상태를 false로 변경합니다.
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
        setLoading(false); // 에러 발생 시에도 로딩 상태를 false로 변경합니다.
      });
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      setLoading(true); // 스크롤 이벤트 발생 시 로딩 중임을 표시합니다.
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AppContainer>
      <MovieList>
        <SmallList>
        {movies.map((movie, index) => (
          <MovieContainer key={`${movie.id}-${index}`}>
            <MovieLink to={`/movie/${encodeURIComponent(movie.id)}`}>
              <MovieImage src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.id} />
              <MovieInfo>
                <MovieTitle>{movie.title}</MovieTitle>
                <MovieVote>⭐{movie.vote_average}</MovieVote>
              </MovieInfo>
              <MovieDetails>
                <h3>{movie.title}</h3>
                <Overview>{movie.overview}</Overview>
              </MovieDetails>
            </MovieLink>
          </MovieContainer>
        ))}
        </SmallList>
      </MovieList>
      {loading && (
        <LoadingContainer>
          <LoadingSpinner />
          <p>Loading...</p>
        </LoadingContainer>
      )}
    </AppContainer>
  );
}

export default NowPlayingPage;
