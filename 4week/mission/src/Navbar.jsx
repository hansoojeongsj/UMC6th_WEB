import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

// Navbar 컴포넌트의 스타일링된 컴포넌트 생성
const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
  height: 10vh;
`;

const NavbarTitle = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-size: 30px;
  font-weight: bold;
  margin: 15px;
  
`;

const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  height: 10vh;
`;

const NavbarLink = styled(NavLink)`
  color: white;
  font-size: 16px;
  text-decoration: none;
  margin: 20px;
  &:hover {
    transform: scale(1.05);
    font-weight: bold;
  }
`;

const NavbarLoginButton = styled.button`
  color: white;
  background: none;
  font-size: 16px;
  border: none;
  margin: 20px;

  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    font-weight: bold;
  }
`;

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <NavbarContainer>
      <NavbarLeft>
        <NavbarTitle exact to="/">UMC Movie</NavbarTitle>
      </NavbarLeft>
      <NavbarRight>
        <NavbarLoginButton onClick={handleLoginToggle}>
          {isLoggedIn ? '로그아웃' : '로그인'}
        </NavbarLoginButton>
        <NavbarLink to="/popular" activeClassName="active">Popular</NavbarLink>
        <NavbarLink to="/now-playing" activeClassName="active">Now Playing</NavbarLink>
        <NavbarLink to="/top-rated" activeClassName="active">Top Rated</NavbarLink>
        <NavbarLink to="/upcoming" activeClassName="active">Upcoming</NavbarLink>
      </NavbarRight>
    </NavbarContainer>
  );
}

export default Navbar;
