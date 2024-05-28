import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'; 

function About() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0); // State to track current card index

  // Function to navigate to the next card
  const goToNextCard = () => {
    setCurrentIndex(currentIndex + 1);
  };

  // Function to navigate to the previous card
  const goToPreviousCard = () => {
    setCurrentIndex(currentIndex - 1);
  };

  // Define the card data
  const cardData = [
    {
      title: "Hydroponics Monitoring System",
      content: "Our Hydroponics Monitoring System is designed to provide real-time monitoring and control of various parameters critical for the optimal growth of plants. These parameters include pH level, temperature, and light intensity. By continuously monitoring these factors, the system ensures that the plants are always in the ideal growing conditions.",
      image: `${process.env.PUBLIC_URL}/system.jpg`
    },
    {
      title: "What is Hydroponics?",
      content: "Hydroponics is a method of growing plants without soil by using mineral nutrient solutions in an aqueous solvent. This method allows plants to grow faster and more efficiently by providing all the essential nutrients directly to their roots.",
      image: `${process.env.PUBLIC_URL}/hyroponics.jpg`
    },
    {
      title: "Importance of pH Level",
      content: " pH is a measure of how acidic/basic water is. The range goes from 0 - 14, with 7 being neutral. pHs of less than 7 indicate acidity, whereas a pH of greater than 7 indicates a base. The pH level of the nutrient solution is crucial for plant health. It affects the availability of nutrients to the plants. A pH level that is too high or too low can lead to nutrient deficiencies or toxicities. For most hydroponic plants, the ideal pH range is between 5.5 and 6.5.",
      image: `${process.env.PUBLIC_URL}/ph.jpg`
    },
    {
      title: "Temperature Control",
      content: "Temperature is another vital factor in hydroponic systems. Plants have an optimal temperature range for growth, usually between 18°C and 26°C (65°F and 79°F). Keeping the temperature within this range helps to ensure healthy plant development and prevents issues such as root diseases.",
      image: `${process.env.PUBLIC_URL}/temp.jpg`
    },
    {
      title: "Light Intensity",
      content: "Light intensity is essential for photosynthesis, the process by which plants convert light energy into chemical energy. Adequate light ensures that plants can produce the energy they need to grow. Different plants require different light intensities, so it's important to tailor the lighting to the specific needs of the plants being grown.",
      image: `${process.env.PUBLIC_URL}/light.jpg`
    },
    {
      title: "Why Monitoring is Important",
      content: "Monitoring these parameters ensures that plants receive optimal conditions for growth. It helps in early detection of any issues, allowing for prompt corrective actions. This leads to healthier plants, higher yields, and more efficient resource use. By automating the monitoring process, our system reduces the need for manual checks and minimizes the risk of human error.",
      image: `${process.env.PUBLIC_URL}/hyroponics.jpg`
    },
  ];
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
      <div className="about-container">
        <h1>About Hydroponics Monitoring System</h1>
        <div className="cardA">
          <div className="cardA-content">
            <h2>{cardData[currentIndex].title}</h2>
            <p>{cardData[currentIndex].content}</p>
          </div>
          <div className="cardA-image">
            <img src={cardData[currentIndex].image} alt={cardData[currentIndex].title} />
            <div className="cardA-buttons">
              {currentIndex !== 0 && (
                <div className="arrow-button" onClick={goToPreviousCard}>{'<'}</div>
              )}
              {currentIndex !== cardData.length - 1 && (
                <div className="arrow-button" onClick={goToNextCard}>{'>'}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
