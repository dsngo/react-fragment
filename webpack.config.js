const { resolve } = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const modeConfig = (env) => require(`./build-utils/webpack.${env}`)(env);
const presetConfig = require("./build-utils/loadPresets");
const { bool } = require("prop-types");
const path = (uri) => resolve(__dirname, uri);

const cdns = [
  "https://unpkg.com/react@17.0.0-rc.3/umd/react.production.min.js",
  "https://unpkg.com/react-dom@17.0.0-rc.3/umd/react-dom.production.min.js",
  "https://unpkg.com/@emotion/core@10/dist/core.umd.min.js",
];

const tempScripts = (function () {
  return cdns
    .map(
      (e) => `<script crossorigin type="text/javascript" src="${e}"></script>`
    )
    .join("");
})();

module.exports = (
  { mode, presets, build } = { mode: "production", presets: [] }
) => {
  if (!build) {
    build = "YAYAY";
  }

  return merge(
    {
      mode,
      entry: path("src/index.js"),
      output: {
        path: path("dist"),
        chunkFilename: "assets/js/[name].lazy-chunk.js",
      },
      plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: path("src/template.html"),
          title: mode == "production" ? "" : " dev",
          scripts: mode == "production" ? tempScripts : "",
        }),
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
          "process.env": {
            NODE_ENV: JSON.stringify(mode),
          },
        }),
      ],
      module: {
        rules: [
          {
            test: /\.jsx?$/i,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  [
                    "@babel/preset-react",
                    { runtime: "automatic", development: mode != "production" },
                  ],
                  "@emotion/babel-preset-css-prop",
                  "@babel/preset-env",
                ],
                cacheDirectory: true,
                plugins: [mode != "production" && "react-refresh/babel"].filter(
                  Boolean
                ),
              },
            },
            exclude: /node_modules/,
          },
          {
            test: /\.(bmp|gif|jpe?g|svg|png)$/i,
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "assets/img/[name].[contenthash:8].[ext]",
            },
          },
          {
            test: /family1.png$/i,
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "assets/[name].[ext]",
            },
          },
        ],
      },
    },
    modeConfig(mode),
    presetConfig({ mode, presets })
  );
};
