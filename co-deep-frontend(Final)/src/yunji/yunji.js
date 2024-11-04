import React, { useState, useEffect } from 'react';
import './yunji.css';
import logo from './assets/polilogo.png';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

const Yunji = () => {
  const [message, setMessage] = useState('');
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 767);

  const handleButtonClick = (text) => {
    setMessage(text);
  };

  const handleResize = () => {
    setIsMobileView(window.innerWidth < 767);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="app">
      <div className="header">
        <img src={logo} alt="PoliTracker Logo" className="poliLogo" />
        <h1>PoliTracker</h1>
        <div className="menu">
          <button>Home</button>
        </div>
      </div>
      <div className={`main-content ${isMobileView ? "stacked" : "side-by-side"}`}>
        <LeftPanel handleButtonClick={handleButtonClick} />
        <RightPanel handleButtonClick={handleButtonClick} />
      </div>
      <div className="message">
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Yunji;