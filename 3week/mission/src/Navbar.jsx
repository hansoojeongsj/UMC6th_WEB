import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <NavLink exact to="/" className="navbar-title">UMC Movie</NavLink>
      </div>
      <div className="navbar-right">
        <NavLink to="/signup" className="navbar-link">회원가입</NavLink>
        <NavLink to="/popular" className="navbar-link" activeClassName="active">Popular</NavLink>
        <NavLink to="/now-playing" className="navbar-link" activeClassName="active">Now Playing</NavLink>
        <NavLink to="/top-rated" className="navbar-link" activeClassName="active">Top Rated</NavLink>
        <NavLink to="/upcoming" className="navbar-link" activeClassName="active">Upcoming</NavLink>
      </div>
    </div>
  );
}

export default Navbar;
