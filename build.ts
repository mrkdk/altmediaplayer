import {build} from "electron-builder"

build({
    config: {
        appId: "com.altmediaplayer.app",
        productName: "ALT MediaPlayer",
        extraResources:[
            "./resources/ffmpeg.exe",
            "./resources/ffprobe.exe"
        ],
        win:{
            target: {
                target: "nsis",
                arch: [
                    "x64",
                ]
            },
            icon: "/src/static/img/icon.ico",
            fileAssociations: [
                {
                    "ext": ["mp4","mov","avi","wmv","webm","flv"],
                    "icon": "src/static/img/icon.ico",
                },
                {
                    "ext": "mp3",
                    "icon": "src/static/img/icon_audio.ico",
                },

            ]
        },
        linux:{
            target: "deb",
            category: "AudioVideo",
            icon: "./src/static/img/icon.icns",
            fileAssociations: [
                {
                    "ext": "mp4",
                  },
                  {
                    "ext": "mp3",
                  }
            ]
        },
        nsis: {
            oneClick: true,
            deleteAppDataOnUninstall:true,
            runAfterFinish: false,
        }
    },
});