import fs from "fs"
import path from "path";
import Util from "./util";

const CONFIG_FILE_NAME = "mediaplayer.config.json"

const defaultConfig :Mp.Config = {
    bounds: {width:1200, height:800, x:0, y:0},
    playlistBounds: {width:400, height:700, x:0, y:0},
    isMaximized: false,
    playlistVisible:true,
    theme:"dark",
    sort:{
        order:"NameAsc",
        groupBy:false,
    },
    video:{
        playbackSpeed:1,
        seekSpeed:10,
        fitToWindow: true,
    },
    audio:{
        volume: 1,
        ampLevel: 0.07,
        mute:false,
    },
    path:{
        captureDestDir:"",
        convertDestDir:"",
        playlistDestDir:"",
    }
}

export default class Config{

    data:Mp.Config;

    private file:string;
    private util = new Util();

    constructor(workingDirectory:string){
        this.data = defaultConfig;
        const directory = process.env.NODE_ENV === "development" ? path.join(__dirname, "..", "..", "temp") : path.join(workingDirectory, "temp");
        this.util.exists(directory, true);
        this.file = path.join(directory, CONFIG_FILE_NAME)
        this.init();
    }

    private init(){

        const fileExists = this.util.exists(this.file, false);

        if(fileExists){

            const rawData = fs.readFileSync(this.file, {encoding:"utf8"});
            this.data = this.createConfig(JSON.parse(rawData))

        }else{

            fs.writeFileSync(this.file, JSON.stringify(this.data));

        }
    }

    private createConfig(rawConfig:any):Mp.Config{

        const config = {...defaultConfig} as any;

        Object.keys(rawConfig).forEach(key => {

            if(!(key in config)) return;

            const value = rawConfig[key];

            if(typeof value === "object"){

                Object.keys(value).forEach(valueKey => {
                    if(valueKey in config[key]){
                        config[key][valueKey] = value[valueKey]
                    }
                })
            }else{
                config[key] = value;
            }
        })

        return config;
    }

    save(){
        fs.writeFileSync(this.file, JSON.stringify(this.data));
    }

}


