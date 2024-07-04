// components/GameScreen.tsx
import React, { useState, useEffect } from "react";
import { LandPriceCard } from "./LandPriceCard";
import { getLandPriceData, LandPriceProperties } from "../utils/dataUtils";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import confetti from "canvas-confetti";

interface GameScreenProps {
  prefecture: string;
  difficulty: number;
  cardCount: number;
  onGameEnd: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  prefecture,
  difficulty,
  cardCount,
  onGameEnd,
}) => {
  const [landData, setLandData] = useState<LandPriceProperties[]>([]);
  const [currentCards, setCurrentCards] = useState<LandPriceProperties[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);

  useEffect(() => {
    const data = getLandPriceData(prefecture);
    setLandData(data);
    selectNewCards(data);
  }, [prefecture]);

  const selectNewCards = (data: LandPriceProperties[]) => {
    const shuffled = data.sort(() => 0.5 - Math.random());
    setCurrentCards(shuffled.slice(0, cardCount));
    setShowResult(false);
    setSelectedIndex(null);
  };

  const handleCardClick = (index: number) => {
    setSelectedIndex(index);
    const correct =
      currentCards[index].L02_006 ===
      Math.max(...currentCards.map((card) => card.L02_006));
    if (correct) {
      setScore(score + difficulty);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
    setShowResult(true);
  };

  const handleNextRound = () => {
    if (round < 10) {
      setRound(round + 1);
      selectNewCards(landData);
    } else {
      onGameEnd();
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>どの地価が一番高いでしょうか？</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p>ラウンド: {round}/10</p>
          <p>スコア: {score}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentCards.map((card, index) => (
            <LandPriceCard
              key={index}
              data={card}
              onClick={() => handleCardClick(index)}
              showPrice={showResult}
              isSelected={selectedIndex === index}
              isCorrect={
                showResult &&
                card.L02_006 === Math.max(...currentCards.map((c) => c.L02_006))
              }
            />
          ))}
        </div>
        {showResult && (
          <div className="mt-4 text-center">
            <p className="text-xl font-bold mb-2">
              {selectedIndex !== null &&
              currentCards[selectedIndex].L02_006 ===
                Math.max(...currentCards.map((c) => c.L02_006))
                ? "正解！"
                : "不正解..."}
            </p>
            <Button onClick={handleNextRound}>
              {round < 10 ? "次のラウンドへ" : "ゲーム終了"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
