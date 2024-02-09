import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto'; // Dodajte ovu liniju

const StatisticsComponent = () => {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/articles/statistics', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, []);

  if (!statistics) {
    return <div>Loading...</div>;
  }

  const { totalResearchers, totalArticles, authorsWithArticleCount, articlesWithCitationsCount } = statistics;

  // Data for the first chart (Authors and their article counts)
  const authorsData = {
    labels: authorsWithArticleCount.map((author) => author.name),
    datasets: [
      {
        label: 'Number of Articles',
        data: authorsWithArticleCount.map((author) => author.articles_count),
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  // Data for the second chart (Articles and their citation counts)
  const articlesData = {
    labels: articlesWithCitationsCount.map((article) => article.title),
    datasets: [
      {
        label: 'Number of Citations',
        data: articlesWithCitationsCount.map((article) => article.comments_count),
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Statistics</h2>
        <div>
          <p>Total Researchers: {totalResearchers}</p>
          <p>Total Articles: {totalArticles}</p>
        </div>
      </div>
      <div className="card">
        <h3>Authors and their Article Counts</h3>
        <div className="chart-container">
          <Bar data={authorsData} />
        </div>
      </div>
      <div className="card">
        <h3>Articles and their Citation Counts</h3>
        <div className="chart-container">
          <Bar data={articlesData} />
        </div>
      </div>
    </div>
  );
  
};

export default StatisticsComponent;
