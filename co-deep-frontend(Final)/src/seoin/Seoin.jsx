import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Seoin = () => {
  const navigate = useNavigate();
  const [votes, setVotes] = useState([]); // 표결 데이터 상태
  const [expanded, setExpanded] = useState({}); // 펼침 상태
  const [page, setPage] = useState(1); // 페이지 상태
  const ITEMS_PER_PAGE = 3; // 페이지 당 표시할 항목 수

  const memberName = "곽상언"; // 국회의원 이름

  // Node.js 서버에서 표결 데이터 가져오기
  const fetchVotesFromServer = async (page) => {
    try {
      const response = await fetch(`http://localhost:3000/api/vote_data?name=${memberName}`);
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        // 페이지에 맞게 데이터를 슬라이스해서 반환
        const paginatedData = data.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
        return paginatedData;
      } else {
        console.error("서버에서 JSON 형식이 아닌 응답을 받았습니다.");
        return [];
      }
    } catch (error) {
      console.error("서버 요청 오류:", error);
      return [];
    }
  };

  // 페이지 로드 시 초기 데이터 불러오기
  useEffect(() => {
    const loadInitialVotes = async () => {
      const initialVotes = await fetchVotesFromServer(page);
      setVotes(initialVotes); // 초기 3개의 데이터만 세팅
    };
    loadInitialVotes();
  }, []); // 페이지 로드 시 한 번만 실행

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 추가 데이터를 불러오는 함수 (더보기 버튼 클릭 시)
  const loadMore = async () => {
    const additionalVotes = await fetchVotesFromServer(page + 1);
    setVotes((prevVotes) => [...prevVotes, ...additionalVotes]); // 이전 votes 상태에 추가 데이터 더하기
    setPage(page + 1); // 페이지 수 증가
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
          {votes.length === 0 ? (
            <p>표결 데이터가 없습니다.</p>
          ) : (
            votes.map((vote, index) => (
              <div
                key={index}
                className={`vote-card ${
                  vote.RESULT_VOTE_MOD === "찬성" ? "approve" : vote.RESULT_VOTE_MOD === "반대" ? "against" : "abstain"
                }`}
              >
                <div className="vote-header">
                  <span>{vote.BILL_NO}</span>
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
            ))
          )}
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