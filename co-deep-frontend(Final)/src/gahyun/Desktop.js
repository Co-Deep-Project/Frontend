import React from "react";
import "./style.css";
import "./styleguide.css";

import frame2 from "../assets/frame-2.svg";
import frame from "../assets/frame.svg";
import group from "../assets/group.png";
import tokyoBrowserWindowWithEmoticonLikesAndStarsAround2 from "../assets/tokyo-browser-window-with-emoticon-likes-and-stars-around-2.png";
import tokyoMagnifierWebSearchWithElements2 from "../assets/tokyo-magnifier-web-search-with-elements-2.png";
import image from "../assets/Button.png"; 
import arrow1 from "../assets/arrow-1.svg";
import arrow2 from "../assets/arrow-1-2.svg";
import logo from "../assets/polilogo.png"; // 로고 이미지 import

const Desktop = () => {
  return (
    <div className="desktop">
      <div className="landing-page">
        <div className="navigation-bar">
          <div className="POLITRACK-er">
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
            객관적 정보, 주체적 판단
            <br />
            청년을 위한 정치 플랫폼
          </p>
          <div className="illustration">
            <div className="overlap">
              <img className="frame" src={frame} alt="Frame" />
              <div className="overlap-group">
                <img className="img" src={frame2} alt="Frame 2" />
                <div className="ellipse"></div>
                <div className="ellipse-2"></div>
                <div className="ellipse-3"></div>
                <img className="group" src={group} alt="Group" />
              </div>
              <div className="ellipse-4"></div>
              <div className="ellipse-5"></div>
              <div className="ellipse-6"></div>
            </div>
          </div>
        </header>
      </div>
      <div className="heading-subheading">
        <div className="heading">
          <div className="label">
            <div className="text-wrapper">서비스</div>
          </div>
        </div>
        <p className="div">
          정치가 어렵게 느껴지시나요?
          <br />
          폴리트래커로 중요한 사안과 정보를 한눈에, 쉽게 확인하세요!
        </p>
      </div>
      <div className="overlap-2">
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
            <div className="link">
              <div className="icon">
                <img className="arrow" src={arrow1} alt="Arrow" />
              </div>
              <div className="label-4">Learn more</div>
            </div>
          </div>
          <div className="tokyo-browser-window-wrapper">
            <img
              className="tokyo-browser-window"
              src={tokyoBrowserWindowWithEmoticonLikesAndStarsAround2}
              style={{ width: "100px", height: "auto" }}
              alt="Browser Window"
            />
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
              <div className="link">
                <div className="arrow-wrapper">
                  <img className="arrow" src={arrow2} alt="Arrow 2" />
                </div>
                <div className="label-5">Learn more</div>
              </div>
            </div>
            <div className="tokyo-magnifier-web-wrapper">
              <img
                className="tokyo-magnifier-web"
                src={tokyoMagnifierWebSearchWithElements2}
                alt="Magnifier Web"
                style={{ width: "100px", height: "auto" }}
              />
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
            <div className="link">
              <div className="arrow-wrapper">
                <img className="arrow" src={arrow1} alt="Arrow" />
              </div>
              <div className="label-5">Learn more</div>
            </div>
          </div>
          <div className="illustration-2"></div>
        </div>
      </div>
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