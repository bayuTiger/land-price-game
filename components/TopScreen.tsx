import React, { useState } from "react";
import PrefectureSelector from "./PrefectureSelector";

interface TopScreenProps {
  onStart: (prefecture: string) => void;
}

const TopScreen: React.FC<TopScreenProps> = ({ onStart }) => {
  const [selectedPrefecture, setSelectedPrefecture] = useState("");

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">地価当てゲーム</h1>
      <PrefectureSelector onSelect={setSelectedPrefecture} />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => onStart(selectedPrefecture)}
        disabled={!selectedPrefecture}
      >
        Play
      </button>
    </div>
  );
};

export default TopScreen;
