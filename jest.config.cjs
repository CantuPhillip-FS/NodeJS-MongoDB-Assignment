/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  // Tell Jest to use ts-jest and pass it your test tsconfig
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
  },

  // This is the key bit: map relative ".../something.js" → ".../something"
  // so Jest can find your .ts files.
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },

  testMatch: ["**/*.test.ts", "**/*.spec.ts"],
};
