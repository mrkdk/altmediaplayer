import {build} from "electron-builder"

build({
    config: {
        appId: "MediaPlayer",
        productName: "MediaPlayer",
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
                    //"description": "Video File",
                },
                {
                    "ext": "mp3",
                    "icon": "src/static/img/icon_audio.ico",
                    //"description": "Audio File"
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
                    //"icon": "src/static/img/icon.ico",
                    //"description": "Video File",
                  },
                  {
                    "ext": "mp3",
                    //"icon": "src/static/img/icon_audio.ico",
                    //"description": "Audio File"
                  }
            ]
        },
        nsis: {
            oneClick: true,
            allowToChangeInstallationDirectory: false,
            runAfterFinish: false,
        }
    },
});