import React from "react";
import "./StartScreen.css"; // 시작 화면 스타일링
import { motion } from "framer-motion";
import styles from "./StartScreen.module.css";
import { Typewriter } from "react-simple-typewriter";

const StartScreen = ({ onNext }) => {
  return (
    <div className="start-screen">
      <div className="content">
      <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          >
          <h1 className={styles.title}>
            {" "}
            <span className={styles.highlight}>
              <Typewriter
                words={["정치 성향 테스트에 오신 것을 환영합니다","Welcome!!"]}
                loop={Infinity}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </h1>
          </motion.div>
        <p className="sub-heading">지금 확인해보세요!</p>
        <button className="start-button" onClick={onNext}>
          시작하기
        </button>
      </div>
    </div>
  );
};

export default StartScreen;

