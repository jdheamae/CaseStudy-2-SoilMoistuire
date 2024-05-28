import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto'; 
import 'chartjs-plugin-datalabels'; 
import '../index.css'; 
import { Bar } from 'react-chartjs-2';

function Monitor() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  // Sample data for the bar chart
  const chartData = {
    labels: ['Jun', 'Jul', 'Aug'], // diri ang date og time
    datasets: [
      {
        label: 'Temperature', 
        backgroundColor: 'rgba(255, 99, 132, 0.2)', 
        borderColor: 'rgb(255, 99, 132)', 
        borderWidth: 1, // Border width of bars
        data: [25, 26, 27], 
      },
      {
        label: 'pH Level', // Label for the dataset
        backgroundColor: 'rgba(54, 162, 235, 0.2)', 
        borderColor: 'rgb(54, 162, 235)', 
        borderWidth: 1, 
        data: [6.5, 6.6, 6.7], // Sample data for pH level (replace with actual data)
      },
      {
        label: 'Light Intensity', 
        backgroundColor: 'rgba(255, 205, 86, 0.2)', 
        borderColor: 'rgb(255, 205, 86)', 
        borderWidth: 1, 
        data: [800, 850, 900], // Sample data for light intensity (replace with actual data)
      },
    ],
  };
  const options = {
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter: (value, context) => {
          return value; // Display value on top of each bar
        },
      },
    },
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const handlePagination = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <div className="navbar">
        <div className="logo-container">
          <img src={`${process.env.PUBLIC_URL}/logo1.png`} alt="Logo" className="logo" />
        </div>
        <div className="nav-links">
          <span onClick={() => navigate('/dashboard')} className="nav-link">Home</span>
          <span onClick={() => navigate('/monitor')} className="nav-link">Monitor</span>
          <span onClick={() => navigate('/about')} className="nav-link">About</span>
        </div>
      </div>
      <div className="container" style={{marginBottom:'30px'}}>
          <h1 style={{marginLeft:'-52%', color:'Green', fontWeight:'900'}}>Hydroponics Monitoring System</h1>
          <p style={{marginLeft:'-58%',fontWeight:'900'}}>Our hydroponics system allows you to monitor key metrics such as temperature, <br/>pH level, and light intensity to ensure optimal conditions for your plants' growth.</p>
        <div className="card-container" style={{ marginBottom:'30px'}}>
          <div className="card" style={{height:'420px', padding:'20px'}}>
            <h5>History</h5>
            <div className="chart-container">
              <Bar data={chartData} options={options} /> {/* Use Bar from react-chartjs-2 */}
            </div>
          </div>
        </div>

        <div className="card-container" style={{ marginTop:'-80px' }}>
          <div className="card" style={{height:'520px', padding:'20px'}}>
            <table className="table" style={{ width: '100%' }}>
              <thead>
                <tr className="justify-content-center">
                    <th>Date</th>
                    <th>Time</th>
                    <th>Temperature</th>
                    <th>pH Level</th>
                    <th>Light Intensity</th>
                </tr>
              </thead>
              <tbody className="justify-content-center">
                  <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
              </tbody>
            </table>
            {/* Pagination */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                    key={index}
                    onClick={() => handlePagination(index + 1)}
                    className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'} btn-sm mx-1`}
                    >
                    {index + 1}
                    </button>
                ))}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Monitor;
