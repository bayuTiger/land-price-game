// components/TopScreen.tsx
import React, { useState } from "react";
import PrefectureSelector from "./PrefectureSelector";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface TopScreenProps {
  onStart: (prefecture: string, cardCount: number) => void;
}

export const TopScreen: React.FC<TopScreenProps> = ({ onStart }) => {
  const [selectedPrefecture, setSelectedPrefecture] = useState("");
  const [cardCount, setCardCount] = useState(2);

  return (
    <Card className="w-[350px] mx-auto">
      <CardHeader>
        <CardTitle>どっちの地価が高いでしょうか！</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <PrefectureSelector onSelect={setSelectedPrefecture} />

          <div>
            <Label>選択肢の数: {cardCount}</Label>
            <Slider
              min={2}
              max={5}
              step={1}
              value={[cardCount]}
              onValueChange={(value) => setCardCount(value[0])}
            />
          </div>

          <Button
            onClick={() => onStart(selectedPrefecture, cardCount)}
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
