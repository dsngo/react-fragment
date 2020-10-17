// gzip production code
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = () => ({
  plugins: [
    new CompressionPlugin({
      exclude: /HtmlWebpackPlugin|\.txt$/,
    }),
  ],
});
