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
      <div className="action-cards">
        {Object.entries(policies).map(([key, values]) => (
          <div key={key} className="action-card">
            <button className={`btn ${key}`} onClick={() => toggleGroup(key)}>
              {key === 'complete' ? '완료' : key === 'inProgress' ? '이행중' : '이행하지 않은 것'}
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
                          <div className="timeline-item">
                            <div className="timeline-marker"></div>
                            <p className="timeline-date">20xx.xx.xx</p>
                            <p className="timeline-text">당선</p>
                          </div>
                          <div className="timeline-item">
                            <div className="timeline-marker"></div>
                            <p className="timeline-date">20xx.xx.xx</p>
                            <p className="timeline-text">{`${policy} 공약 이행 완료`}</p>
                          </div>
                          <div className="timeline-item">
                            <div className="timeline-marker"></div>
                            <p className="timeline-date">20xx.xx.xx</p>
                            <p className="timeline-text">임기 종료</p>
                          </div>
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
