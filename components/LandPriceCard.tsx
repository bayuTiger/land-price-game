// components/LandPriceCard.tsx
import React from "react";
import { LandPriceProperties } from "../utils/dataUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Train, TrendingUp } from "lucide-react";

interface LandPriceCardProps {
  data: LandPriceProperties;
  onClick: () => void;
  showPrice: boolean;
  isSelected: boolean;
  isCorrect: boolean;
  revealedHints: number;
  onHint: () => void;
}

export const LandPriceCard: React.FC<LandPriceCardProps> = ({
  data,
  onClick,
  showPrice,
  isSelected,
  isCorrect,
  revealedHints,
  onHint,
}) => {
  return (
    <Card
      className={`cursor-pointer transition-all duration-300 transform hover:scale-105
        ${
          isSelected
            ? isCorrect
              ? "bg-green-100 border-green-500"
              : "bg-red-100 border-red-500"
            : ""
        }
      `}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="text-lg">{data.L02_022.split("　")[1]}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {revealedHints >= 1 && (
            <p className="flex items-center">
              <MapPin className="mr-2" size={16} /> {data.L02_043}
            </p>
          )}
          {revealedHints >= 2 && (
            <p className="flex items-center">
              <Train className="mr-2" size={16} /> {data.L02_044} (徒歩
              {Math.round(data.L02_045 / 80)}分)
            </p>
          )}
          {revealedHints >= 3 && (
            <p className="flex items-center">
              <TrendingUp className="mr-2" size={16} /> 前年比: {data.L02_007}%
            </p>
          )}
          {showPrice && (
            <p className="text-xl font-bold mt-4">
              {data.L02_006.toLocaleString()}円/m²
            </p>
          )}
          {revealedHints < 3 && !showPrice && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onHint();
              }}
              className="mt-2"
            >
              ヒントを表示 ({revealedHints + 1}/3)
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
