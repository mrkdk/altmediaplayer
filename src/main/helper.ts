import { BrowserWindow, Menu, nativeImage } from "electron"
import path from "path"

export default class Helper{

    createPlayerWindow(config:Mp.Config){

        const window = new BrowserWindow({
            width: config.bounds.width,
            height: config.bounds.height,
            x:config.bounds.x,
            y:config.bounds.y,
            autoHideMenuBar: true,
            show: false,
            icon: path.join(__dirname, "..", "static", "img", "icon.ico"),
            frame: false,
            fullscreenable:true,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                preload: PLAYER_WINDOW_PRELOAD_WEBPACK_ENTRY,
            },
        });

        window.loadURL(PLAYER_WINDOW_WEBPACK_ENTRY);

        return window

    }

    createPlaylistWindow(parent:BrowserWindow, config:Mp.Config){

        const window = new BrowserWindow({
            parent,
            width: config.playlistBounds.width,
            height: config.playlistBounds.height,
            x:config.playlistBounds.x,
            y:config.playlistBounds.y,
            autoHideMenuBar: true,
            show: false,
            frame:false,
            transparent:true,
            minimizable: false,
            maximizable: false,
            fullscreenable:false,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                preload: PLAYLIST_WINDOW_PRELOAD_WEBPACK_ENTRY,
            },
        })

        window.loadURL(PLAYLIST_WINDOW_WEBPACK_ENTRY);

        return window;
    }

    createConvertWindow(parent:BrowserWindow){

        const window = new BrowserWindow({
            parent,
            width:640,
            height:700,
            resizable: true,
            autoHideMenuBar: true,
            show: false,
            frame:false,
            modal:true,
            minimizable: false,
            maximizable: false,
            fullscreenable:false,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                preload: CONVERT_WINDOW_PRELOAD_WEBPACK_ENTRY
            },
        })

        window.loadURL(CONVERT_WINDOW_WEBPACK_ENTRY);

        return window;
    }

    createPlayerContextMenu(config:Mp.Config, onclick: (menu:Mp.PlayerContextMenuType, args?:any) => void){
        const template:Electron.MenuItemConstructorOptions[] = [
            {
                label: "Playback Speed",
                submenu: this.playbackSpeedMenu(onclick)
            },
            {
                label: "Seek Speed",
                submenu: this.seekSpeedMenu(onclick)
            },
            {
                label: "Fit To Window Size",
                type: "checkbox",
                checked: config.video.fitToWindow,
                click: () => onclick("FitToWindow"),
            },
            { type: 'separator' },
            {
                label: "Playlist",
                accelerator: "CmdOrCtrl+P",
                click: () => onclick("TogglePlaylistWindow")
            },
            {
                label: "Toggle Fullscreen",
                accelerator:"F11",
                click: () => onclick("ToggleFullscreen"),
            },
            {
                label: "Picture In Picture",
                click: () => onclick("PictureInPicture"),
            },
            { type: 'separator' },
            {
                label: "Capture",
                accelerator: "CmdOrCtrl+S",
                click: () => onclick("Capture"),
            },
            { type: 'separator' },
            {
                label: "Theme",
                submenu:this.themeMenu(config, onclick)
            },

        ]

        return Menu.buildFromTemplate(template)
    }

    private themeMenu(config:Mp.Config, onclick: (menu:Mp.PlayerContextMenuType, args?:Mp.ContextMenuSubType) => void){
        const type = "Theme"
        const template:Electron.MenuItemConstructorOptions[] = [
            {
                id: "themeLight",
                label:"Light",
                type:"checkbox",
                checked: config.theme === "light",
                click: (menuItem) => this.toggleMenuItemCheckbox(menuItem, () => onclick(type, "light"))
            },
            {
                id: "themeDark",
                label:"Dark",
                type:"checkbox",
                checked: config.theme === "dark",
                click: (menuItem) => this.toggleMenuItemCheckbox(menuItem, () => onclick(type, "dark"))
            },
        ]

        return Menu.buildFromTemplate(template);
    }

    private playbackSpeedMenu(onclick: (menu:Mp.PlayerContextMenuType, args?:Mp.ContextMenuSubType) => void){

        const type = "PlaybackSpeed"
        const template:Electron.MenuItemConstructorOptions[] = [
            {
                id: "playbackrate0",
                label:"0.25",
                type:"checkbox",
                click: (menuItem) => this.toggleMenuItemCheckbox(menuItem, () => onclick(type, 0.25))
            },
            {
                id: "playbackrate1",
                label:"0.5",
                type:"checkbox",
                click: (menuItem) => this.toggleMenuItemCheckbox(menuItem, () => onclick(type, 0.5))
            },
            {
                id: "playbackrate2",
                label:"0.75",
                type:"checkbox",
                click: (menuItem) => this.toggleMenuItemCheckbox(menuItem, () => onclick(type, 0.75))
            },
            {
                id: "playbackrate3",
                label:"1 - Default",
                type:"checkbox",
                checked:true,
                click: (menuItem) => this.toggleMenuItemCheckbox(menuItem, () => onclick(type, 1))
            },
            {
                id: "playbackrate4",
                label:"1.25",
                type:"checkbox",
                click: (menuItem) => this.toggleMenuItemCheckbox(menuItem, () => onclick(type, 1.25))
            },
            {
                id: "playbackrate5",
                label:"1.5",
                type:"checkbox",
                click: (menuItem) => this.toggleMenuItemCheckbox(menuItem, () => onclick(type, 1.5))
            },
            {
                id: "playbackrate6",
                label:"1.75",
                type:"checkbox",
                click: (menuItem) => this.toggleMenuItemCheckbox(menuItem, () => onclick(type, 1.75))
            },
            {
                id: "playbackrate7",
                label:"2",
                type:"checkbox",
                click: (menuItem) => this.toggleMenuItemCheckbox(menuItem, () => onclick(type, 2))
            },
        ]

        return Menu.buildFromTemplate(template);
    }

    private seekSpeedMenu(onclick: (menu:Mp.PlayerContextMenuType, args?:Mp.ContextMenuSubType) => void){

        const type = "SeekSpeed"
        const template:Electron.MenuItemConstructorOptions[] = [
            {
                id: "seekspeed0",
                label:"0.03sec",
                type:"checkbox",
                click: (menuItem) => this.toggleMenuItemCheckbox(menuItem, () => onclick(type, 0.03))
            },
            {
                id: "seekspeed1",
                label:"0.05sec",
                type:"checkbox",
                click: (menuItem) => this.toggleMenuItemCheckbox(menuItem, () => onclick(type, 0.05))
            },
            {
                id: "seekspeed2",
                label:"0.1sec",
                type:"checkbox",
                click: (menuItem) => this.toggleMenuItemCheckbox(menuItem, () => onclick(type, 0.1))
            },
            {
                id: "seekspeed3",
                label:"0.5sec",
                type:"checkbox",
                click: (menuItem) => this.toggleMenuItemCheckbox(menuItem, () => onclick(type, 0.5))
            },
            {
                id: "seekspeed4",
                label:"1sec",
                type:"checkbox",
                click: (menuItem) => this.toggleMenuItemCheckbox(menuItem, () => onclick(type, 1))
            },
            {
                id: "seekspeed5",
                label:"5sec",
                type:"checkbox",
                click: (menuItem) => this.toggleMenuItemCheckbox(menuItem, () => onclick(type, 5))
            },
            {
                id: "seekspeed6",
                label:"10sec - Default",
                type:"checkbox",
                checked:true,
                click: (menuItem) => this.toggleMenuItemCheckbox(menuItem, () => onclick(type, 10))
            },
            {
                id: "seekspeed7",
                label:"20sec",
                type:"checkbox",
                click: (menuItem) => this.toggleMenuItemCheckbox(menuItem, () => onclick(type, 20))
            },
        ]

        return Menu.buildFromTemplate(template);
    }

    createPlaylistContextMenu(config:Mp.Config, onclick: (menu:Mp.PlaylistContextMenuType, args?:Mp.ContextMenuSubType) => void){

        const template:Electron.MenuItemConstructorOptions[] = [
            {
                label: "Remove",
                accelerator: "Delete",
                click: () => onclick("Remove")
            },
            {
                label: "Trash",
                accelerator: "Shift+Delete",
                click: () => onclick("Trash")
            },
            { type: "separator" },
            {
                label: "Copy Name",
                accelerator: "CmdOrCtrl+C",
                click: () => onclick("CopyFileName")
            },
            {
                label: "Copy Full Path",
                accelerator: "CmdOrCtrl+Shift+C",
                click: () => onclick("CopyFullpath")
            },
            {
                label: "Reveal in File Explorer",
                accelerator: "CmdOrCtrl+R",
                click: () => onclick("Reveal")
            },
            { type: "separator" },
            {
                label: "Rename",
                accelerator: "F2",
                click: () => onclick("Rename")
            },
            {
                label: "View Metadata",
                click: () => onclick("Metadata")
            },
            {
                label: "Convert",
                click: () => onclick("Convert")
            },
            { type: "separator" },
            {
                label: "Load Playlist",
                click: () => onclick("LoadList")
            },
            {
                label: "Save Playlist",
                click: () => onclick("SaveList")
            },
            { type: "separator" },
            {
                label: "Clear Playlist",
                click: () => onclick("RemoveAll")
            },
        ]

        return Menu.buildFromTemplate(template);
    }

    createPlaylistSortContextMenu(config:Mp.Config, onclick: (menu:Mp.PlaylistContextMenuType, args?:Mp.ContextMenuSubType) => void){

        const type = "Sort"
        const template:Electron.MenuItemConstructorOptions[] = [
            {
                id:"groupby",
                label: "Group By Directory",
                type: "checkbox",
                checked: config.sort.groupBy,
                click: () => onclick("GroupBy")
            },
            { type: "separator" },
            {
                id: "NameAsc",
                label: "Name(Asc)",
                type: "checkbox",
                checked: config.sort.order === "NameAsc",
                click: (menuItem) => this.toggleMenuItemCheckbox(menuItem, () => onclick(type, "NameAsc"))
            },
            {
                id: "NameDesc",
                label: "Name(Desc)",
                type: "checkbox",
                checked: config.sort.order === "NameDesc",
                click: (menuItem) => this.toggleMenuItemCheckbox(menuItem, () => onclick(type,"NameDesc"))
            },
            {
                id: "DateAsc",
                label: "Date(Asc)",
                type: "checkbox",
                checked: config.sort.order === "DateAsc",
                click: (menuItem) => this.toggleMenuItemCheckbox(menuItem, () => onclick(type,"DateAsc"))
            },
            {
                id: "DateDesc",
                label: "Date(Desc)",
                type: "checkbox",
                checked: config.sort.order === "DateDesc",
                click: (menuItem) => this.toggleMenuItemCheckbox(menuItem, () => onclick(type,"DateDesc"))
            },
        ]

        return Menu.buildFromTemplate(template);
    }

    createThumButtons(onclick: (button:Mp.ThumbButtonType) => void){

        const staticDir = path.join(__dirname, "..", "static");

        const playThumbButton:Electron.ThumbarButton = {
            tooltip: "Play",
            icon: nativeImage.createFromPath(path.join(staticDir, "img", "play.png")),
            click: () => onclick("Play"),
        }
        const pauseThumbButton:Electron.ThumbarButton = {
            tooltip: "Pause",
            icon: nativeImage.createFromPath(path.join(staticDir, "img", "pause.png")),
            click: () => onclick("Pause"),
        }
        const prevThumbButton:Electron.ThumbarButton = {
            tooltip: "Previous",
            icon: nativeImage.createFromPath(path.join(staticDir, "img", "backward.png")),
            click: () => onclick("Previous")
        }
        const nextThumbButton:Electron.ThumbarButton = {
            tooltip: "Next",
            icon: nativeImage.createFromPath(path.join(staticDir, "img", "forward.png")),
            click: () => onclick("Next")
        }

        const thumbButtonsOptionsPaused:Electron.ThumbarButton[] = [
            prevThumbButton,
            playThumbButton,
            nextThumbButton
        ]

        const thumbButtonsOptionsPlayed:Electron.ThumbarButton[] = [
            prevThumbButton,
            pauseThumbButton,
            nextThumbButton
        ]

        return [
            thumbButtonsOptionsPaused,
            thumbButtonsOptionsPlayed
        ]
    }

    private toggleMenuItemCheckbox(menuItem:Electron.MenuItem, onclick:() => void){

        menuItem.menu.items.forEach((item:Electron.MenuItem) => {
            if(item.id === menuItem.id){
                item.checked = true;
            }else{
                item.checked = false;
            }
        })

        onclick()
    }

}