import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Chatbot.css";
import logo from "../yunji/assets/polilogo.png";


const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // 챗봇 열림/닫힘 상태
  const [messages, setMessages] = useState([]); // 챗봇 메시지 상태
  const [inputValue, setInputValue] = useState(""); // 채팅 입력 상태
  const [news, setNews] = useState([]); // 뉴스 데이터 상태
  const navigate = useNavigate();

  const toggleChatbot = () => setIsOpen(!isOpen); // 챗봇 열기/닫기

  const handleHomeClick = () => navigate("/"); // Home 경로로 이동
  const handlePositionClick = () => navigate("/select-region"); // "구" 경로로 이동
  const handlePoliticianClick = () => navigate("/politician"); // "정치인" 경로로 이동

  // Mock 뉴스 데이터
  useEffect(() => {
    setNews([
      {
        id: 1,
        title: "정치 뉴스: 최신 선거 정보",
        description: "다음 선거에 관한 주요 뉴스를 확인하세요.",
        image: "https://via.placeholder.com/300x200",
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

  // 챗봇 메시지 전송
  const handleSend = () => {
    if (inputValue.trim() === "") return;

    const userMessage = { sender: "user", text: inputValue };
    setMessages((prev) => [...prev, userMessage]);

    // Mock bot response
    const botResponse = { sender: "bot", text: "죄송합니다. 아직 대화가 준비 중입니다!" };
    setTimeout(() => {
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);

    setInputValue(""); // 입력창 초기화
  };

  return (
    <div className="chatbot-container">
      {/* 헤더 섹션 */}
      <div className="header">
        <div className="logo-container">
          <img src={logo} alt="PoliTracker Logo" className="poliLogo" />
        </div>
        <div className="menu">
          <button onClick={handlePositionClick}>구</button>
          <button onClick={handlePoliticianClick}>정치인</button>
          <button onClick={handleHomeClick}>Home</button>
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
   
        </div>
      )}

      {/* 챗봇 창 */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>POLITRACKER Chatbot</span>
          </div>
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chatbot-message ${message.sender === "user" ? "user" : "bot"}`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input-container">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="메시지를 입력하세요..."
              className="chatbot-input"
            />
            <button onClick={handleSend} className="send-button">
              전송
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
