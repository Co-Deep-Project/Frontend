import React, { useState } from "react";
import StartScreen from "./StartScreen"; // 시작 화면 컴포넌트
import QuestionScreen from "./QuestionScreen"; // 질문 화면 컴포넌트
import ResultScreen from "./ResultScreen"; // 결과 화면 컴포넌트
import "./Mbti.css";

const Mbti = () => {
  const [screen, setScreen] = useState("start");

  const handleComplete = () => {
    setScreen("result");
  };

  const handleRestart = () => {
    setScreen("start");
  };

  return (
    <div className="mbti-container">
      {screen === "start" && <StartScreen onNext={() => setScreen("question")} />}
      {screen === "question" && <QuestionScreen onComplete={handleComplete} />}
      {screen === "result" && <ResultScreen onRestart={handleRestart} />}
    </div>
  );
};

export default Mbti;
