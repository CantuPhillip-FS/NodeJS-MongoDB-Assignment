/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",

  // Important so Jest treats TS files as ESM
  extensionsToTreatAsEsm: [".ts"],

  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      { useESM: true, tsconfig: "tsconfig.test.json" },
    ],
  },

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};
