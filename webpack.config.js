module.exports = {
  entry: "./dist/main.js",
  output: {
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js&/,
        use: "babel-loader",
      },
    ],
  },
};
