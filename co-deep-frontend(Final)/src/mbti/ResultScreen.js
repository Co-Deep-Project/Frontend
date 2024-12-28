import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ResultScreen.css'; // CSS 파일을 사용하여 스타일 추가

const ResultScreen = () => {
  const navigate = useNavigate();

  const onRestart = () => {
    navigate('/start'); // "/start" 경로로 네비게이트
  };

  const results = JSON.parse(localStorage.getItem('results')) || {};
  const {
    economicProgressive,
    economicConservative,
    diplomaticProgressive,
    diplomaticConservative,
    socialProgressive,
    socialConservative
  } = results;

  const finalEconomic = economicProgressive > economicConservative ? "Progressive" : "Conservative";
  const finalDiplomatic = diplomaticProgressive > diplomaticConservative ? "Progressive" : "Conservative";
  const finalSocial = socialProgressive > socialConservative ? "Progressive" : "Conservative";
  let character = "세종대왕";
  let image = "/images/세종대왕.jpg";
  let backgroundClass = "default-background";

  if (finalEconomic === "Progressive" && finalDiplomatic === "Progressive" && finalSocial === "Conservative") {
    character = "김유신";
    image = "/images/김유신.jpg";
    backgroundClass = "warrior-background";
  } else if (finalEconomic === "Conservative" && finalDiplomatic === "Progressive" && finalSocial === "Conservative") {
    character = "황희";
    image = "/images/황희.jpg";
    backgroundClass = "scholar-background";
  }

  return (
    <div className={`result-screen ${backgroundClass}`}>
      <h1>당신의 역사적 인물은 {character}입니다</h1>
      <img src={image} alt={`역사적 인물 ${character}`} className="character-image" />
      <button className="finishBtn" onClick={onRestart}>다시 테스트하기</button>
    </div>
  );
};

export default ResultScreen;
