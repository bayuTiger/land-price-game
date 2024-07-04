// components/TopScreen.tsx
import React, { useState } from "react";
import PrefectureSelector from "./PrefectureSelector";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TopScreenProps {
  onStart: (prefecture: string, difficulty: number, cardCount: number) => void;
}

export const TopScreen: React.FC<TopScreenProps> = ({ onStart }) => {
  const [selectedPrefecture, setSelectedPrefecture] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [cardCount, setCardCount] = useState(2);

  return (
    <Card className="w-[350px] mx-auto">
      <CardHeader>
        <CardTitle>地価当てゲーム</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <PrefectureSelector onSelect={setSelectedPrefecture} />

          <div>
            <label className="block text-sm font-medium text-gray-700">
              難易度: {difficulty}
            </label>
            <Slider
              min={1}
              max={3}
              step={1}
              value={[difficulty]}
              onValueChange={(value) => setDifficulty(value[0])}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              カード数: {cardCount}
            </label>
            <Slider
              min={2}
              max={5}
              step={1}
              value={[cardCount]}
              onValueChange={(value) => setCardCount(value[0])}
            />
          </div>

          <Button
            onClick={() => onStart(selectedPrefecture, difficulty, cardCount)}
            disabled={!selectedPrefecture}
            className="w-full"
          >
            ゲーム開始
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};