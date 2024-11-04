import React from 'react';
import './yunji.css';

const CardProfile = ({ handleButtonClick }) => (
  <div className="card-profile">
    <img
      src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/4j2ycj53e2f-8%3A896?alt=media&token=0c9160b6-b079-4606-a2b3-2df90a9fe7ca"
      alt="Not Found"
      className="background-image"
    />
    <p className="profile-name">Anindita Rahmawati</p>
    <div className="location">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/4j2ycj53e2f-8%3A899?alt=media&token=2ef1843b-3089-43c7-87ce-8f11d1e15692"
        alt="Not Found"
        className="country-flag"
      />
      <p className="country-name">Indonesia</p>
    </div>
    <div className="biography-section">
      <p className="section-title">Biography</p>
      <div className="personal-info-wrapper">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/4j2ycj53e2f-8%3A922?alt=media&token=bf381914-316a-4c78-9f6c-d01a3d08c126"
          alt="Not Found"
          className="profile-image"
        />
        <div className="personal-info">
          <p className="info-text">Age : 27</p>
          <p className="info-text">Birth : 24 - 02 - 1993</p>
          <p className="info-text">Sex : Woman</p>
          <p className="info-text">WTA : 10</p>
        </div>
      </div>
      <p className="section-title">Social Media</p>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/4j2ycj53e2f-8%3A917?alt=media&token=e1db576a-a338-496d-b037-4fd4beeee3d2"
        alt="Not Found"
        className="social-icons"
      />
    </div>

  </div>
);

export default CardProfile;