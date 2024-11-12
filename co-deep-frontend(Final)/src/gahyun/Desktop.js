import React from "react";
import "./style.css";
import "./styleguide.css";
import arrow1 from "../assets/arrow-1.svg";
import arrow2 from "../assets/arrow-1-2.svg";
import logo from "../assets/polilogo.png"; 

const Desktop = () => {
  return (
    <div className="desktop">
      
      {/* header section */}
      <div className="landing-page">
        <div className="navigation-bar">
          <div className="POLITRACKER">
            <img
              src={logo}
              alt="POLITRACKER 로고"
              style={{ width: "500px", height: "auto" }}
            />
          </div>
        </div>

        <header className="header">
          <p className="p">
            <br />
            <br />
            <br />
            객관적 정보, 주체적 판단
            <br />
            청년을 위한 정치 플랫폼
          </p>
        </header>
      </div>

      {/* Intro Section */}
      <div className="heading-subheading">
        <p className="div">
          정치가 어렵게 느껴지시나요?
          <br />
          폴리트래커로 중요한 사안과 정보를 한눈에, 쉽게 확인하세요!
        </p>
      </div>

      <div className="overlap-2">
        {/* Cards Section */}
        <div className="card">
          <div className="heading-and-link">
            <div className="heading">
              <div className="label-wrapper">
                <div className="label-3">나의 정치 성향</div>
              </div>
              <div className="label-wrapper">
                <div className="label-3">분석하기</div>
              </div>
            </div>
            <br></br>
            <br></br>
            <div className="link">
              <div className="icon">
                <img className="arrow" src={arrow1} alt="Arrow" />
              </div>
              <br></br>
              <div className="label-4">Learn more</div>
            </div>
          </div>
        </div>
        <div className="cards-section">
          <div className="card-2">
            <div className="heading-and-link-2">
              <div className="heading">
                <div className="label">
                  <div className="label-3">우리 지역 정치인</div>
                </div>
                <div className="label">
                  <div className="label-3">트래킹하기</div>
                </div>
              </div>
              <br></br>
              <br></br>
              <div className="link">
                <div className="arrow-wrapper">
                  <img className="arrow" src={arrow1} alt="Arrow 1" />
                </div>
                <br></br>
                <div className="label-5">Learn more</div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-3">
          <div className="heading-and-link">
            <div className="heading">
              <div className="label-wrapper">
                <div className="label-3">낯선 정치 용어</div>
              </div>
              <div className="label-wrapper">
                <div className="label-3">알아보기</div>
              </div>
            </div>
            <br></br>
            <br></br>
            <div className="link">
              <div className="arrow-wrapper">
                <img className="arrow" src={arrow1} alt="Arrow" />
              </div>
              <br></br>
              <div className="label-5">Learn more</div>
            </div>
          </div>
          <div className="illustration-2"></div>
        </div>
      </div>

      <br />
      <p className="element-trackerskku-g">
        성균관대학교 트래커스꾸
        <br />
        서울특별시 종로구 성균관로 25-2
        <br />
        trackerskku@g.skku.edu
      </p>
    </div>
  );
};

export default Desktop;