// utils/dataUtils.ts
import landPriceData from "../data/L02-23.json";

interface LandPriceProperties {
  L02_005: number;
  L02_006: number;
  L02_007: number;
  L02_022: string;
  L02_043: string;
  L02_044: string;
  L02_045: number;
  // 他の必要なプロパティをここに追加
}

interface Feature {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: LandPriceProperties;
}

interface LandPriceData {
  type: "FeatureCollection";
  name: string;
  features: Feature[];
}

// landPriceDataの型アサーション
const typedLandPriceData = landPriceData as LandPriceData;

export const getLandPriceData = (prefecture: string): LandPriceProperties[] => {
  return typedLandPriceData.features
    .filter((feature) => {
      const fullPrefecture = feature.properties.L02_022.split("　")[0];
      return fullPrefecture === prefecture;
    })
    .map((feature) => feature.properties);
};

export type { LandPriceProperties }; // 他のファイルでも使用できるようにエクスポート
