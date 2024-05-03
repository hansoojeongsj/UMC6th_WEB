import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

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

function Navbar() {
  return (
    <NavbarContainer>
      <NavbarLeft>
        <NavbarTitle to="/">UMC Movie</NavbarTitle>
      </NavbarLeft>
      <NavbarRight>
        <StyledNavLink to="/signup">회원가입</StyledNavLink>
        <StyledNavLink to="/popular">Popular</StyledNavLink>
        <StyledNavLink to="/now-playing">Now Playing</StyledNavLink>
        <StyledNavLink to="/top-rated">Top Rated</StyledNavLink>
        <StyledNavLink to="/upcoming">Upcoming</StyledNavLink>
      </NavbarRight>
    </NavbarContainer>
  );
}

export default Navbar;
