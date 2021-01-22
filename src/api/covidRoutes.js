import { covidNewsUrl, covidStatsUrl } from "./http-common";


export class CovidRoutes {
    getAllCountries() {
        return covidStatsUrl.get("/countries");
    }

    getCovidNews() {
        return covidNewsUrl.get();
    }
}