import React from 'react';

const ResultScreen = ({ onRestart }) => {
  const results = JSON.parse(localStorage.getItem('results')) || {};
  const {
    economicProgressive,
    economicConservative,
    diplomaticProgressive,
    diplomaticConservative,
    socialProgressive,
    socialConservative
  } = results;

  // 로직은 동일하게 유지
  const finalEconomic = economicProgressive > economicConservative ? "Progressive" : "Conservative";
  const finalDiplomatic = diplomaticProgressive > diplomaticConservative ? "Progressive" : "Conservative";
  const finalSocial = socialProgressive > socialConservative ? "Progressive" : "Conservative";
  let character = "세종대왕";
  let image = "/images/세종대왕.jpg";

  // 인물 결정 로직
  if (finalEconomic === "Progressive" && finalDiplomatic === "Progressive" && finalSocial === "Conservative") {
    character = "김유신";
    image = "/images/김유신.jpg";
  } else if (finalEconomic === "Conservative" && finalDiplomatic === "Progressive" && finalSocial === "Conservative") {
    character = "황희";
    image = "/images/황희.jpg";
  } else if (finalEconomic === "Progressive" && finalDiplomatic === "Conservative" && finalSocial === "Conservative") {
    character = "흥선대원군";
    image = "/images/흥선대원군.jpg";
  } else if (finalEconomic === "Conservative" && finalDiplomatic === "Conservative" && finalSocial === "Conservative") {
    character = "송시열";
    image = "/images/송시열.jpg";
  } else if (finalEconomic === "Conservative" && finalDiplomatic === "Progressive" && finalSocial === "Progressive") {
    character = "이순신";
    image = "/images/이순신.jpg";
  } else if (finalEconomic === "Progressive" && finalDiplomatic === "Conservative" && finalSocial === "Progressive") {
    character = "정몽주";
    image = "/images/정몽주.jpg";
  } else if (finalEconomic === "Conservative" && finalDiplomatic === "Conservative" && finalSocial === "Progressive") {
    character = "안중근";
    image = "/images/안중근.jpg";
  }

  return (
    <div className="result-screen">
      <h1>당신의 역사적 인물은 {character}입니다</h1>
      <img src={image} alt={`역사적 인물 ${character}`} style={{ width: '300px', height: 'auto' }} />
      <button className="finishBtn" onClick={onRestart}>다시 테스트하기</button>
    </div>
  );
};

export default ResultScreen;