const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => ({
  output: {
    filename: "assets/js/[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
  externals: {
    "@emotion/core": "emotionCore",
    xstate: "XState",
    "lottie-web": "lottie",
    react: "React",
    "react-dom": "ReactDOM",
  },
});
