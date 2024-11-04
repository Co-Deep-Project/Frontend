// App.js
import React, { useState, useEffect } from 'react';
import './yunji.css';
import logo from './assets/polilogo.png';

// Left side profile card and action status buttons
const LeftPanel = () => (
  <div className="left-panel">
    <div className="profile-card">
      <div className="profile-header">
        <h1>Anindita Rahmawati</h1>
        <h2><img src={logo} alt="PoliTracker logo" className="flag-icon"/> Indonesia</h2>
      </div>
      <div className="profile-content">
        <p>Biography</p>
        <p>Age: 27</p>
        <p>Born: 13-05-1996</p>
        <p>From: Yogyakarta</p>
        <p>Works: Yes</p>
      </div>
    </div>
    <div className="action-cards">
      <div className="action-card green">01 완료</div>
      <div className="action-card yellow">02 이행중</div>
      <div className="action-card red">03 이행하지 못한 것</div>
    </div>
  </div>
);

// Right side category and timeline sections
const RightPanel = () => (
  <div className="right-panel">
    <div className="category">
      <h3 className="category-title">정책 일관성 평가</h3>
      <div className="category-items">
        <span className="item">경제</span>
        <span className="item">환경</span>
        <span className="item">문화</span>
        <span className="item">모두</span>
      </div>
    </div>
    <div className="timeline">
      <h3>공약 이행 타임라인</h3>
      <div className="timeline-item">20xx.xx.xx 당선</div>
      <div className="timeline-item">20xx.xx.xx 1번 공약 이행 완료</div>
      <div className="timeline-item">20xx.xx.xx 임기 종료</div>
    </div>
    <div className="process-block">
      <h3>의안 투표 추적</h3>
      {Array.from({ length: 6 }).map((_, idx) => (
        <div className="process-item" key={idx}>
          <h4>105 검시(경제부)</h4>
          <p>설명이 이곳에 포함됩니다. 자세한 설명은 이곳을 참조하세요.</p>
          <button className="expand-btn">+</button>
        </div>
      ))}
    </div>
  </div>
);

const Yunji = () => {
  // State to manage layout style (stacked or side-by-side)
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);

  // Function to handle resizing
  const handleResize = () => {
    setIsMobileView(window.innerWidth <= 767);
  };

  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="app">
      <div className="header">
        <img src={logo} alt="PoliTracker Logo" className="logo"/>
        <h1>PoliTracker</h1>
        <div className="menu">
          <button>Home</button>
        </div>
      </div>
      <div className={`main-content ${isMobileView ? "stacked" : "side-by-side"}`}>
        {isMobileView ? (
          // If mobile view, stack left-panel on top of right-panel
          <>
            <LeftPanel />
            <RightPanel />
          </>
        ) : (
          // If desktop view, display panels side by side
          <>
            <LeftPanel />
            <RightPanel />
          </>
        )}
      </div>
    </div>
  );
};

export default Yunji;