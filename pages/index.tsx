// pages/index.tsx
import React, { useState } from "react";
import { TopScreen } from "../components/TopScreen";
import { GameScreen } from "../components/GameScreen";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
      <AnimatePresence mode="wait">
        {gameState === "start" && (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <TopScreen onStart={startGame} />
          </motion.div>
        )}
        {gameState === "playing" && (
          <motion.div
            key="playing"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <GameScreen
              prefecture={selectedPrefecture}
              cardCount={cardCount}
              onGameEnd={endGame}
              onReturnToTop={restartGame}
            />
          </motion.div>
        )}
        {gameState === "end" && (
          <motion.div
            key="end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
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
                <p className="text-center mb-4">
                  総合スコア: {calculateScore()}
                </p>
                <Button onClick={restartGame} className="w-full">
                  もう一度プレイ
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
