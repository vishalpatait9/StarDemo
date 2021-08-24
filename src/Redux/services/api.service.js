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
    return Api.post("/reservation/create", data);
  }
  getAllTravels() {
    return Api.get("/booking/getAll");
  }
  forgotPassword(data) {
    return Api.put("/social/forgot-password", data);
  }
  resetPassword(data) {
    return Api.put("/social/reset-password", data);
  }
  // .................................................................
  payment(data) {
    return Api.post("/payment", data);
  }
  postDiscount(data) {
    return Api.post("/users/myDiscount", data);
  }
  facebookLogin(data) {
    return Api.post("/social/facebookLogin", data);
  }
  googleLogin(data) {
    return Api.post("/social/googleLogin", data);
  }
  //.........................................Admin Api's...................................
  //............................for travels management................................
  getTravels_Admin() {
    return Api.get("/booking/getAll");
  }
  updateTravels_Admin(data) {
    return Api.put(`/booking/update/${data.id}`, data);
  }
  postTravels_Admin(data) {
    return Api.post("/booking/create", data);
  }
  deleteTravels_Admin(data) {
    return Api.delete(`/booking/delete/${data.id}`);
  }

  //.........................for users management......................
  getUsers_Admin() {
    return Api.get("/users/getAll");
  }
  updateUsers_Admin(data) {
    return Api.put(`/users/update/${data.id}`, data);
  }
  postUsers_Admin(data) {
    return Api.post("/users/create", data);
  }
  deleteUsers_Admin(data) {
    return Api.delete(`/users/delete/${data.id}`);
  }
  //.........................for reservation management......................
  getReservation_Admin() {
    return Api.get("/reservation/getAll");
  }
  updateReservation_Admin(data) {
    return Api.put(`/reservation/update/${data.id}`, data);
  }
  postReservation_Admin(data) {
    return Api.post("/reservation/create", data);
  }
  deleteReservation_Admin(data) {
    return Api.delete(`/reservation/delete/${data.id}`);
  }
}

export default new DataService();
