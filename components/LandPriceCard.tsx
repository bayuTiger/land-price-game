// components/LandPriceCard.tsx
import React from "react";
import { LandPriceProperties } from "../utils/dataUtils";

interface LandPriceCardProps {
  data: LandPriceProperties;
  onClick: () => void;
  showPrice: boolean;
}

const LandPriceCard: React.FC<LandPriceCardProps> = ({
  data,
  onClick,
  showPrice,
}) => {
  return (
    <div className="border p-4 rounded cursor-pointer" onClick={onClick}>
      <p>住所: {data.L02_022}</p>
      <p>調査年度: {data.L02_005}</p>
      <p>周辺土地の利用状況: {data.L02_043}</p>
      <p>最寄り駅名: {data.L02_044}</p>
      <p>最寄り駅までの道路距離: {data.L02_045}m</p>
      <p>対前年変動率: {data.L02_007}%</p>
      {showPrice && <p className="font-bold">地価: {data.L02_006}円/m²</p>}
    </div>
  );
};

export default LandPriceCard;
