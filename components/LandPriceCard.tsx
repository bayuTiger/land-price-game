// components/LandPriceCard.tsx
import React, { useState } from "react";
import { LandPriceProperties } from "../utils/dataUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Train,
  TrendingUp,
  Calendar,
  HelpCircle,
  DollarSign,
} from "lucide-react";
import { motion } from "framer-motion";

interface LandPriceCardProps {
  data: LandPriceProperties;
  onClick: () => void;
  isSelected: boolean;
  isCorrect: boolean | null;
  revealedHints: number;
  onHint: () => void;
  disabled: boolean;
  showAllInfo: boolean;
}

export const LandPriceCard: React.FC<LandPriceCardProps> = ({
  data,
  onClick,
  isSelected,
  isCorrect,
  revealedHints,
  onHint,
  disabled,
  showAllInfo,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hintHoverTime, setHintHoverTime] = useState(0);

  const handleHintHoverStart = () => {
    const interval = setInterval(() => {
      setHintHoverTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  };

  const handleHintHoverEnd = () => {
    setHintHoverTime(0);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: isHovered ? [-1, 1, -1, 1, 0] : 0 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        className={`cursor-pointer transition-all duration-300
          ${isSelected ? "ring-2 ring-blue-500" : ""}
          ${
            showAllInfo
              ? isCorrect
                ? "bg-green-100 border-green-500"
                : "bg-red-100 border-red-500"
              : ""
          }
          ${disabled ? "opacity-50" : ""}
        `}
        onClick={disabled ? undefined : onClick}
      >
        <CardHeader>
          <CardTitle className="text-lg">
            {data.L02_022.split("　")[1]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="flex items-center">
              <Calendar className="mr-2" size={16} /> 調査年度: {data.L02_005}
            </p>
            {(revealedHints >= 1 || showAllInfo) && (
              <p className="flex items-center">
                <MapPin className="mr-2" size={16} /> {data.L02_043}
              </p>
            )}
            {(revealedHints >= 2 || showAllInfo) && (
              <p className="flex items-center">
                <Train className="mr-2" size={16} /> {data.L02_044} (徒歩
                {Math.round(data.L02_045 / 80)}分)
              </p>
            )}
            {(revealedHints >= 3 || showAllInfo) && (
              <p className="flex items-center">
                <TrendingUp className="mr-2" size={16} /> 前年比: {data.L02_007}
                %
              </p>
            )}
            {showAllInfo && (
              <p className="flex items-center text-xl font-bold mt-4">
                <DollarSign className="mr-2" size={20} />{" "}
                {data.L02_006.toLocaleString()}円/m²
              </p>
            )}
            {!showAllInfo && revealedHints < 3 && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                onHoverStart={handleHintHoverStart}
                onHoverEnd={handleHintHoverEnd}
              >
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onHint();
                  }}
                  className="mt-2 w-full"
                  disabled={disabled}
                >
                  {hintHoverTime < 3 ? (
                    <>
                      <HelpCircle className="mr-2" size={16} />
                      ヒントを表示 ({revealedHints + 1}/3)
                    </>
                  ) : (
                    "次のヒント: " +
                    (revealedHints === 0
                      ? "周辺の土地利用状況"
                      : revealedHints === 1
                      ? "最寄り駅情報"
                      : "前年比")
                  )}
                </Button>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
