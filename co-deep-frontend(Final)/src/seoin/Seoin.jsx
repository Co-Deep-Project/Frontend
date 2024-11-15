import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Seoin = () => {
  const navigate = useNavigate();
  const [votes, setVotes] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const ITEMS_PER_PAGE = 3;

  const memberName = "곽상언";

  const fetchVotesFromServer = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/vote_data?name=${memberName}`);
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setVotes(data);
      } else {
        console.error("서버에서 JSON 형식이 아닌 응답을 받았습니다.");
      }
    } catch (error) {
      console.error("서버 요청 오류:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVotesFromServer();
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const displayedVotes = votes.slice(0, page * ITEMS_PER_PAGE);

  return (
    <div className="desktop">
      <header className="tracking-header">
        <img src="/images/logo.png" alt="PoliTracker" className="logo" />
        <button className="home-button" onClick={() => navigate("/")}>Home</button>
      </header>

      {/* Profile Section */}
      <div className="card-profile">
        {/* Profile Details */}
        {/* ... */}
      </div>

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
          ) : displayedVotes.length === 0 ? (
            <p>표결 데이터가 없습니다.</p>
          ) : (
            displayedVotes.map((vote, index) => (
              <div
                key={index}
                className={`vote-card ${
                  vote.RESULT_VOTE_MOD === "찬성" ? "approve" : vote.RESULT_VOTE_MOD === "반대" ? "against" : "abstain"
                }`}
              >
                <div className="vote-header">
                  <span>{index + 1}</span>
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
          {page * ITEMS_PER_PAGE < votes.length && (
            <button className="load-more" onClick={loadMore}>더보기</button>
          )}
        </div>
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