import type { ForgeConfig } from "@electron-forge/shared-types";
import { WebpackPlugin } from "@electron-forge/plugin-webpack";
import { mainConfig } from "./webpack.main.config";
import { rendererConfig } from "./webpack.renderer.config";
import fs from "fs/promises"
import path from "path"

const config: ForgeConfig = {
  plugins: [
      new WebpackPlugin({
        mainConfig,
        renderer: {
          config: rendererConfig,
          entryPoints: [
            {
              html: "./src/renderer/player/player.html",
              js: "./src/renderer/player/player.ts",
              name: "player_window",
              preload: {
                js: "./src/renderer/preload.ts",
              },
            },
            {
              html: "./src/renderer/playlist/playlist.html",
              js: "./src/renderer/playlist/playlist.ts",
              name: "playlist_window",
              preload: {
                js: "./src/renderer/preload.ts",
              },
            },
            {
              html: "./src/renderer/convert/convert.html",
              js: "./src/renderer/convert/convert.ts",
              name: "convert_window",
              preload: {
                js: "./src/renderer/preload.ts",
              },
            },
          ],
        },
      }),
  ],
  hooks: {
    postPackage: async (_forgeConfig: any, packageResult: any) => {
        // remove out folder produced by Electron Forge
        fs.rm(path.join(packageResult.outputPaths[0], ".."), {recursive:true})
    }
  }
};

export default config;
