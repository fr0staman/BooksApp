module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["."],
        extensions: [".js", ".ts", ".tsx", ".json"],
        alias: {
          "@/assets": "./assets",
          "@": "./src",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
