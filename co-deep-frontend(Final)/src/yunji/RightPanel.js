import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import "./RightPanel.css";
import ReactTooltip from "recharts/lib/component/Tooltip";

const RightPanel = () => {
  const [activeGroup, setActiveGroup] = useState("");
  const [selectedPolicies, setSelectedPolicies] = useState([]);
  
  const groups = {
    "인류문화의 본": {
      data: [
        { range: "0-25%", count: 6, policies: ["문화예술인 뉴미디어 콘텐츠 제작 교육 (10%)", "이건희 기증관 건립 협력 (15%)", "청와대 개방 연계 송현동 녹지공간 조성 추진 (25%)", "송현동 문화공원 조성 및 지하 공영주차장 건설 (10%)", "정독도서관 공영주차장 건설 (5%)", "메타버스<박노수 미술관> 조성 (폐지)"] },
        { range: "26-50%", count: 2, policies: ["삼청공원 입구 지하주차장 건설 (50%)", "문화예술인 뉴미디어 콘텐츠 제작 (30%)"]},
        { range: "51-75%", count: 3, policies: ["<화가 김창열의 집> 조성 추진 (60%)","문화·예술·공연 신매체 플랫폼 조성 추진 (60%)", "홍제천(홍지문) 역사·문화공간 조성 사업 (65%)"] },
        { range: "76-100%", count: 11, policies: ["통인시장 활성화 (81%)", "서촌, 북촌 상권 활성화 (82%)","홍제천변 산책로 조성공사 (85%)","종로 문화관광벨트 조성 추진 (93%)", "무계원 전시공간 운영 완료 (100%)", "<자문밖 아트 레지던시> 운영 (100%)", "<서울시립 미술아카이브> 운영 협력·활용 (100%)", "대학로 공연예술 관광자원화 및 지원정책 추진 (100%)", "인사동 전통문화 관광자원화 및 지원정책 추진 (100%)", "청와대 관리 및 활용방안 마련 추진 (100%)", "청와대 주차장 개방 (100%)"] },
      ]
    },
    "세계문화의 본": {
      data: [
        { range: "0-25%", count: 1, policies: ["초등학생 스쿨버스 운영 지원 (폐지)"] },
        { range: "26-50%", count: 1, policies: ["청소년체험학습공간 종로청소년복합센터 건립 추진(30%)"] },
        { range: "51-75%", count: 3, policies: ["종로 소재 대학과 중고교 연계 1:1 멘토링 시스템 운영 (60%)", "교육경비지원 예산 확대 (60%)","초등학교 학습환경개선(60%)"] },
        { range: "76-100%", count: 3, policies: ["종로 미래교육 플랫폼 구축 추진(100%)","청소년 진로 설계 및 직업 체험 교육 지원(100%)","혜화동 키즈카페 유치 및 운영(100%)"] },
      ]
    },
    "미래혁신의 본": {
      data: [
        { range: "0-25%", count: 4, policies: ["거대 도심녹지 조성을 통한 탄소제로 미래도시 구현 (5%)", "청정에너지 활용, 도시형 스마트팜 조성을 통한 일자리 창출 (5%)", "은평새길 변경추진 (20%)","창신동 채석장(기동대 옆) 공간 활용 재검토 및 정비 추진 (25%)"] },
        { range: "26-50%", count: 6, policies: ["주민 의사 반영 민간재개발 정상화 및 선택적 공공재개발 추진(50%)","청정에너지 보급 확대, 에너지 빅데이터 및 사후관리 일자리 확대 등 에코시티 구현 (50%)", "지상기기 지하화(40%)","세운2재정비촉진구역 (40%)",  "강북횡단선(청량리~상명대~평창동~목동) 조속 추진 (30%)", "카셰어링 활성화 및 공동주택 내 공유차량 도입 추진 (45%)"] },
        { range: "51-75%", count: 2, policies: ["구기동 소규모주택정비 관리지역(상명대 북측지역) 지정 추진 (65%)","창신동 남측 대한민국 랜드마크 조성 추진(60%)" ] },
        { range: "76-100%", count: 12, policies: [
            "종로 보행로 보도 정비 (100%)",
            "종로 보행로 노점 및 적치물 정비 (100%)",
            "한국전력 지상기기 녹 제거 및 도색 (100%)",
            "전기 공유자전거 배치 확대 (100%)",
            "주차관제시스템 설치 확대 (100%)",
            "스마트폰앱을 활용한 주차공유 (100%)",
            "환경친화적 전기차 충전기 설치 (100%)",
            "친환경차 구입 시 추가 할인 및 리워드 지원 (100%)",
            "세운4재정비촉진구역 (82%)",
            "종로 봉제산업 육성 (81%)",
            "청와대 개방 계기, 규제완화를 통한 주민재산권 행사 정상화 추진 (80%)",
            "구기동 소규모주택정비 관리지역(상명대 북측지역) 지정 추진 (65%)"
          ] },
      ]
    },
    "화합포용의 본": {
      data: [
        { range: "0-25%", count: 3, policies: ["부암동 251-7번지 일대 공영주차장 건설 (10%)","부암취락지구 공영주차장 건설 (10%)","신영동 공영주차장 및 주민편의시설 건설 (10%)","이화·혜화권역 주택가 공영주차장 확대 (5%)"] },
        { range: "26-50%", count: 0, policies: [] },
        { range: "51-75%", count: 3, policies:["종로구 행정서비스의 디지털전환에 따른 효율적인 조직·인력운영(60%)","장애인 돌봄 지원 확대(80%)","시니어 스마트센터 구축(70%)"]},
        { range: "75-100%", count:11, policies: ["어르신·청년 등 1인가구 보살핌 및 안전서비스 강화 (100%)", "어르신·장애인 친디지털 환경 구축 (100%)", "공공기관 주차장 주말 개방운영 (100%)", "종로구 관용차량 감축 및 친환경 관용차량 구입 (100%)", "공유 전기차량 배치 (100%)", "장애인 돌봄 지원 확대 (100%)", "중소기업육성기금 신속 지원 (100%)",
        "소상공인 안심금리이자지원 제도 실시 (100%)",
        "중소기업·소상공인 대출 원리금 분할상환유예 조치 연장 시행 (100%)",
        "홍지취락지구 공영주차장 건설 (100%)",
        "부설주차장 주차면 개방 시 다양한 인센티브 확대 추진 (100%)",
        "종로구 권역별 중심 통합건강관리 추진 (100%)"]}
      ]
    }
  };
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
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const policies = humanityCulturePolicies[label] || [];
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} 범위:`}</p>
          <ul>
            {policies.map((policy, index) => (
              <li key={index}>{policy}</li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };

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

  const handleBarClick = (data) => {
    if (data && data.policies) {
      setSelectedPolicies(data.policies);
    } else {
      setSelectedPolicies([]); // Reset or handle as needed
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
        <>
          {/* 선택된 그룹의 평균 이행률 */}
          <div>
          <div className="average-progress-card">
            <p>{activeGroup}의 평균 이행률</p>
            <h2>{selectedGroupAverage}%</h2>
          </div>
          <p className="evaluation-note">본 평가는 이행률 데이터가 명시된 정책들만을 대상으로 산출되었습니다.</p>
          <p className = "evaluation-note">세부적인 정책 명이 궁금하시다면, 그래프를 눌러보세요</p>
          </div>

          <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={groups[activeGroup] ? groups[activeGroup].data : []}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar className = "bar-style"
            dataKey="count"
            onClick={(event) => handleBarClick(event)}
            fill="#ede7f6"  // 내부 색상 설정
            stroke="#b39ddb" // 테두리 색상 설정
            strokeWidth={1} // 테두리 두께 설정
          >
            <LabelList dataKey="count" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {selectedPolicies.length > 0 && (
            <div className="policy-list">
              <h3>선택된 정책 목록:</h3>
              <ul>
                {selectedPolicies.map((policy, index) => (
                  <li key={index}>{policy}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RightPanel;