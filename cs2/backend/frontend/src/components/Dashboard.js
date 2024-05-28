import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Gauge from './GaugeChart';
import '../index.css'; 


function Dashboard() {
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
      <div className="container">
        <div 
            className="header" 
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/back.png'})` }}
            >
          <h1 style={{marginLeft:'-950px'}}>Welcome to Our </h1>
          <h1 style={{marginLeft:'-650px', color:'Green', fontWeight:'900'}}>Hydroponics Monitoring System</h1>
          <p>Our hydroponics system allows you to monitor key metrics such as temperature, <br/>pH level, and light intensity to ensure optimal conditions for your plants' growth.</p>
        </div>
        <h1>Hydroponics Monitoring</h1>
        <p>With real-time data tracking, you can stay informed about the health of your plants and make informed decisions to maximize yields and efficiency.</p>
        <div className="card-container">
          <div className="card">
            <h2>Temperature</h2>
            <Gauge value={data.temperature} label="Temperature (%)" />
          </div>
          <div className="card">
            <h2>pH Level</h2>
            <Gauge value={data.ph} label="pH Level (%)" />
          </div>
          <div className="card">
            <h2>Light Intensity</h2>
            <Gauge value={data.light} label="Light Intensity (%)" />
          </div>
        </div>
        <div className="button-container">
          <button onClick={() => alert('Button 1 clicked')}>Button 1</button>
          <button onClick={() => alert('Button 2 clicked')}>Button 2</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
