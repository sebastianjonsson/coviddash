import { EventEmitter } from './eventEmitter'
import { Action } from '../actions/action';

class Dispatcher {
    constructor(){
        this.emitter = new EventEmitter();
    }
    
    register(callback: Function) {
        this.emitter.subscribe("dispatcher", callback);
    }

    dispatch(payload: Action) {
        this.emitter.emit(payload)
    }
}

export default new Dispatcher();