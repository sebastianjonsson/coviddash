class EventLog {
    constructor() {
        this.events = [];
    }

    add(event: object) {
        this.events.push(event);
    }
}

export default new EventLog();