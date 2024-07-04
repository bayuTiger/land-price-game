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
  const [correctRounds, setCorrectRounds] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);

  const startGame = (prefecture: string, diff: number, count: number) => {
    setSelectedPrefecture(prefecture);
    setDifficulty(diff);
    setCardCount(count);
    setGameState("playing");
  };

  const endGame = (correct: number, hints: number) => {
    setCorrectRounds(correct);
    setHintsUsed(hints);
    setGameState("end");
  };

  const restartGame = () => {
    setGameState("start");
    setCorrectRounds(0);
    setHintsUsed(0);
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
          onReturnToTop={restartGame}
        />
      )}
      {gameState === "end" && (
        <Card className="w-[350px] mx-auto">
          <CardHeader>
            <CardTitle>ゲーム終了</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-2">
              正解したラウンド: {correctRounds}/5
            </p>
            <p className="text-center mb-4">使用したヒント: {hintsUsed}</p>
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
