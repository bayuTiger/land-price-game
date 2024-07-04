import React, { useState } from "react";
import TopScreen from "../components/TopScreen";
import GameScreen from "../components/GameScreen";

const IndexPage: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedPrefecture, setSelectedPrefecture] = useState("");

  const startGame = (prefecture: string) => {
    setSelectedPrefecture(prefecture);
    setGameStarted(true);
  };

  return (
    <div className="container mx-auto p-4">
      {!gameStarted ? (
        <TopScreen onStart={startGame} />
      ) : (
        <GameScreen prefecture={selectedPrefecture} />
      )}
    </div>
  );
};

export default IndexPage;
