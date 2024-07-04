// pages/index.tsx
import React, { useState } from "react";
import { TopScreen } from "../components/TopScreen";
import { GameScreen } from "../components/GameScreen";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const App: React.FC = () => {
  const [gameState, setGameState] = useState<"start" | "playing" | "end">(
    "start"
  );
  const [selectedPrefecture, setSelectedPrefecture] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [cardCount, setCardCount] = useState(2);
  const [finalScore, setFinalScore] = useState(0);

  const startGame = (prefecture: string, diff: number, count: number) => {
    setSelectedPrefecture(prefecture);
    setDifficulty(diff);
    setCardCount(count);
    setGameState("playing");
  };

  const endGame = () => {
    setGameState("end");
  };

  const restartGame = () => {
    setGameState("start");
  };

  return (
    <div className="container mx-auto p-4">
      {gameState === "start" && <TopScreen onStart={startGame} />}
      {gameState === "playing" && (
        <GameScreen
          prefecture={selectedPrefecture}
          difficulty={difficulty}
          cardCount={cardCount}
          onGameEnd={endGame}
        />
      )}
      {gameState === "end" && (
        <Card className="w-[350px] mx-auto">
          <CardHeader>
            <CardTitle>ゲーム終了</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-4">最終スコア: {finalScore}</p>
            <Button onClick={restartGame} className="w-full">
              もう一度プレイ
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default App;
