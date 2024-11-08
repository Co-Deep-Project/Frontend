import React, { useState } from 'react';
import './RightPanel.css';

const RightPanel = () => {
  const [activeGroups, setActiveGroups] = useState({
    complete: false,
    inProgress: false,
    notStarted: false
  });

  const [activePolicies, setActivePolicies] = useState({});

  const policies = {
    complete: ['정책1', '정책2', '정책3'],
    inProgress: ['정책4', '정책5', '정책6'],
    notStarted: ['정책7', '정책8', '정책9']
  };

  // Updated policyDates to include only "당선", "이행 완료", and "임기 종료" for completed policies
  const policyDates = {
    정책1: [
      { date: "2022년 9월 3일", event: "당선" },
      { date: "2022년 9월 17일", event: "이행 완료" },
      { date: "2022년 12월 31일", event: "임기 종료" }
    ],
    정책2: [
      { date: "2022년 2월 5일", event: "당선" },
      { date: "2022년 2월 10일", event: "이행 완료" },
      { date: "2022년 12월 31일", event: "임기 종료" }
    ],
    정책3: [
      { date: "2023년 3월 7일", event: "당선" },
      { date: "2023년 3월 12일", event: "이행 완료" },
      { date: "2023년 12월 31일", event: "임기 종료" }
    ],
    정책4: [
      { date: "2022년 5월 3일", event: "당선" },
      { date: "2022년 5월 15일", event: "이행 시작" },
      { date: "2022년 12월 31일", event: "임기 종료" }
    ],
    정책5: [
      { date: "2019년 6월 7일", event: "당선" },
      { date: "2019년 6월 21일", event: "이행 시작" },
      { date: "2019년 12월 31일", event: "임기 종료" }
    ],
    정책6: [
      { date: "2010년 2월 20일", event: "당선" },
      { date: "2010년 3월 5일", event: "이행 시작" },
      { date: "2010년 12월 31일", event: "임기 종료" }
    ],
    정책7: [
      { date: "2021년 8월 2일", event: "당선" },
      { date: "2021년 12월 31일", event: "임기 종료" }
    ],
    정책8: [
      { date: "2022년 9월 3일", event: "당선" },
      { date: "2022년 12월 31일", event: "임기 종료" }
    ],
    정책9: [
      { date: "2022년 9월 10일", event: "당선" },
      { date: "2022년 12월 31일", event: "임기 종료" }
    ]
  };

  const toggleGroup = (group) => {
    setActiveGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  const togglePolicy = (policy) => {
    setActivePolicies(prev => ({
      ...prev,
      [policy]: !prev[policy]
    }));
  };

  return (
    <div className="right-panel">
      <div className="category">
        <h3 className="category-title">정책 일관성 평가</h3>
        <div className="category-items">
          <div className="circle-container">
            <div className="grey-circle">
              <div className="green-circle"></div>
            </div>
            <span className="circle-text">경제</span>
          </div>
          <div className="circle-container">
            <div className="grey-circle">
              <div className="green-circle"></div>
            </div>
            <span className="circle-text">환경</span>
          </div>
          <div className="circle-container">
            <div className="grey-circle">
              <div className="green-circle"></div>
            </div>
            <span className="circle-text">문화</span>
          </div>
          <div className="circle-container">
            <div className="grey-circle">
              <div className="green-circle"></div>
            </div>
            <span className="circle-text">모두</span>
          </div>
        </div>
      </div>
      <div className="action-cards">
        {Object.entries(policies).map(([key, values]) => (
          <div key={key} className="action-card">
            <button className={`btn ${key}`} onClick={() => toggleGroup(key)}>
              {key === 'complete' ? '완료' : key === 'inProgress' ? '이행중' : '이행하지 않은 것'}
              <span className="toggle-button" onClick={(e) => { e.stopPropagation(); toggleGroup(key); }}>
                {activeGroups[key] ? '-' : '+'}
              </span>
            </button>
            {activeGroups[key] && (
              <div className="policy-list">
                {values.map(policy => (
                  <div key={policy} className="policy-item">
                    <span onClick={() => togglePolicy(policy)}>
                      {policy}
                      <span className="toggle-button" onClick={(e) => { e.stopPropagation(); togglePolicy(policy); }}>
                        {activePolicies[policy] ? '▼' : '▶'}
                      </span>
                    </span>
                    {activePolicies[policy] && (
                      <div className="timeline">
                        <h3>{`${policy} 공약 이행 타임라인`}</h3>
                        <div className="timeline-container">
                          <div className="timeline-line"></div>
                          {/* Render timeline items directly */}
                          {policyDates[policy].map((item, index) => (
                            <div key={index} className="timeline-item">
                              <div className="timeline-marker"></div>
                              <p className="timeline-date">{item.date}</p>
                              <p className="timeline-text">{item.event}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightPanel;
