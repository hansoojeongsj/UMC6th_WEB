import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const StyledMain = styled.div`
  margin: 0;
  background-color: black;
  color: white;
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 430px) and (max-width: 550px) {
    font-size: 13px;
  }
  @media (min-width: 330px) and (max-width: 430px) {
    font-size: 10px;
  }
  @media (max-width: 330px) {
    font-size: 8px;
  }
`;

const SearchContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SearchTitle = styled.h2`
  color: white;
  margin-bottom: 10px;
  @media (max-width: 430px) {
    font-size: 20px;
  }
`;

const SearchForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
`;

const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  width: 70%;
  max-width: 300px;
  @media (max-width: 430px) {
    font-size: 20px;
    max-width: 60%;
  }
`;

const SearchButton = styled.button`
  padding: 8px 8px;
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #ccc;
  border-radius: 15px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
  @media (max-width: 430px) {
    font-size: 13px;
  }
`;

const ListContainer = styled.div`
  background-color: #1c1c40;
  padding: 10px;
  margin: 40px 240px;
  display: ${({ $show }) => ($show ? 'flex' : 'none')};
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  height: 800px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #1c1c40;
  }

  &::-webkit-scrollbar-thumb {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const LoadingMessage = styled.p`
  color: white;
  font-weight: bold;
`;

const MovieItem = styled.div`
  width: 200px;
  background-color: #2d2d54;
  position: relative;
  cursor: pointer;
  height: 420px;
`;

const MovieImage = styled.img`
  width: 100%;
  height: auto;
`;

const MovieDetails = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${MovieItem}:hover & {
    opacity: 1;
  }
`;

const MovieSmall = styled.span`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
`;

const MovieTitle = styled.div`
  color: white;
  margin: 5px;
  height: 85px;
  font-size: 15px;
  overflow: ${props => (props.overflow === 'true' ? 'auto' : 'inherit')};
`;

const VoteAverage = styled.div`
  color: white;
  margin: 6px;
  font-size: 15px;
`;

const Overview = styled.div`
  font-size: 10px;
  color: white;
  margin-left: 8px;
  margin-right: 8px;
  height: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: -20px;
`;

const MovieLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

function MainPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUserLoading, setIsUserLoading] = useState(true);

  const { username } = useContext(AuthContext);

  useEffect(() => {
    const storedUserId = localStorage.getItem('username');
    if (storedUserId) {
      // setUserId(storedUserId);
    }
    setIsUserLoading(false);
  }, []);

  const debounce = (func, delay) => {
    let debounceTimer;
    return (...args) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = debounce(() => {
    setSearchResults([]);
    setIsLoading(true);
    setError(null);

    if (searchTerm.trim() !== '') {
      const apiKey = '6c60e7f9faa167c5a152da49115e39ee';
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&include_adult=false&language=ko-KR&page=1`;

      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setSearchResults(data.results);
          setShowResults(true);
        })
        .catch(error => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      if (showResults) {
        alert('검색어를 입력해주세요!');
      }
    }
  }, 300);

  const handleChange = event => {
    const value = event.target.value;
    setSearchTerm(value);
    handleSearch();
  };

  return (
    <>
      <StyledMain>
        {isUserLoading ? (
          <LoadingMessage>로딩 중...</LoadingMessage>
        ) : (
          <h1>🎬 {username ? `${username}님, 환영합니다!` : '환영합니다'} 🎬</h1>
        )}
      </StyledMain>
      <SearchContainer>
        <SearchTitle>📽️ Find your movies!</SearchTitle>
        <SearchForm>
          <SearchInput
            overflow={showResults ? 'true' : 'false'}
            id="searchInput"
            type="text"
            onChange={handleChange}
          />
          <SearchButton onClick={handleSearch}>🔍</SearchButton>
        </SearchForm>
      </SearchContainer>
      <ListContainer $show={showResults ? 1 : 0}>
        {isLoading ? (
          <LoadingMessage>데이터를 받아오는 중 입니다</LoadingMessage>
        ) : error ? (
          <p>오류가 발생했습니다: {error.message}</p>
        ) : (
          searchResults.map(movie => (
            <MovieItem key={movie.id}>
              <MovieLink to={`/movie/${movie.id}`}>
                {movie.poster_path && (
                  <MovieImage
                    src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                    alt={movie.title}
                  />
                )}
                <MovieSmall>
                  <MovieTitle overflow={(movie.title.length > 30).toString()}>
                    {movie.title}
                  </MovieTitle>
                  <VoteAverage>⭐{movie.vote_average}</VoteAverage>
                </MovieSmall>
                <MovieDetails>
                  <MovieTitle>{movie.title}</MovieTitle>
                  <Overview>{movie.overview}</Overview>
                </MovieDetails>
              </MovieLink>
            </MovieItem>
          ))
        )}
      </ListContainer>
    </>
  );
}

export default MainPage;
