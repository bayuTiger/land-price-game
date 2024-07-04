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
  const [cardCount, setCardCount] = useState(2);
  const [correctRounds, setCorrectRounds] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);

  const startGame = (prefecture: string, count: number) => {
    setSelectedPrefecture(prefecture);
    setCardCount(count);
    setGameState("playing");
  };

  const endGame = (correct: number, hints: number, count: number) => {
    setCorrectRounds(correct);
    setHintsUsed(hints);
    setCardCount(count);
    setGameState("end");
  };

  const restartGame = () => {
    setGameState("start");
    setCorrectRounds(0);
    setHintsUsed(0);
  };

  const calculateScore = () => {
    const baseScore = correctRounds * 100;
    const cardCountBonus = cardCount * 20;
    const hintPenalty = hintsUsed * 10;
    return baseScore + cardCountBonus - hintPenalty;
  };

  return (
    <div className="container mx-auto p-4">
      {gameState === "start" && <TopScreen onStart={startGame} />}
      {gameState === "playing" && (
        <GameScreen
          prefecture={selectedPrefecture}
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
            <p className="text-center mb-2">使用したヒント: {hintsUsed}</p>
            <p className="text-center mb-2">カード数: {cardCount}</p>
            {/* <p className="text-center mb-4">総合スコア: {calculateScore()}</p> */}
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
