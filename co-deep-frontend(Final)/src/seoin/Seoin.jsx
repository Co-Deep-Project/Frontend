import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Seoin = () => {
  const navigate = useNavigate();
  const [votes, setVotes] = useState([]);
  const [expanded, setExpanded] = useState({});

  // 초기 데이터 설정
  useEffect(() => {
    const initialData = [
      { id: 105, title: "검사(강백신) 탄핵소추안", result: "찬성", details: { number: "2201277", date: "2024-11-01", committee: "법제사법위원회" } },
      { id: 104, title: "검사(김영철) 탄핵소추안", result: "반대", details: { number: "2201276", date: "2024-10-28", committee: "법제사법위원회" } },
      { id: 103, title: "검사(박상용) 탄핵소추안", result: "기권", details: { number: "2201275", date: "2024-10-25", committee: "법제사법위원회" } },
    ];
    setVotes(initialData);
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const loadMore = () => {
    // 추가 데이터
    const moreData = [
      { id: 102, title: "순직 해병 수사 방해 및 사건 은폐 등의 진상규명을 위한 특별검사의 임명 등에 관한 법률안", result: "찬성", details: { number: "2201274", date: "2024-10-20", committee: "국방위원회" } }
    ];

    // 상태 업데이트로 데이터 추가
    setVotes((prevVotes) => [...prevVotes, ...moreData]);
  };

  return (
    <div className="desktop">
      <header className="header">
        <img src="/images/logo.png" alt="PoliTracker" className="logo" />
        <button className="home-button" onClick={() => navigate("/")}>Home</button>
      </header>

      <main className="main-layout">
        <h1 className="main-title">의안 투표 추적</h1>
        <div className="legend">
          <span className="legend-item legend-approve">찬성</span>
          <span className="legend-item legend-against">반대</span>
          <span className="legend-item legend-abstain">기권</span>
        </div>

        <div id="process-block" className="process-block">
          {votes.map((vote) => (
            <div
              key={vote.id}
              className={`vote-card ${
                vote.result === "찬성" ? "approve" : vote.result === "반대" ? "against" : "abstain"
              }`}
            >
              <div className="vote-header">
                <span>{vote.id}</span>
                <span>{vote.title}</span>
                <button onClick={() => toggleExpand(vote.id)}>
                  {expanded[vote.id] ? "-" : "+"}
                </button>
              </div>
              {expanded[vote.id] && vote.details && (
                <div className="vote-details">
                  <p>의안번호: {vote.details.number}</p>
                  <p>의결일자: {vote.details.date}</p>
                  <p>소관위원회: {vote.details.committee}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <button className="load-more" onClick={loadMore}>더보기</button>
      </main>

      <footer className="footer">
        <p>성균관대학교 트래커스꾸</p>
        <p>서울특별시 종로구 성균관로 25-2</p>
        <p>trackerskku@g.skku.edu</p>
      </footer>
    </div>
  );
};

export default Seoin;
