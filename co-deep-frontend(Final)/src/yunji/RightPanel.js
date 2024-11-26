import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import "./RightPanel.css";

const RightPanel = () => {
  const [activeGroup, setActiveGroup] = useState("");

  const humanityCultureProgress = [
    { id: "hc-1", range: "0-25%", count: 6 },
    { id: "hc-2", range: "26-50%", count: 6 },
    { id: "hc-3", range: "51-75%", count: 4 },
    { id: "hc-4", range: "76-100%", count: 7 },
  ];

  const worldCultureProgress = [
    { id: "wc-1", range: "0-25%", count: 1 },
    { id: "wc-2", range: "26-50%", count: 1 },
    { id: "wc-3", range: "51-75%", count: 3 },
    { id: "wc-4", range: "76-100%", count: 3 },
  ];

  const futureInnovationProgress = [
    { id: "fi-1", range: "0-25%", count: 3 },
    { id: "fi-2", range: "26-50%", count: 5 },
    { id: "fi-3", range: "51-75%", count: 3 },
    { id: "fi-4", range: "76-100%", count: 3 },
  ];

  const harmonyInclusionProgress = [
    { id: "hi-1", range: "0-25%", count: 3 },
    { id: "hi-2", range: "26-50%", count: 0 },
    { id: "hi-3", range: "51-75%", count: 2 },
    { id: "hi-4", range: "76-100%", count: 8 },
  ];

  const humanityCultureRawData = [93, 60, 30, 10, 60, 100, 100, 100, 100, 15, 100, 100, 100, 100, 25, 50, 5, 10, 100, 85, 65, 81, 82];
  const worldCultureRawData = [100, 60, 100, 60, 60, 30, 100, 100];
  const futureInnovationRawData = [86, 81, 60, 5, 5, 50, 80, 40, 82, 50, 25, 65, 40, 100, 100, 100, 100, 100];
  const harmonyInclusionRawData = [100, 70, 100, 60, 100, 100, 100, 80, 100, 100, 100, 5, 10, 10, 10, 100, 100, 100];

  const calculateAverage = (data) => {
    if (data.length === 0) return 0;
    const total = data.reduce((sum, value) => sum + value, 0);
    return (total / data.length).toFixed(2);
  };

  const humanityAverage = calculateAverage(humanityCultureRawData);
  const worldAverage = calculateAverage(worldCultureRawData);
  const futureAverage = calculateAverage(futureInnovationRawData);
  const harmonyAverage = calculateAverage(harmonyInclusionRawData);

  const overallAverage = (
    (parseFloat(humanityAverage) +
      parseFloat(worldAverage) +
      parseFloat(futureAverage) +
      parseFloat(harmonyAverage)) /
    4
  ).toFixed(2);

  const getCurrentProgressData = () => {
    switch (activeGroup) {
      case "인류문화의 본":
        return humanityCultureProgress;
      case "세계문화의 본":
        return worldCultureProgress;
      case "미래혁신의 본":
        return futureInnovationProgress;
      case "화합포용의 본":
        return harmonyInclusionProgress;
      default:
        return [];
    }
  };

  const getCurrentRawData = () => {
    switch (activeGroup) {
      case "인류문화의 본":
        return humanityCultureRawData;
      case "세계문화의 본":
        return worldCultureRawData;
      case "미래혁신의 본":
        return futureInnovationRawData;
      case "화합포용의 본":
        return harmonyInclusionRawData;
      default:
        return [];
    }
  };

  const selectedGroupData = getCurrentRawData();
  const selectedGroupAverage = calculateAverage(selectedGroupData);

  return (
    <div className="right-panel">
      {/* 전체 평균 이행률: 선택된 그룹이 없을 때만 표시 */}
      {!activeGroup && (
        <div>
        <div className="overall-average-card">
          <p>전체 평균 이행률</p>
          <h2>{overallAverage}%</h2>
        </div>
          <p className="evaluation-note">본 평가는 이행률 데이터가 명시된 정책들만을 대상으로 산출되었습니다.</p>
          </div>
      )}

      <div style={{ display: "flex", alignItems: "center",  width: "100%" }}>
        <h3 style={{ margin: "10px auto", textAlign: "center", flex: 1 }}>정책 이행률 평가</h3>

      </div>

      
      <select onChange={(e) => setActiveGroup(e.target.value)} value={activeGroup} className="dropdown">
        <option value="">선택하세요</option>
        <option value="인류문화의 본">인류문화의 본</option>
        <option value="세계문화의 본">세계문화의 본</option>
        <option value="미래혁신의 본">미래혁신의 본</option>
        <option value="화합포용의 본">화합포용의 본</option>
      </select>
      <a
        href="https://www.jongno.go.kr/Mayor.do?menuId=400790&menuNo=400790"
        target="_blank"
        rel="noopener noreferrer"
        className="styled-link"
      >
        정책별 이행 현황 자세히 보기 ↗️
      </a>

      {activeGroup && (
        <div>
          {/* 선택된 그룹의 평균 이행률 */}
          <div>
          <div className="average-progress-card">
            <p>{activeGroup}의 평균 이행률</p>
            <h2>{selectedGroupAverage}%</h2>
          </div>
          <p className="evaluation-note">본 평가는 이행률 데이터가 명시된 정책들만을 대상으로 산출되었습니다.</p>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={getCurrentProgressData()}
              layout="horizontal"
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" type="category" />
              <YAxis type="number" domain={[0, 10]} />
              <Tooltip />
              <Bar dataKey="count" fill="#B19CD9" name="정책 개수">
                <LabelList dataKey="count" position="top" fill="#000" fontSize={16} fontWeight="bold" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          </div>
      )}
    </div>
  );
};

export default RightPanel;
