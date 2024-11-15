import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Seoin = () => {
  const navigate = useNavigate();
  const [votes, setVotes] = useState([]); 
  const [displayVotes, setDisplayVotes] = useState([]); 
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
        setDisplayVotes(data.slice(0, ITEMS_PER_PAGE));
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
    const newPage = page + 1;
    const newDisplayVotes = votes.slice(0, newPage * ITEMS_PER_PAGE); 
    setDisplayVotes(newDisplayVotes); 
    setPage(newPage); 
  };

  return (
    <div className="desktop">
      <header className="tracking-header">
        <img src="/images/logo.png" alt="PoliTracker" className="logo" />
        <button className="home-button" onClick={() => navigate("/")}>Home</button>
      </header>

      <div className="card-profile">
        <div className="profile-container">
          <div className="left">
            <h1 className = "profile-name">곽상언</h1>
            <div>
            <p className = "profile-details">- 출생: 1971. 11. 18 서울특별시</p>
            <p className = "profile-details">- 학력: 서울대학교 법과대학 법학 석사</p>
            <p className = "profile-details">- 소속: 대한민국 국회의원</p>
            <p className = "profile-details">- 경력: <br />2024.05~ 제22대 국회의원 (서울 종로구/더불어민주당)<br />2024.05~ 대법원민주당 원내부대표</p>
          </div>
        </div>
        <div className = "right">
          <img src="https://search.pstatic.net/common?type=b&size=3000&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F3676da74-ffdf-481d-b7ca-a0853d27685b.png" 
          alt="Profile Image" className="profile-image"/>
            <div className="button-container">
              <a href="https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&mra=bjky&x_csa=%7B%22fromUi%22%3A%22kb%22%7D&pkid=1&os=168175&qvt=0&query=%EA%B3%BD%EC%83%81%EC%96%B8%20%EC%84%A0%EA%B1%B0%EC%9D%B4%EB%A0%A5" target="_blank" className="button">선거이력</a>
              <a href="https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&mra=bjky&x_csa=%7B%22fromUi%22%3A%22kb%22%7D&pkid=1&os=168175&qvt=0&query=%EA%B3%BD%EC%83%81%EC%96%B8%20%EC%B5%9C%EA%B7%BC%ED%99%9C%EB%8F%99" target="_blank" className="button">최근활동</a>
            </div>
          </div>
        </div>
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
          ) : displayVotes.length === 0 ? (
            <p>표결 데이터가 없습니다.</p>
          ) : (
            displayVotes.map((vote, index) => {
              const displayNumber = votes.length - index;
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

        {displayVotes.length < votes.length && ( 
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