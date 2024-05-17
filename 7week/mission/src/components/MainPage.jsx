import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledMain = styled.div`
  margin: 0;
  background-color: black;
  color: white;
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const SearchTitle = styled.h2`
  color: white;
  margin-bottom: 10px;
`;

const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  width: 300px;
  max-width: 80%;
`;

const SearchButton = styled.button`
  margin-top: 10px;
  padding: 8px 8px;
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #ccc;
  border-radius: 90px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 25px;
`;

const ListContainer = styled.div`
  background-color: #1c1c40;
  padding: 10px;
  margin: 40px 240px;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  height: 800px;
  overflow-y: auto;
  
  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background:#1c1c40;
  }

  &::-webkit-scrollbar-thumb {
    background:  #f1f1f1;
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
  overflow: ${({ overflow }) => (overflow ? 'auto' : 'inherit')};
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
  const [debounceTimer, setDebounceTimer] = useState(null);

  const debounce = (func, delay) => {
    clearTimeout(debounceTimer);
    const timer = setTimeout(() => {
      func();
      setDebounceTimer(null);
    }, delay);
    setDebounceTimer(timer);
  };

const handleSearch = () => {
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
    // 검색어가 비어있을 때만 알림을 표시합니다.
    if (showResults) {
      alert('검색어를 입력해주세요!');
    }
  }
};

  const handleChange = event => {
    const value = event.target.value;
    setSearchTerm(value);
    debounce(handleSearch, 300); 
  };

  return (
    <>
      <StyledMain>
        <h1>🎬환영합니다🎬</h1>
      </StyledMain>
      <SearchContainer>
        <SearchTitle>📽️ Find your movies!</SearchTitle>
        <div>
        <SearchInput overflow={showResults ? 'true' : 'false'} 
        id="searchInput" 
        type="text"
        onChange={handleChange} />
          <SearchButton onClick={handleSearch}>🔍</SearchButton>
        </div>
      </SearchContainer>
      <ListContainer show={showResults ? 1 : 0}>
        {isLoading ? (
          <LoadingMessage>데이터를 받아오는 중 입니다</LoadingMessage>
        ) : error ? (
          <p>오류가 발생했습니다: {error.message}</p>
        ) : (
          searchResults.map(movie => (
            <MovieItem key={movie.id}>
              <MovieLink to={`/movie/${movie.id}`}>
                {movie.poster_path && (
                  <MovieImage src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
                )}
                <MovieSmall>
                  <MovieTitle overflow={movie.title.length > 30}>{movie.title}</MovieTitle>
                  <VoteAverage>⭐{movie.vote_average}</VoteAverage>
                </MovieSmall>
                <MovieDetails>
                  <MovieTitle >{movie.title}</MovieTitle>
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
