import type { Configuration } from "webpack";
import webpack from "webpack"
import { rules } from "./webpack.rules";

export const mainConfig: Configuration = {
  entry: "./src/main/index.ts",
  module: {
    rules,
  },
  externals: {},
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
  plugins: [
    new webpack.DefinePlugin({
        "process.env.FLUENTFFMPEG_COV": false
    })
  ]
};
