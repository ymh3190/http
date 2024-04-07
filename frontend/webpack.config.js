const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const jsPath = "client/js";
const layoutsPath = jsPath + "/layouts";
const pagesPath = jsPath + "/pages";

module.exports = {
  entry: {
    css: path.join(__dirname, jsPath, "css"),

    base: path.join(__dirname, layoutsPath, "base"),
    signin: path.join(__dirname, pagesPath, "signin"),
    signup: path.join(__dirname, pagesPath, "signup"),

    mes: path.join(__dirname, layoutsPath, "mes"),
    client: path.join(__dirname, pagesPath, "client"),
    product: path.join(__dirname, pagesPath, "product"),
    commodity: path.join(__dirname, pagesPath, "commodity"),

    tube: path.join(__dirname, layoutsPath, "tube"),
    video: path.join(__dirname, pagesPath, "video"),
    image: path.join(__dirname, pagesPath, "image"),
  },
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "js/[name].js",
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
