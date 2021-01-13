import axios from "axios";

export const defaultSearch = axios.create({
  baseURL: "https://restcountries.eu/rest/v2/all/",
  responseType: "json",
});

export const nameSearch = axios.create({
  baseURL: "https://restcountries.eu/rest/v2/name/",
  responseType: "json",
});
