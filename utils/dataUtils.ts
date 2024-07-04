// utils/dataUtils.ts
import landPriceData from "../data/L02-23.json";

interface LandPriceProperties {
  L02_001: string;
  L02_002: string;
  L02_003: string;
  L02_004: string;
  L02_005: number;
  L02_006: number;
  L02_007: number;
  L02_022: string;
  L02_043: string;
  L02_044: string;
  L02_045: number;
  [key: string]: string | number; // その他のプロパティに対応
}

interface Feature {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: number[]; // [number, number] から number[] に変更
  };
  properties: LandPriceProperties;
}

interface LandPriceData {
  type: "FeatureCollection";
  name: string;
  features: Feature[];
}

// 型ガードを追加
function isLandPriceData(data: any): data is LandPriceData {
  return (
    data.type === "FeatureCollection" &&
    Array.isArray(data.features) &&
    data.features.every(
      (feature: any) =>
        feature.type === "Feature" &&
        feature.geometry?.type === "Point" &&
        Array.isArray(feature.geometry.coordinates) &&
        typeof feature.properties === "object"
    )
  );
}

// 型ガードを使用してデータをチェック
if (!isLandPriceData(landPriceData)) {
  throw new Error("Invalid land price data format");
}

const typedLandPriceData = landPriceData as LandPriceData;

export const getLandPriceData = (prefecture: string): LandPriceProperties[] => {
  return typedLandPriceData.features
    .filter((feature) => {
      const fullPrefecture = feature.properties.L02_022.split("　")[0];
      return fullPrefecture === prefecture;
    })
    .map((feature) => feature.properties);
};

export type { LandPriceProperties };