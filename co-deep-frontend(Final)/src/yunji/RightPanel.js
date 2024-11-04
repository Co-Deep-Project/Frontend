import React from 'react';

const RightPanel = ({ handleButtonClick }) => (
  <div className="right-panel">
    <div className="category">
      <h3 className="category-title">정책 일관성 평가</h3>
      <div className="category-items">
        <span className="item">경제</span>
        <span className="item">환경</span>
        <span className="item">문화</span>
        <span className="item">모두</span>
      </div>
      <div className="action-cards">
        <button className="btnComplete" onClick={() => handleButtonClick("완료")}>01 완료</button>
        <button className="btnProgress" onClick={() => handleButtonClick("이행중")}>02 이행중</button>
        <button className="btnNotProgress" onClick={() => handleButtonClick("이행하지 못한 것")}>03 이행하지 못한 것</button>
      </div>
    </div>
    <div className="timeline">
      <h3>공약 이행 타임라인</h3>
      <div className="timeline-item">20xx.xx.xx 당선</div>
      <div className="timeline-item">20xx.xx.xx 1번 공약 이행 완료</div>
      <div className="timeline-item">20xx.xx.xx 임기 종료</div>
    </div>
  </div>
);

export default RightPanel;
