import React, { useState, useEffect } from 'react';
import './yunji.css';
import logo from './assets/polilogo.png';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import { useNavigate } from 'react-router-dom';

const Yunji = () => {
  const [message, setMessage] = useState(''); // 메시지 상태
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 767);
  const navigate = useNavigate();

  const handleButtonClick = (text) => {
    setMessage(text); // 선택된 텍스트 상태 업데이트
  };

  const handleResize = () => {
    setIsMobileView(window.innerWidth < 767);
  };

  const handleHomeClick = () => {
    navigate('/'); // "/" 경로로 이동
  };
  const handlePositionClick = () => {
    navigate('/select-region'); // "/" 경로로 이동
  };
  const handlePoliticianClick = () => {
    navigate('/'); // "/" 경로로 이동
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="app">
      <div className="header">
        <div className="logo-container">
          <img src={logo} alt="PoliTracker Logo" className="poliLogo" />
        </div>
        <div className="menu">
        <button onClick={handlePositionClick}>구</button> {/* onClick 이벤트 추가 */}
          <button onClick={handlePoliticianClick}>정치구</button> {/* onClick 이벤트 추가 */}
          <button onClick={handleHomeClick}>Home</button> {/* onClick 이벤트 추가 */}
        </div>
      </div>
      
      <div className={`main-content ${isMobileView ? "stacked" : "side-by-side"}`}>
        <LeftPanel handleButtonClick={handleButtonClick} />
        <RightPanel handleButtonClick={handleButtonClick} message={message} />
      </div>
    </div>
  );
};

export default Yunji;