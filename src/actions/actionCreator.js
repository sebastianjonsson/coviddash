import Dispatcher from '../flux/dispatcher';
import { Action, Actions } from '../actions/action';
import http from '../api/http-common';
import { CovidRoutes } from '../api/covidRoutes';

export class ActionCreator {
    constructor(api: CovidRoutes) {
        this.api = api;
    }

    loadCovid() {
        return this.api.getAll().then(response => {
            Dispatcher.dispatch(new Action(Actions.covidLoaded, response.data));
        });
    }
}

export default new ActionCreator(new CovidRoutes(new http()));