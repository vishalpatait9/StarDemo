var axios = require("axios");

axios.defaults.timeout = 180000;

var ApiPath = "http://localhost:8080/";

var Api = axios.create({
  baseURL: ApiPath,
  timeout: 180000,
  headers: {
    "Content-Type": "application/json"
  }
});

module.exports = {
  Api
};
