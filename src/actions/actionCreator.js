import Dispatcher from '../flux/dispatcher';
import { Action, Actions } from '../actions/action';
import http from '../api/http-common';
import { CovidRoutes } from '../api/covidRoutes';

export class ActionCreator {
    constructor(api: CovidRoutes) {
        this.api = api;
    }

    loadCovidCountries() {
        return this.api.getAllCountries().then(response => {
            Dispatcher.dispatch(new Action(Actions.covidCountriesLoaded, response.data));
        });
    }

    loadCovidStats(country) {
        return this.api.getCovidStats(country).then(response => {
            Dispatcher.dispatch(new Action(Actions.covidStatsLoaded, response.data));
        })
    }
}

export default new ActionCreator(new CovidRoutes(new http()));