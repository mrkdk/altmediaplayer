
export class DomElement<T extends HTMLElement | HTMLVideoElement | HTMLInputElement | HTMLButtonElement = HTMLElement>{

    private id:string;
    private _element:T;

    constructor(id:string){
        this.id = id;
    }

    private fill(){
        this._element = document.getElementById(this.id) as T;
        if(!this._element) throw new Error(`Failed to get "${this.id}"`);
        return this._element;
    }

    get element():T{

        if(this._element) return this._element

        return this.fill();
    }

}
