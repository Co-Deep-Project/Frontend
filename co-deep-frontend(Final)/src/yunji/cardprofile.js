import React from 'react';
import './cardprofile.css';

const CardProfile = () => (
    <div className="card-profile">
      <div className="profile-container">
        <div>
        <h1 className = "profile-name">홍길동</h1>
        <div className = "left">
        <p className = "profile-details">출생: 1971. 11. 18 서울특별시</p>
        <p className = "profile-details">학력: 서울대학교 법과대학 법학 사사</p>
        <p className = "profile-details">소속: 대한민국 국회의원</p>
        <p className = "profile-details">경력: 2024.05~ 제22대 국회의원 (서울 종로구/더불어민주당)<br />2024.05~ 대법원민주당 원내부대표</p>
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
);

export default CardProfile;
