// utils/dataUtils.ts
import landPriceData from "../data/L02-23.geojson";

interface Feature {
  properties: {
    L02_022: string;
    // 他のプロパティもここに追加できます
  };
}

export const getLandPriceData = (prefecture: string) => {
  return landPriceData.features
    .filter((feature: Feature) => {
      const fullPrefecture = feature.properties.L02_022.split("　")[0];
      return fullPrefecture === prefecture;
    })
    .map((feature: Feature) => feature.properties);
};