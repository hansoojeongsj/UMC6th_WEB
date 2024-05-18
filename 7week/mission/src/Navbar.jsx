import { useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

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

const StyledNavLink = styled(NavLink)`
  color: white;
  font-size: 16px;
  text-decoration: none;
  margin: 20px;
  &:hover {
    transform: scale(1.05);
    font-weight: bold;
  }
`;

const LogoutButton = styled.button`
  color: white;
  font-size: 16px;
  text-decoration: none;
  background-color: transparent;
  border: none;
  margin: 20px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    font-weight: bold;
  }
`;

function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <NavbarContainer>
      <NavbarLeft>
        <NavbarTitle to="/">UMC Movie</NavbarTitle>
      </NavbarLeft>
      <NavbarRight>
        {isLoggedIn ? (
          <LogoutButton onClick={logout}>로그아웃</LogoutButton>
        ) : (
          <>
            <StyledNavLink to="/login">로그인</StyledNavLink>
            <StyledNavLink to="/signup">회원가입</StyledNavLink>
          </>
        )}
        <StyledNavLink to="/popular">Popular</StyledNavLink>
        <StyledNavLink to="/now-playing">Now Playing</StyledNavLink>
        <StyledNavLink to="/top-rated">Top Rated</StyledNavLink>
        <StyledNavLink to="/upcoming">Upcoming</StyledNavLink>
      </NavbarRight>
    </NavbarContainer>
  );
}

export default Navbar;
