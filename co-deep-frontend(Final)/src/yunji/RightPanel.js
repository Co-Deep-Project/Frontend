import React, { useState } from 'react';
import './RightPanel.css'

const RightPanel = () => {
  const [activeGroups, setActiveGroups] = useState({
    complete: false,
    inProgress: false,
    notStarted: false
  });

  const policies = {
    complete: ['정책1', '정책2', '정책3'],
    inProgress: ['정책1', '정책2', '정책3'],
    notStarted: ['정책1', '정책2', '정책3']
  };

  const toggleGroup = (group) => {
    setActiveGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  return (
    <div className="right-panel">
      <div className="action-cards">
        {Object.entries(policies).map(([key, value], index) => (
          <div key={key} className="action-card">
            <button className={`btn ${key}`} onClick={() => toggleGroup(key)}>
              <span>{`${index + 1} ${key === 'complete' ? '완료' : key === 'inProgress' ? '이행중' : '이행하지 못한 것'}`}
                <span className="toggle-button" onClick={(e) => { e.stopPropagation(); toggleGroup(key); }}>+</span>
              </span>
            </button>
            {activeGroups[key] && (
              <div className="policy-list">
                {value.map(policy => (
                  <div key={policy} className="policy-item">{policy}</div>
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
