import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line, Doughnut } from 'react-chartjs-2';
import './App.css';
import './index.css';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    fetchData(); // Initial data fetch
    const interval = setInterval(fetchData, 20000); // Fetch data every 20 seconds
    return () => clearInterval(interval); // Cleanup function to clear the interval
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:5001/api/soilMoistureDB')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handlePagination = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const data1 = {
    labels: data.slice(indexOfFirstItem, indexOfLastItem).map(item => `${item.date} ${item.timestamp}`),
    datasets: [
      {
        label: "Soil Moisture",
        data: data.slice(indexOfFirstItem, indexOfLastItem).map(item => item.soil_moisture),
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Background color for the area below the line
        borderColor: "rgba(75, 192, 192, 1)",       // Line color
        borderWidth: 2,                             // Line width
        pointBackgroundColor: "rgba(75, 192, 192, 1)", // Point color
        pointBorderColor: "#fff",                   // Point border color
        pointHoverBackgroundColor: "#fff",          // Point hover color
        pointHoverBorderColor: "rgba(75, 192, 192, 1)", // Point hover border color
      
      },
    ],
  };
  
  // Example options for the chart
  const options = {
    scales: {
      x: {
        grid: {
          display: false, // Hide the x-axis grid lines
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // Customize the color of the y-axis grid lines
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Soil Moisture Levels", // Chart title
        font: {
          size: 18,
        },
      },
      legend: {
        display: true,
        position: "top", // Position the legend at the top of the chart
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Customize tooltip background color
      },
    },
  };

  // Count the occurrences of each soil status
  const soilStatusCounts = data.reduce((acc, item) => {
    acc[item.soil_status] = (acc[item.soil_status] || 0) + 1;
    return acc;
  }, {});

  const doughnutData = {
    labels: Object.keys(soilStatusCounts),
    datasets: [
      {
        label: 'Soil Status Levels',
        data: Object.values(soilStatusCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', // Status 1
          'rgba(255, 206, 86, 0.6)', // Status 2
          'rgba(75, 192, 192, 0.6)', // Status 3
          // Add more colors as needed
        ],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Soil Status Levels',
      },
    },
  };

  return (
    <div>
      <div className="navbar">
        <div className="logo-container">
          <img src={`${process.env.PUBLIC_URL}/logo1.png`} alt="Logo" className="logo" />
        </div>
        <div className="nav-links">
        </div>
      </div>
      <div className="container">
        <div  className="header" 
          style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/welbg.png'})` }}
        >
          <h1 style={{ marginLeft: '-950px' }}></h1>
          <h1 style={{ marginLeft: '-650px', color: 'green', fontWeight: '900' }}></h1>
          <p> </p>
        </div>
        <div className="card-container">
          <div className="cardS">
            <Line data={data1} options={options} />
          </div>
          <div className="cardS">
            <Doughnut data={doughnutData} options={doughnutOptions} style={{marginLeft: '27%'}}/>
          </div>
          <div className="cardT">
            <table className="table" style={{ width: '90%', margin: '30px auto' }}>
              <thead>
                <tr className="table-header">
                  <th>Date</th>
                  <th>Soil Moisture Level</th>
                  <th>Soil Status</th>
                </tr>
              </thead>
              <tbody>
                {data.slice(indexOfFirstItem, indexOfLastItem).map((item, index) => (
                  <tr key={index}>
                    <td>{new Date(item.timestamp).toLocaleString()}</td>
                    <td>{item.soil_moisture}</td>
                    <td>{item.soil_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="pagination">
              <button
                onClick={() => handlePagination('prev')}
                className="pagination-button"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                onClick={() => handlePagination('next')}
                className="pagination-button"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
