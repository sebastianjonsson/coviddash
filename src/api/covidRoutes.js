import http from "./http-common";

export class CovidRoutes {
    getAll() {
        return http.get("/countries/sweden");
    }
}