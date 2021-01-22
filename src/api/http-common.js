import axios from "axios";

var covidStatsUrl = axios.create({
  baseURL: "https://disease.sh/v3/covid-19",
  headers: {
    "Content-type": "application/json"
  }
});

var covidNewsUrl = axios.create({
  baseURL: "http://api.krisinformation.se/v1/feed?format=json",
  headers: {
    "Content-type": "application/json"
  }
});

export {
  covidStatsUrl,
  covidNewsUrl
};