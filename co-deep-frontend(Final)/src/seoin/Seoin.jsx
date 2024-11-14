import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Seoin = () => {
  const navigate = useNavigate();
  const [votes, setVotes] = useState([]); // 전체 표결 데이터
  const [displayVotes, setDisplayVotes] = useState([]); // 현재 페이지에 표시되는 표결 데이터
  const [expanded, setExpanded] = useState({}); // 펼침 상태
  const [page, setPage] = useState(1); // 페이지 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const ITEMS_PER_PAGE = 3; // 페이지당 표시할 항목 수

  const memberName = "곽상언"; // 국회의원 이름

  // Node.js 서버에서 표결 데이터 가져오기
  const fetchVotesFromServer = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/vote_data?name=${memberName}`);
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setVotes(data); // 전체 데이터를 가져와서 저장
        setDisplayVotes(data.slice(0, ITEMS_PER_PAGE)); // 첫 페이지 데이터 설정
      } else {
        console.error("서버에서 JSON 형식이 아닌 응답을 받았습니다.");
      }
    } catch (error) {
      console.error("서버 요청 오류:", error);
    }
    setLoading(false);
  };

  // 페이지 로드 시 초기 데이터 불러오기
  useEffect(() => {
    fetchVotesFromServer();
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 추가 데이터를 불러오는 함수 (더보기 버튼 클릭 시)
  const loadMore = () => {
    const newPage = page + 1;
    const newDisplayVotes = votes.slice(0, newPage * ITEMS_PER_PAGE); // 기존 데이터에서 추가
    setDisplayVotes(newDisplayVotes); // 표시할 데이터 업데이트
    setPage(newPage); // 페이지 수 증가
  };

  return (
    <div className="desktop">
      <header className="tracking-header">
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
          {loading ? (
            <p>데이터를 불러오는 중...</p>
          ) : displayVotes.length === 0 ? (
            <p>표결 데이터가 없습니다.</p>
          ) : (
            displayVotes.map((vote, index) => {
              const displayNumber = votes.length - index; // 전체 데이터 개수 기반으로 최신순 번호 설정
              return (
                <div
                  key={index}
                  className={`vote-card ${
                    vote.RESULT_VOTE_MOD === "찬성" ? "approve" : vote.RESULT_VOTE_MOD === "반대" ? "against" : "abstain"
                  }`}
                >
                  <div className="vote-header">
                    <span>{displayNumber}</span> {/* 최신순 번호 */}
                    <span>{vote.BILL_NAME}</span>
                    <button onClick={() => toggleExpand(index)}>
                      {expanded[index] ? "-" : "+"}
                    </button>
                  </div>
                  {expanded[index] && (
                    <div className="vote-details">
                      <p>의안 번호: {vote.BILL_NO}</p>
                      <p>의결일자: {vote.VOTE_DATE}</p>
                      <p>소관위원회: {vote.CURR_COMMITTEE}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {displayVotes.length < votes.length && ( // 아직 표시할 데이터가 남아있다면 더보기 버튼 표시
          <button className="load-more" onClick={loadMore}>더보기</button>
        )}
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
