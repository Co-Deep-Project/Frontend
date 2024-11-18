import React, { useState, useEffect } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // 챗봇 열림/닫힘 상태
  const [messages, setMessages] = useState([]); // 챗봇 메시지 상태
  const [inputValue, setInputValue] = useState(""); // 채팅 입력 상태
  const [news, setNews] = useState([]); // 뉴스 데이터 상태

  const toggleChatbot = () => setIsOpen(!isOpen); // 챗봇 열기/닫기

  // Mock 뉴스 데이터
  useEffect(() => {
    setNews([
      {
        id: 1,
        title: "뉴스 1: 최신 선거 정보",
        description: "다음 선거에 관한 주요 뉴스를 확인하세요.",
      },
      {
        id: 2,
        title: "뉴스 2: 새로운 법안 발의",
        description: "최근 경제 법안 발의와 그 영향.",
      },
      {
        id: 3,
        title: "뉴스 3: 청년 취업 지원 프로그램",
        description: "청년층 대상 취업 지원 프로그램 확대 소식.",
      },
      {
        id: 4,
        title: "뉴스 4: 트래커스꾸 창업 성공",
        description: "성균관대학교 코딥 프로젝트에서 뭉친 트래커스꾸가 개발한 politracker 대성공하다",
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
      {/* 뉴스 섹션 */}
      <div className="news-container">
  <h1 className="news-header">최신 뉴스</h1>
  <div className="news-cards">
    {news.map((item) => (
      <div key={item.id} className="news-card">
        <h2 className="news-title">{item.title}</h2>
        <p className="news-description">{item.description}</p>
        <a href="#!" className="news-button">더 보기</a> {/* 링크 추가 */}
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
