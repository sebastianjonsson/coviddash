import Dispatcher from '../flux/dispatcher';
import { Action, Actions } from '../actions/action';
import { EventEmitter } from '../flux/eventEmitter';
import { BaseStore } from './baseStore';

export class CovidNewsStore extends BaseStore {
    static getName() { return "CovidNewsStore"; }

    constructor(eventEmitter: EventEmitter) {
        super(eventEmitter, []);

        Dispatcher.register((action: Action) => {
            if (action.type === Actions.covidNewsLoaded) {
                this.state = action.data;
                this.emitter.emit();
            }
        })
    }
}