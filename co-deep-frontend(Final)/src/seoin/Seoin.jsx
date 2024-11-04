import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Seoin = () => {
  const navigate = useNavigate();
  const [votes, setVotes] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [page, setPage] = useState(1); // 현재 페이지 번호 (페이지네이션에 사용)
  const ITEMS_PER_PAGE = 3; // 한 번에 로드할 항목 수

  // 초기 데이터 가져오기
  useEffect(() => {
    const fetchVotes = async () => {
      const response = await fetch("/곽상언.json");
      const data = await response.json();
      // 날짜를 기준으로 내림차순 정렬 후 첫 페이지 데이터만 로드
      const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setVotes(sortedData.slice(0, ITEMS_PER_PAGE));
    };
    fetchVotes();
  }, []);

  // 투표 항목 확장/축소 기능
  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 추가 데이터를 불러오는 함수 (더보기 버튼 클릭 시)
  const loadMore = async () => {
    const response = await fetch("/곽상언.json");
    const data = await response.json();
    const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
    const nextPageData = sortedData.slice(0, (page + 1) * ITEMS_PER_PAGE);
    setVotes(nextPageData);
    setPage(page + 1);
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
                vote.decision === "찬성" ? "approve" : vote.decision === "반대" ? "against" : "abstain"
              }`}
            >
              <div className="vote-header">
                <span>{vote.id}</span>
                <span>{vote.title}</span>
                <button onClick={() => toggleExpand(vote.id)}>
                  {expanded[vote.id] ? "-" : "+"}
                </button>
              </div>
              {expanded[vote.id] && (
                <div className="vote-details">
                  <p>의결일자: {vote.date}</p>
                  <p>소관위원회: {vote.committee}</p>
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
