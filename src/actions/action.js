export class Action {
    constructor(type: String, data: any) {
        this.type = type;
        this.data = data;
    }
}

export const Actions = {
    covidCountriesLoaded: "COVID_COUNTRIES_LOADED",
    covidNewsLoaded: "COVID_NEWS_LOADED"
};