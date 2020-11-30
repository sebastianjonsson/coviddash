import { EventEmitter, StoreEventEmitter } from "../flux/eventEmitter";
import { CovidStatsStore } from "./covidStatsStore";
import { CovidStore } from "./covidStore";

class StoreFactory {
    constructor() {
        this.stores = [
            { name: CovidStore.getName(), instance: new CovidStore(new StoreEventEmitter(new EventEmitter())) },
            { name: CovidStatsStore.getName(), instance: new CovidStatsStore(new StoreEventEmitter(new EventEmitter())) }
        ];
    }

    getInstanceOf(store) {
        if (!store.getName) {
            console.warn("A store needs a static method 'getName'.")
            return null;
        }

        for (var s of this.stores) {
            if (s.name === store.getName()) {
                return s.instance;
            }
        }

        return null;
    }
}

export default new StoreFactory();