import React, { useState, useEffect } from "react";
import "./Chatbot.css"; // 스타일 파일 연결
import logo from '../yunji/assets/polilogo.png';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [news, setNews] = useState([]);

  const toggleChatbot = () => setIsOpen(!isOpen);
  const handleHomeClick = () => {
    navigate('/'); // "/" 경로로 이동
  };
  const handlePositionClick = () => {
    navigate('/select-region'); // "/" 경로로 이동
  };
  const handlePoliticianClick = () => {
    navigate('/'); // "/" 경로로 이동
  };

  // Mock 뉴스 데이터
  useEffect(() => {
    setNews([
      {
        id: 1,
        title: "정치 뉴스: 최신 선거 정보",
        description: "다음 선거에 관한 주요 뉴스를 확인하세요.",
        image: "https://via.placeholder.com/300x200", // 이미지 URL
      },
      {
        id: 2,
        title: "경제 뉴스: 새로운 법안 발의",
        description: "최근 경제 법안 발의와 그 영향.",
        image: "https://via.placeholder.com/300x200",
      },
      {
        id: 3,
        title: "사회 뉴스: 청년 취업 지원 프로그램",
        description: "청년층 대상 취업 지원 프로그램 확대 소식.",
        image: "https://via.placeholder.com/300x200",
      },
    ]);
  }, []);

  return (
    <div className="chatbot-container">
      <div className="header">
        <div className="logo-container">
          <img src={logo} alt="PoliTracker Logo" className="poliLogo" />
        </div>
        <div className="menu">
        <button onClick={handlePositionClick}>구</button> {/* onClick 이벤트 추가 */}
          <button onClick={handlePoliticianClick}>정치인</button> {/* onClick 이벤트 추가 */}
          <button onClick={handleHomeClick}>Home</button> {/* onClick 이벤트 추가 */}
        </div>
      </div>
      {/* 뉴스 섹션 */}
      <div className="news-container">
        <h1 className="news-header">최신 뉴스</h1>
        <div className="news-cards">
          {news.map((item) => (
            <div key={item.id} className="news-card">
              <img src={item.image} alt={item.title} className="news-image" />
              <div className="news-content">
                <h2 className="news-title">{item.title}</h2>
                <p className="news-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 챗봇 버튼 */}
      {!isOpen && (
        <div className="chatbot-button" onClick={toggleChatbot}>
          💬
        </div>
      )}

      {/* 챗봇 창 */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>POLITRACKER Chatbot</span>
            <button className="close-button" onClick={toggleChatbot}>
              ✖
            </button>
          </div>
          <div className="chatbot-messages">
            <p>챗봇 창에서 메시지를 주고받을 수 있습니다.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
