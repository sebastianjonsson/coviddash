export class Action {
    constructor(type: String, data: any) {
        this.type = type;
        this.data = data;
    }
}

export const Actions = {
    covidLoaded: "COVID_LOADED"
};