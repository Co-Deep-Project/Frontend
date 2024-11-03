import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => navigate("/seoin")}>Seoin Page로 이동</button>
    </div>
  );
}

export default Home;
