import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import './RightPanel.css';

const RightPanel = () => {
  const [activeGroup, setActiveGroup] = useState(''); // 드롭다운 선택 상태 추가
  const [histogramData, setHistogramData] = useState({ labels: [], datasets: [] });

  // 새로운 드롭다운 선택 항목
  const policies = {
    인류문화의본: [
      { name: "정책1", progress: 93 },
      { name: "정책2", progress: 60 },
      { name: "정책3", progress: 30 },
      { name: "정책4", progress: 10 },
      { name: "정책5", progress: 60 },
      { name: "정책6", progress: 100 },
      { name: "정책7", progress: 100 },
      { name: "정책8", progress: 100 },
      { name: "정책9", progress: 15 },
      { name: "정책10", progress: 100 },
      { name: "정책11", progress: 85 },
      { name: "정책12", progress: 65 },
      { name: "정책13", progress: 81 },
      { name: "정책14", progress: 82 },
    ],
    세계문화의본: [],  // 선택 항목 추가, 데이터 비워둠
    미래혁신의본: [],
    화합포용의본: []
  };

  // 드롭다운 선택 시 히스토그램 데이터 업데이트
  const handleSelectChange = (e) => {
    const selectedGroup = e.target.value;
    setActiveGroup(selectedGroup);

    if (policies[selectedGroup]) {
      const selectedPolicies = policies[selectedGroup];
      const ranges = ["0-25%", "26-50%", "51-75%", "76-100%"];
      const rangeCounts = [0, 0, 0, 0];

      selectedPolicies.forEach((policy) => {
        if (policy.progress <= 25) rangeCounts[0]++;
        else if (policy.progress <= 50) rangeCounts[1]++;
        else if (policy.progress <= 75) rangeCounts[2]++;
        else if (policy.progress <= 100) rangeCounts[3]++;
      });

      setHistogramData({
        labels: ranges,
        datasets: [
          {
            label: "정책 개수",
            data: rangeCounts,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    } else {
      setHistogramData({ labels: [], datasets: [] });
    }
  };

  return (
    <div className="right-panel">
      <h3 className="panel-title">정책 상태 선택</h3>
      <select className="dropdown" onChange={handleSelectChange} value={activeGroup}>
        <option value="">선택하세요</option>
        <option value="인류문화의본">인류문화의 본</option>
        <option value="세계문화의본">세계문화의 본</option>
        <option value="미래혁신의본">미래혁신의 본</option>
        <option value="화합포용의본">화합포용의 본</option>
      </select>

      {activeGroup === "인류문화의본" && (
        <div className="chart-container">
          <Bar
            data={histogramData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  beginAtZero: true,
                  title: { display: true, text: '이행률 구간' },
                },
                y: {
                  beginAtZero: true,
                  title: { display: true, text: '정책 개수' },
                  ticks: { stepSize: 1 },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default RightPanel;
