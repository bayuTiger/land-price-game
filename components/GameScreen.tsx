import React, { useState, useEffect } from "react";
import LandPriceCard from "./LandPriceCard";
import { getLandPriceData } from "../utils/dataUtils";

interface GameScreenProps {
  prefecture: string;
}

const GameScreen: React.FC<GameScreenProps> = ({ prefecture }) => {
  const [landData, setLandData] = useState<any[]>([]);
  const [currentPair, setCurrentPair] = useState<any[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const data = getLandPriceData(prefecture);
    setLandData(data);
    selectNewPair(data);
  }, [prefecture]);

  const selectNewPair = (data: any[]) => {
    const shuffled = data.sort(() => 0.5 - Math.random());
    setCurrentPair(shuffled.slice(0, 2));
    setShowResult(false);
  };

  const handleChoice = (index: number) => {
    const correct =
      currentPair[index].L02_006 >= currentPair[1 - index].L02_006;
    setIsCorrect(correct);
    setShowResult(true);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">
        どちらの地価が高いでしょうか？
      </h2>
      <div className="flex justify-center space-x-4">
        {currentPair.map((item, index) => (
          <LandPriceCard
            key={index}
            data={item}
            onClick={() => handleChoice(index)}
            showPrice={showResult}
          />
        ))}
      </div>
      {showResult && (
        <div className="mt-4">
          <p
            className={`text-xl font-bold ${
              isCorrect ? "text-green-500" : "text-red-500"
            }`}
          >
            {isCorrect ? "正解！" : "不正解…"}
          </p>
        </div>
      )}
      <div className="mt-4 space-x-4">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded"
          onClick={() => selectNewPair(landData)}
        >
          次の問題へ
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => window.location.reload()}
        >
          都道府県を選択する
        </button>
      </div>
    </div>
  );
};

export default GameScreen;
