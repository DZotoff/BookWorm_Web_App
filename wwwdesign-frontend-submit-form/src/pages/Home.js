import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Home = () => {
  const navigate = useNavigate();

  const handleNewBookClick = () => {
    navigate('/new-book');
  };

  const handleReadingStatsClick = () => {
    navigate('/statistics');
  };

  return (
    <div className="content">
      <h1>Welcome to the Bookstore</h1>
      <button type="button" onClick={handleNewBookClick}>
            Create New Book
      </button>
      <button type="button" onClick={handleReadingStatsClick}>
            View Reading Stats
      </button>
    </div>
  );
};

export default Home;
