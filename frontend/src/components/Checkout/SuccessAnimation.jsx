import React from 'react';
import './SuccessAnimation.css'; // We will create this CSS file next

const SuccessAnimation = () => {
  return (
    <div className="success-overlay">
      <div className="success-circle-expander"></div>
      <div className="success-icon-container">
        <svg
          className="success-tick"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className="success-tick-circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className="success-tick-check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
      </div>
    </div>
  );
};

export default SuccessAnimation;