export const handleShortcut = (renderer:RendererName, e:KeyboardEvent) => {

    if(renderer === "Player"){
        handlePlayerShortcut(e);
    }

    if(renderer === "Playlist"){
        handlePlaylistShortcut(e);
    }

}

const handlePlayerShortcut = (e:KeyboardEvent) => {
    if(e.key === "F11"){
        e.preventDefault();
        return window.api.send("shortcut", {renderer:"Player", menu:"ToggleFullscreen"})
    }

    if(e.ctrlKey && e.key === "s"){
        return window.api.send("shortcut", {renderer:"Player", menu:"Capture"})
    }

    if(e.ctrlKey && e.key === "p"){
        return window.api.send("shortcut", {renderer:"Player", menu:"TogglePlaylistWindow"})
    }

}

const handlePlaylistShortcut = (e:KeyboardEvent) => {


    if(e.key === "Delete"){
        return window.api.send("shortcut", {renderer:"Playlist", menu:"Remove"})
    }

    if(e.shiftKey && e.key === "Delete"){
        return window.api.send("shortcut", {renderer:"Playlist", menu:"Trash"})
    }

    if(e.ctrlKey && e.shiftKey && e.key === "C"){
        return window.api.send("shortcut", {renderer:"Playlist", menu:"CopyFullpath"})
    }

    if(e.ctrlKey && e.key === "c"){
        return window.api.send("shortcut", {renderer:"Playlist", menu:"CopyFileName"})
    }

    if(e.ctrlKey && e.key === "r"){
        e.preventDefault();
        return window.api.send("shortcut", {renderer:"Playlist", menu:"Reveal"})
    }

    if(e.key == "F2"){
        return window.api.send("shortcut", {renderer:"Playlist", menu:"Rename"})
    }
}