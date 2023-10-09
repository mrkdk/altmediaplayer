import {contextBridge, ipcRenderer} from "electron";

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel:keyof MainChannelEventMap, data:any) => {
            ipcRenderer.send(channel, data);
        },

        receive: (channel:keyof RendererChannelEventMap, listener:(data?: any) => void) => {
            ipcRenderer.on(channel, (event, ...args) => listener(...args));
        }
  }
);