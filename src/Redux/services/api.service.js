var configData = require("../../config");
var Api = configData.Api;

class DataService {
  register(data) {
    return Api.post("/register", data);
  }

  login(data) {
    return Api.post("/login", data);
  }
  reservation(data) {
    console.log(data);

    return Api.post("/reservation/create", data);
  }
  getAllTravels() {
    return Api.get("/booking/getAll");
  }
  // .................................................................
}

export default new DataService();
