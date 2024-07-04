// utils/dataUtils.ts
import landPriceData from "../data/L02-23.geojson";

export const getLandPriceData = (prefecture: string) => {
  return landPriceData.features
    .filter((feature) => {
      const fullPrefecture = feature.properties.L02_022.split("　")[0];
      return fullPrefecture === prefecture;
    })
    .map((feature) => feature.properties);
};
