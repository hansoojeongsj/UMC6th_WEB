import './PopularPage.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundTitle = styled.div`
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin: 0 auto;
  padding-top: 30px;
`;

const NotFoundText = styled.div`
  margin-bottom: 30px;
  font-style: italic;
`;

const MainLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: lighter;
  font-size: 25px;
`;

function NotFound() {
  return (
    <div>
      <NotFoundTitle>
        <h1>Oops!</h1>
        <h3>예상치 못한 에러가 발생했습니다.</h3>
        <NotFoundText>Not Found</NotFoundText>
        <MainLink to={`/`}>
          👉메인으로 이동하기👈
        </MainLink>
      </NotFoundTitle>
    </div>
  );
}

export default NotFound;
