import React from 'react';
import logo from '../logo.jpg';
import { ArrowRight, PersonCircle } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import './Header.css';
import '../styles.css'

const Header = () => {

  const handleLogOut = () => {
    //TODO handle logout
  };

  return (
    <header className="app-header">
      <Link to="/home">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <h1 className="app-name">BookWorm</h1>
      <div className="header-button-group">
        <button className="profile-button" onClick={handleLogOut}>
          <PersonCircle className="profile-icon" />
        </button>
        <button className="arrow-button" onClick={handleLogOut}>
          <ArrowRight className="arrow-icon" />
        </button> 
      </div>
    </header>
  );
}

export default Header;
