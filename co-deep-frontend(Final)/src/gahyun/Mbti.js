import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Mbti.css"; // Create this CSS file for styles
//import introImage from "./assets/intro.png"; // Example path for the intro image
//import logoImage from "./assets/header_logo.png"; // Example path for the header logo

const Mbti = () => {
    const navigate = useNavigate();
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    // Example of setting up Kakao SDK (only if required)
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("b030c3ea411f34ca5103934037a4a7a5");
    }
  }, []);

  const handleStart = () => {
    setIsStarted(true);
  };

  return (
    <div className="mbti-container">
      {/* Header */}
        <header className="header">
            <img src="/images/logo.png" alt="PoliTracker" className="logo" onClick={() => navigate("/")}/>
            <button className="home-button" onClick={() => navigate("/")}>Home</button>
        </header>

      {/* Main Section */}
      {!isStarted ? (
        <section className="mbti-main">
          <div className="main-image">
            {/* <img
              src={introImage}
              alt="Intro"
              className="img-fluid"
              onClick={handleStart}
            /> */}
          </div>
          <p className="intro-text" style={{ color: "#F96791" }}>
            나의 정치 성향 분석하기
          </p>
          <button
            type="button"
            className="btn btn-outline-light start-button"
            onClick={handleStart}
          >
            시작하기
          </button>
        </section>
      ) : (
        <section id="qna" className="mbti-qna">
          <div className="status mx-auto mt-5">
            <div className="status-bar"></div>
          </div>
          <div className="qBox my-5 py-3 mx-auto">질문 영역</div>
          <div className="answerBox">답변 영역</div>
        </section>
      )}
    </div>
  );
};

export default Mbti;
