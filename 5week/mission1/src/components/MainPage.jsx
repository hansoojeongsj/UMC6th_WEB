import styled from 'styled-components';
import { useState } from 'react';


const StyledMain = styled.div`
  margin: 0;
  background-color: black;
  color: white;
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */

  h1 {
    text-align: center; /* 텍스트를 가운데 정렬 */
  }
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
  margin-top: 40px;
  margin-left: 240px;
  margin-right: 240px;
  display: ${({ show }) => (show ? 'flex' : 'none')}; /* 검색 결과가 있을 때만 표시 */
  overflow-x: auto;
  height: 700px;
  /* 스크롤바 스타일 */
  scrollbar-width: thin;
  scrollbar-color: #bdbde9 #1c1c40; /* thumb color track color */
`;

const MovieItem = styled.li`
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 20px;
  width: 200px;
  background-color: #2d2d54;
  position: relative; /* 마우스 호버 시 내용을 표시하기 위해 상대 위치 지정 */
  cursor: pointer;
  
`;

const MovieImage = styled.img`
  width: 100%;
  height: auto;
`;

const MovieDetails = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
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
  width: 200px;
  height: 80px;
  margin-bottom: 20px;
  background-color: rgb(48, 48, 82);
  display: flex;
  justify-content: space-between;
`;

const MovieTitle = styled.div`
  color: white;
  margin: 6px;
  height: 85px; 
  font-size: 15px ;
`;

const VoteAverage = styled.div`
  color: white;
  margin: 6px;
  font-size: 15px ;

`;
const Overview = styled.p`
  font-size: 10px;
  color: white;
  margin: 10px;
`;

function MainPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false); // 검색 결과 표시 여부 상태 추가

  const handleSearch = () => {
    setSearchResults([]);
    const searchTerm = document.getElementById('searchInput').value;
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
          setShowResults(true); // 검색 결과가 있을 때만 표시
        })
        .catch(error => {
          console.error('There was a problem with your fetch operation:', error);
        });
    } else {
      alert('검색어를 입력해주세요!');
    }
  };

  return (
    <>
      <StyledMain>
        <h1>🎬환영합니다🎬</h1>
      </StyledMain>
      <SearchContainer>
        <SearchTitle>📽️ Find your movies!</SearchTitle>
        <div>
          <SearchInput id="searchInput" type="text" />
          <SearchButton onClick={handleSearch}>🔍</SearchButton>
        </div>
      </SearchContainer>
      <ListContainer show={showResults}>
        <ul>
          {searchResults.map(movie => (
            <MovieItem key={movie.id}>
              <MovieImage src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />

              <MovieSmall>
              <MovieTitle overflow={movie.title.length > 30}>{movie.title}</MovieTitle>
              <VoteAverage>⭐{movie.vote_average}</VoteAverage>
              </MovieSmall>
              <MovieDetails>
                <MovieTitle>{movie.title}</MovieTitle>
                <Overview>{movie.overview}</Overview>
              </MovieDetails>
            </MovieItem>
          ))}
        </ul>
      </ListContainer>
    </>
  );
}

export default MainPage;
