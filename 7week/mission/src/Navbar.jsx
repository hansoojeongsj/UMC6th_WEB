import { useState, useContext, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
`;

const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
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
  
  @media (max-width: 800px) {
    display: none;
  }
`;

const SidebarToggle = styled.button`
  display: none;
  @media (max-width: 800px) {
    display: block;
    background: transparent;
    border: none;
    color: white;
    font-size: 30px;
    cursor: pointer;
    margin-right: 15px;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: ${(props) => (props.active ? 'yellow' : 'white')};
  font-size: 16px;
  text-decoration: none;
  margin: 20px;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  &:hover {
    font-weight: bold;
  }
  @media (max-width: 900px) {
    margin: 15px;
  }
  @media (max-width: 800px) {
    margin: 25px;
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
  text-align: left;

  &:hover {
    font-weight: bold;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const Sidebar = styled.div.attrs(() => ({ role: 'sidebar' }))`
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  position: fixed;
  top: 10vh;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgb(9, 9, 52);
  padding-left: 20px;
  transform: ${(props) => (props.open ? 'translateX(0)' : 'translateX(100%)')};
  animation: ${(props) => (props.open ? slideIn : slideOut)} 0.3s forwards;
  z-index: 1000;
`;

function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Initial state set to false
  const location = useLocation();

  const handleSidebarToggle = () => setSidebarOpen(prevState => !prevState); // Toggle the sidebar state

  const handleSidebarLinkClick = () => setSidebarOpen(false);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [sidebarOpen]);

  return (
    <>
      <NavbarContainer>
        <NavbarLeft>
          <NavbarTitle to="/">UMC Movie</NavbarTitle>
        </NavbarLeft>
        <NavbarRight>
          {isLoggedIn ? (
            <LogoutButton onClick={logout}>로그아웃</LogoutButton>
          ) : (
            <>
              <StyledNavLink active={location.pathname === '/login' ? 'true' : undefined} to="/login">로그인</StyledNavLink>
              <StyledNavLink active={location.pathname === '/signup' ? 'true' : undefined} to="/signup">회원가입</StyledNavLink>
            </>
          )}
          <StyledNavLink active={location.pathname === '/popular' ? 'true' : undefined} to="/popular">Popular</StyledNavLink>
          <StyledNavLink active={location.pathname === '/now-playing' ? 'true' : undefined} to="/now-playing">Now Playing</StyledNavLink>
          <StyledNavLink active={location.pathname === '/top-rated' ? 'true' : undefined} to="/top-rated">Top Rated</StyledNavLink>
          <StyledNavLink active={location.pathname === '/upcoming' ? 'true' : undefined} to="/upcoming">Upcoming</StyledNavLink>
        </NavbarRight>
        <SidebarToggle onClick={handleSidebarToggle}>
          ☰
        </SidebarToggle>
      </NavbarContainer>
      <Sidebar open={sidebarOpen}>
        {isLoggedIn ? (
          <LogoutButton onClick={() => { logout(); handleSidebarLinkClick(); }}>로그아웃</LogoutButton>
        ) : (
          <>
            <StyledNavLink active={location.pathname === '/login' ? 'true' : undefined} to="/login" onClick={handleSidebarLinkClick}>로그인</StyledNavLink>
            <StyledNavLink active={location.pathname === '/signup' ? 'true' : undefined} to="/signup" onClick={handleSidebarLinkClick}>회원가입</StyledNavLink>
          </>
        )}
        <StyledNavLink active={location.pathname === '/popular' ? 'true' : undefined} to="/popular" onClick={handleSidebarLinkClick}>Popular</StyledNavLink>
        <StyledNavLink active={location.pathname === '/now-playing' ? 'true' : undefined} to="/now-playing" onClick={handleSidebarLinkClick}>Now Playing</StyledNavLink>
        <StyledNavLink active={location.pathname === '/top-rated' ? 'true' : undefined} to="/top-rated" onClick={handleSidebarLinkClick}>Top Rated</StyledNavLink>
        <StyledNavLink active={location.pathname === '/upcoming' ? 'true' : undefined} to="/upcoming" onClick={handleSidebarLinkClick}>Upcoming</StyledNavLink>
      </Sidebar>
    </>
  );
}

export default Navbar;