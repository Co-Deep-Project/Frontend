import React from 'react';
import './yunji.css';

const CardProfile = ({ handleButtonClick }) => (
  <div className="card-profile">
    <div className="overall-container">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/4j2ycj53e2f-8%3A896?alt=media&token=0c9160b6-b079-4606-a2b3-2df90a9fe7ca"
        alt="Background"
        className="background-image rectangle-45"
      />
      <p className="profile-name anindita-rahmawati">종로구 곽상언</p>
      <div className="country">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/4j2ycj53e2f-8%3A899?alt=media&token=2ef1843b-3089-43c7-87ce-8f11d1e15692"
          alt="Flag"
          className="country-flag secondary-flag"
        />
        <p className="country-name">Indonesia</p>
      </div>
      
      <div className="biography-section">
        <p className="biography">Biography</p>
        
        <div className="personal-picture">
          <img
            src="https://i.namu.wiki/i/Hyb68EgZmqFYUUWoXpnydnLQPwnWLa2wguT_yXdW_NGRljf4r_vWv1cz3ZJjRn1U-g_A-xA4XR214drxxJ4habkbu-_bV0-ak8xz1nE0zGhki8dg3s59xJgcc7_uNcJHQXd8D5vd5x3WsZVTNCslYw.webp"
            alt="Profile"
            className="profile-image group-106"
          />
          <div className="personal-info frame-96">
            <p className="info-text">Age : 52</p>
            <p className="info-text">Birth : 18 - 11 - 1971</p>
            <p className="info-text">Sex : Male</p>
          </div>
        </div>

        <p className="social-media">Social Media</p>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/4j2ycj53e2f-8%3A917?alt=media&token=e1db576a-a338-496d-b037-4fd4beeee3d2"
          alt="Social Icons"
          className="social-icons group-95"
        />
      </div>
    </div>
  </div>
);

export default CardProfile;
