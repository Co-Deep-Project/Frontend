import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Html } from '@react-three/drei';
import Book from './book';
import QuestionScreen from '../mbti/QuestionScreen';
import BackgroundScene from './background';

function Player({ onReachQuizLocation }) {
  const playerRef = useRef();
  const [position, setPosition] = useState([0, 1, 0]);

  // 키보드 입력 감지
  const handleKeyDown = (event) => {
    setPosition((prev) => {
      const [x, y, z] = prev;
      if (event.key === 'ArrowUp') return [x, y, z - 0.5];
      if (event.key === 'ArrowDown') return [x, y, z + 0.5];
      if (event.key === 'ArrowLeft') return [x - 0.5, y, z];
      if (event.key === 'ArrowRight') return [x + 0.5, y, z];
      return prev;
    });
  };

  // 터치 입력 감지
  const handleTouchMove = (event) => {
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;
    setPosition((prev) => {
      const [x, y, z] = prev;
      if (touchX < window.innerWidth / 2) return [x - 0.5, y, z];
      if (touchX > window.innerWidth / 2) return [x + 0.5, y, z];
      if (touchY < window.innerHeight / 2) return [x, y, z - 0.5];
      if (touchY > window.innerHeight / 2) return [x, y, z + 0.5];
      return prev;
    });
  };

  useFrame(() => {
    if (playerRef.current) {
      playerRef.current.position.set(...position);
      if (position[2] < -10) onReachQuizLocation();
    }
  });

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <mesh ref={playerRef} position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

function GameScene({ setQuizActive }) {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 5, 10]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Player onReachQuizLocation={() => setQuizActive(true)} />
    </Canvas>
  );
}

function Game() {
  const [quizActive, setQuizActive] = useState(false);

  const handleBookOpen = () => {
    alert("Entering the history...");
  }

  return (
    <div>
      <h1>Click the book to start your journey!</h1>
      <BackgroundScene />
      <Book onOpen={handleBookOpen} />
      <GameScene setQuizActive={setQuizActive} />
      {quizActive && (
        <Html>
          <div>
            <h1>Quiz Activated!</h1>
          </div>
        </Html>
      )}
    </div>
  );
}

export default Game;
