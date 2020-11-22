import { object } from "prop-types";
import moment from "moment";
import eventLog from './eventLog';

interface IEventEmitter {
    emit: (payload: any) => void;
    subscribe: (key: string, listener: Function) => void;
    unsubscribe: (key: string) => void;
}

export class StoreEventEmitter implements IEventEmitter {
    constructor(decoree: EventEmitter) {
        this.decoree = decoree;
    }

    emit(payload: any) {
        if (this.context) {
            console.log(moment().format("YYYY-MM-DD HH:mm:ss"), this.context.constructor.getName() + " state", this.context.state);

            eventLog.add({
                type: "State changed on " + this.context.constructor.getName(),
                payload: this.context.state,
                timestamp: moment().toDate()
            });
        }

        this.decoree.emit(payload);
    }

    subscribe(key: string, listener: Function) {
        this.decoree.subscribe(key, listener);
    }

    unsubscribe(key: string) {
        this.decoree.unsubscribe(key);
    }

    init(context: object) {
        this.context = context;
    }
}

export class EventEmitter implements IEventEmitter {
    constructor() {
        this.listeners = [];
    }

    emit(payload: any) {
        if (payload) {
            console.log(moment().format("YYYY-MM-DD HH:mm:ss"), payload);

            eventLog.add({
                type: payload.type,
                payload: payload,
                timestamp: moment().toDate()
            });
        }

        this.listeners.forEach(function (listener) {
            if (listener) {
                listener.fn(payload);
            }
        });
    }

    subscribe(key: string, listener: Function) {
        this.listeners.push({ key: key, fn: listener });
    }

    unsubscribe(key: string) {
        var index = this.listeners.findIndex((x) => x.key === key);

        if (index > -1) {
            this.listeners.splice(index, 1)
        }
    }
}