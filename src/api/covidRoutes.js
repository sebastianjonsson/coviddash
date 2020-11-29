import http from "./http-common";

export class CovidRoutes {
    getAllCountries() {
        return http.get("/countries");
    }

    getCovidStats(country) {
        return http.get("/countries/" + country);
    }
}