import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
function PopularPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const fetchMovies = (page) => {
    setLoading(true);
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=6c60e7f9faa167c5a152da49115e39ee&language=ko-KR&page=${page}`)
      .then(response => response.json())
      .then(data => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching movies:', error));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <AppContainer>
      {loading ? (
        <LoadingContainer>
          <LoadingSpinner />
          <p>Loading...</p>
        </LoadingContainer>
      ) : (
        <>
          <MovieList>
            <SmallList>
            {movies.map(movie => (
              <MovieContainer key={movie.id}>
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevClick={handlePrevPage}
            onNextClick={handleNextPage}
          />
        </>
      )}
    </AppContainer>
  );
}

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${props => props.isCurrentPage ? 'white' : 'black'};
  font-size: 20px;
  cursor: pointer;
  margin: 40px;
  color: white;
  font-weight: bold;
`;
const CurrentPage = styled.p`
  color: white;
  margin: 40px;
  font-weight: bold;
  font-size: 20px;

`;
const Pagination = ({ currentPage, totalPages, onPrevClick, onNextClick }) => {
  return (
    <PaginationContainer>
      <PageButton disabled={currentPage === 1} onClick={onPrevClick}>&lt;</PageButton>
      <CurrentPage>{currentPage}</CurrentPage>
      <PageButton disabled={currentPage === totalPages} onClick={onNextClick}>&gt;</PageButton>
    </PaginationContainer>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPrevClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
};
export default PopularPage;
