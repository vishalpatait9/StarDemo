import {
  LOGIN_SUCCESS,
  RESERVATION_SUCCESS,
  REGISTRATION_SUCCESS,
  GETALL_TRAVELS
} from "./user.types";

import DataService from "../services/api.service";

export const _login = (email, password) => async dispatch => {
  try {
    const res = await DataService.login(email, password);
    console.log(res);

    if (res.status === 200) {
      localStorage.setItem("x-auth-token", JSON.stringify(res.data.token));
      dispatch({
        type: LOGIN_SUCCESS,
        auth: res
      });
    }
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const _register = (
  name,
  email,
  mobile,
  password,
  gender,
  dob
) => async dispatch => {
  try {
    const res = await DataService.register(
      name,
      email,
      mobile,
      password,
      gender,
      dob
    );

    dispatch({
      type: REGISTRATION_SUCCESS,
      auth: res
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const _reservation = (
  startCity,
  destination,
  companyName,
  busType,
  busNumber,
  reservedSeat,
  pricePerSeat,
  user,
  bus
) => async dispatch => {
  try {
    const res = await DataService.reservation(
      startCity,

      destination,
      companyName,
      busType,
      busNumber,
      reservedSeat,
      pricePerSeat,
      user,
      bus
    );

    dispatch({
      type: RESERVATION_SUCCESS,
      payload: res
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const _getAllTravels = () => async dispatch => {
  try {
    const res = await DataService.getAllTravels();

    dispatch({
      type: GETALL_TRAVELS,
      payload: res
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};
