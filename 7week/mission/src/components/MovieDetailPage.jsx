import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const MovieDetailContainer = styled.div`
  margin: 3% 15% 5% 20%;
  color: white;
  display: flex;
  background-position: center;
  padding: 20px;

`;

const MovieImage = styled.img`
  width: 300px;
  height: auto;
`;

const MovieText = styled.div`
  height: auto;
  margin-left: 25px;
`;

const Loading = styled.div`
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin: 0 auto;
`;

const Cast = styled.div`
  color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
`;

const CastMember = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
  width: 100px;
`;

const CastImage = styled.img`
  width: 70px;
  height: auto;
  margin-bottom: 8px;
  border-radius: 50%;
`;
const NoImageSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s';

const CastName = styled.p`
  margin: 0;
`;

const CastTitle = styled.p`
  color: white;
  font-weight: bold;
  font-size: 30px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;

  align-items: center;
`;

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
  const { movieId } = useParams(); // movieId로 수정

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=6c60e7f9faa167c5a152da49115e39ee&language=ko-KR`);
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        
        setMovie(data);
        setLoading(false);
        // 출연진 정보 가져오기
        const castResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=6c60e7f9faa167c5a152da49115e39ee`);
        const castData = await castResponse.json();
        setCast(castData.cast);

        // 감독진 정보 가져오기
        const crewResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=6c60e7f9faa167c5a152da49115e39ee`);
        const crewData = await crewResponse.json();
        setCrew(crewData.crew);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <>
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
          {movie.overview ? <p>{movie.overview}</p> : <p>TMDB에서 제공하는 API에 상세 줄거리 정보가 없습니다.</p>}
        </MovieText>
        </div>
      </MovieDetailContainer>
      <CastTitle>출연진 및 제작진</CastTitle>
      <Cast>
        {crew.filter(member => member.job === 'Director' || member.job === 'Writer').map(member => (
          <CastMember key={member.id}>
            <CastImage src={member.profile_path ? `https://image.tmdb.org/t/p/w500${member.profile_path}` : NoImageSrc} alt={`${member.name}의 프로필 사진`} />
            <CastName>{member.name}</CastName>
            <CastName>{member.job}</CastName>
          </CastMember>
        ))}
        {cast.map(actor => (
          <CastMember key={actor.id}>
            <CastImage src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : NoImageSrc} alt={`${actor.name}의 프로필 사진`} />
            <CastName>{actor.name}</CastName>
            <CastName>Acting</CastName>

          </CastMember>
        ))}
      </Cast>
    </>
  );
}

export default MovieDetailPage;
