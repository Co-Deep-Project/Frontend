import React, { useState, useEffect } from 'react';
import './StartScreen.css';

function StartScreen({ onStart }) {
  const [typing, setTyping] = useState(false);
  const [message, setMessage] = useState('');
  const [showStory, setShowStory] = useState(false);
  const [showLookAround, setShowLookAround] = useState(false);
  const fullText = "여러분은 지금 역사의 한복판으로 걸어 들어가고 있습니다. 중요한 시기에, 역사의 책 페이지가 몇 장 누락되어, 과거의 이야기를 완성할 수 없는 상황입니다. 여러분의 도움으로 이 문제를 해결할 수 있다면, 그것은 큰 도움이 될 것입니다...";

  useEffect(() => {
    if (typing && showStory) {
      let currentChar = 0;
      const typeWriter = setInterval(() => {
        if (currentChar < fullText.length) {
          setMessage(prev => prev + fullText[currentChar]);
          currentChar++;
        }
        if (currentChar === fullText.length) {
          clearInterval(typeWriter);
          setTyping(false);
        }
      }, 50);
      return () => clearInterval(typeWriter);
    }
  }, [typing, showStory]);

  const handleButtonClick = () => {
    console.log("Book clicked!");
    setShowStory(true);
    setTyping(true);
  };

  const handleLookClick = () => {
    setShowStory(false);
    setShowLookAround(true);
  };

  const handleCloseStory = () => {
    setShowStory(false);
    onStart();
  };
  useEffect(() => {
    console.log("Show Story updated:", showStory);
  }, [showStory]);

  return (
    <div className="start-screen">
      {showLookAround ? (
        <div className="look-around-container">
          <img
            src="/images/book.jpg"
            alt="Book on Chair"
            className="book-on-chair"
            onClick={handleButtonClick} // 책 클릭 이벤트 핸들러
          />
        </div>
      ) : (
        <div className="content">
          <h1>Welcome to the Poli Garden!</h1>
          <button className="start-button" onClick={handleLookClick}>
            둘러보기
          </button>
          {showStory && (
            <div className="story-container">
              <img src="/images/character.jpg" alt="TrackerSKKU" className="character-image"/>
              <div className="story-box">
                <div className="typing-text">{message}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default StartScreen;
