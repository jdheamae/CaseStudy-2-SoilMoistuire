// GaugeChart.js
import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

const Gauge = ({ value, label }) => {
  return (
    <div style={{ width: '200px', height: '400px', marginLeft:'15px', marginTop:'20px', textAlign: 'center' }}>
      <ReactSpeedometer
        value={value}
        maxValue={100}
        segments={4}
        needleColor="red"
        startColor="green"
        endColor="red"
        textColor="black"
        customSegmentStops={[0, 25, 50, 75, 100]}
        customSegmentLabels={[
          {
            text: "Very Low",
            position: "INSIDE",
            color: "#555",
            fontSize: "14px",
          },
          {
            text: "Low",
            position: "INSIDE",
            color: "#555",
            fontSize: "14px",
          },
          {
            text: "Medium",
            position: "INSIDE",
            color: "#555",
            fontSize: "14px",
          },
          {
            text: "High",
            position: "INSIDE",
            color: "#555",
            fontSize: "14px",
          },
        ]}
        ringWidth={50}
        needleTransitionDuration={4000}
        needleTransition="easeElastic"
        valueTextFontSize="19px"
        currentValueText={`${value}%`}
      />
      <div style={{ marginTop: '-80px' }}>{label}</div>
    </div>
  );
};

export default Gauge;
