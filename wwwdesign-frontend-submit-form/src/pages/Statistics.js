import React, { useState } from 'react';
import {Chart, ArcElement, Tooltip, Legend} from "chart.js";
import './Statistics.css'
import TopGenreDoughnut from '../components/charts/TopGenreDoughnut';

const Statistics = () => {
    Chart.register(ArcElement, Tooltip, Legend);
    const [selectedStat, setSelectedStat] = useState(null);

    const statsData = {
        avgPages: 450,
        favoriteGenre: 'Mystery',
        topGenres: ''
        // Add more statistics as needed
    };

    const readingData = {
        favoriteGenres: [
            { genre: 'Science Fiction', count: 10 },
            { genre: 'Mystery', count: 8 },
            { genre: 'Fantasy', count: 6 },
        ],
        averagePagesRead: 250,
    };

    const renderStatisticDetails = () => {
        switch (selectedStat) {
          case 'avgPages':
            return <p>Avg Number of Pages: {readingData.averagePagesRead}</p>;
          case 'favoriteGenre':
            return <p>Favorite Genre: Mystery</p>;
          case 'topGenres':
            return <TopGenreDoughnut />
          default:
            return null;
        }
    };
    
    const handleStatButtonClick = (stat) => {
        setSelectedStat(stat);
    };

    const renderButtons = () => {
        const statButtons = Object.keys(statsData).map((stat) => (
          <button
            key={stat}
            className={`btn ${selectedStat === stat ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleStatButtonClick(stat)}
          >
            {stat}
          </button>
        ));
    
        return <div className="button-grid">{statButtons}</div>;
    };

    return (
        <div className="stats-container content">
          {renderButtons()}
          <div className="chart-container">
            
            <div className="favorite-genres">
              {renderStatisticDetails()}
            </div>
          </div>
        </div>
      );
}

export default Statistics;

