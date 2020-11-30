import Dispatcher from '../flux/dispatcher';
import { Action, Actions } from '../actions/action';
import { EventEmitter } from '../flux/eventEmitter';
import { BaseStore } from './baseStore';

export class CovidStatsStore extends BaseStore {
    static getName() { return "CovidStatsStore"; }

    constructor(eventEmitter: EventEmitter) {
        super(eventEmitter, []);

        Dispatcher.register((action: Action) => {
            if (action.type === Actions.covidStatsLoaded) {
                this.state = action.data;
                this.emitter.emit();
            }
        })
    }
}