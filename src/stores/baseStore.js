import { StoreEventEmitter } from '../flux/eventEmitter';

export class BaseStore {
    constructor(eventEmitter: StoreEventEmitter, initialState: any){
        this.state = initialState;
        this.emitter = eventEmitter;

        this.emitter.init(this);
    }

    subscribe(key: string, listener: Function){
        this.emitter.subscribe(key, listener);
    }

    unsubscribe(key: string){
        this.emitter.unsubscribe(key);
    }

    get(){
        return JSON.parse(JSON.stringify(this.state));
    }
}