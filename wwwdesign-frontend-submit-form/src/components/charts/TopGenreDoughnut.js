import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const TopGenreDoughnut = () => {
    const readingData = {
        favoriteGenres: [
            { genre: 'Science Fiction', count: 10 },
            { genre: 'Mystery', count: 8 },
            { genre: 'Fantasy', count: 6 },
        ],
        averagePagesRead: 250,
    };

    const favoriteGenresData = {
        labels: readingData.favoriteGenres.map((genreData) => genreData.genre),
        datasets: [
            {
            data: readingData.favoriteGenres.map((genreData) => genreData.count),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const doughnutOptions = {
        tooltips: {
            callbacks: {
                label: (tooltipItem, data) => {
                const label = data.labels[tooltipItem.index];
                const value = data.datasets[0].data[tooltipItem.index];
                return `${label}: ${value}`;
                },
            },
        },
        legend: {
            display: true,
            position: 'top', 
        },
    }

    return <Doughnut data={favoriteGenresData} options={doughnutOptions} />
}

export default TopGenreDoughnut;