import Dispatcher from '../flux/dispatcher';
import { Action, Actions } from '../actions/action';
import { CovidRoutes } from '../api/covidRoutes';
import { covidNewsUrl, covidStatsUrl } from '../api/http-common';

export class ActionCreator {
    constructor(api: CovidRoutes) {
        this.api = api;
    }

    loadCovidCountries() {
        return this.api.getAllCountries().then(response => {
            Dispatcher.dispatch(new Action(Actions.covidCountriesLoaded, response.data));
        });
    }

    loadCovidNews() {
        return this.api.getCovidNews().then(response => {
            Dispatcher.dispatch(new Action(Actions.covidNewsLoaded, response.data.Entries));
        });
    }
}

export default new ActionCreator(new CovidRoutes(new covidStatsUrl(), new covidNewsUrl()));