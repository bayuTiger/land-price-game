// components/GameScreen.tsx
import React, { useState, useEffect } from "react";
import { LandPriceCard } from "./LandPriceCard";
import { getLandPriceData, LandPriceProperties } from "../utils/dataUtils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from 'lucide-react'; 


interface GameScreenProps {
  prefecture: string;
  cardCount: number;
  onGameEnd: (
    correctRounds: number,
    hintsUsed: number,
    cardCount: number
  ) => void;
  onReturnToTop: () => void;
}


export const GameScreen: React.FC<GameScreenProps> = ({
  prefecture,
  cardCount,
  onGameEnd,
  onReturnToTop,
}) => {
  const [landData, setLandData] = useState<LandPriceProperties[]>([]);
  const [currentCards, setCurrentCards] = useState<LandPriceProperties[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showAllInfo, setShowAllInfo] = useState(false);
  const [round, setRound] = useState(1);
  const [correctRounds, setCorrectRounds] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [revealedHints, setRevealedHints] = useState<number[]>([]);

  useEffect(() => {
    const data = getLandPriceData(prefecture);
    setLandData(data);
    selectNewCards(data);
  }, [prefecture, cardCount]);

  const selectNewCards = (data: LandPriceProperties[]) => {
    const shuffled = data.sort(() => 0.5 - Math.random());
    setCurrentCards(shuffled.slice(0, cardCount));
    setShowAllInfo(false);
    setSelectedIndex(null);
    setRevealedHints(Array(cardCount).fill(0));
  };

  const handleCardClick = (index: number) => {
    if (selectedIndex !== null) return; // カードが既に選択されている場合は何もしない
    setSelectedIndex(index);
    setShowAllInfo(true);
    const correct =
      currentCards[index].L02_006 ===
      Math.max(...currentCards.map((card) => card.L02_006));
    if (correct) {
      setCorrectRounds(correctRounds + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleNextRound = () => {
    if (round < 5) {
      setRound(round + 1);
      selectNewCards(landData);
    } else {
      onGameEnd(correctRounds, hintsUsed, cardCount);
    }
  };

  const handleHint = (cardIndex: number) => {
    if (revealedHints[cardIndex] < 3) {
      const newRevealedHints = [...revealedHints];
      newRevealedHints[cardIndex]++;
      setRevealedHints(newRevealedHints);
      setHintsUsed(hintsUsed + 1);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>どの地価が一番高いでしょうか？</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          className="mb-4 flex justify-between items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p>ラウンド: {round}/5</p>
            <p>正解数: {correctRounds}</p>
            <p>ヒント使用回数: {hintsUsed}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onReturnToTop}
            className="text-sm"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            トップに戻る
          </Button>
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div
            key={round}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {currentCards.map((card, index) => (
              <LandPriceCard
                key={index}
                data={card}
                onClick={() => handleCardClick(index)}
                isSelected={selectedIndex === index}
                isCorrect={
                  showAllInfo
                    ? card.L02_006 ===
                      Math.max(...currentCards.map((c) => c.L02_006))
                    : null
                }
                revealedHints={revealedHints[index]}
                onHint={() => handleHint(index)}
                disabled={selectedIndex !== null}
                showAllInfo={showAllInfo}
              />
            ))}
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          {showAllInfo && (
            <motion.div
              className="mt-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xl font-bold mb-2">
                {selectedIndex !== null &&
                currentCards[selectedIndex].L02_006 ===
                  Math.max(...currentCards.map((c) => c.L02_006))
                  ? "正解！"
                  : "不正解..."}
              </p>
              <Button onClick={handleNextRound}>
                {round < 5 ? "次のラウンドへ" : "ゲーム終了"}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};