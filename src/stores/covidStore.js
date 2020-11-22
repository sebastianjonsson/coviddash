import Dispatcher from '../flux/dispatcher';
import { Action, Actions } from '../actions/action';
import { EventEmitter } from '../flux/eventEmitter';
import { BaseStore } from './baseStore';

export class CovidStore extends BaseStore {
    static getName() { return "CovidStore"; }

    constructor(eventEmitter: EventEmitter) {
        super(eventEmitter, []);

        Dispatcher.register((action: Action) => {
            if (action.type === Actions.covidLoaded) {
                this.state = action.data;
                this.emitter.emit();
            }
        })
    }
}