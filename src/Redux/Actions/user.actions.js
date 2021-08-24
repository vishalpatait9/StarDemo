import {
  LOGIN_SUCCESS,
  RESERVATION_SUCCESS,
  REGISTRATION_SUCCESS,
  GETALL_TRAVELS,
  FORGOTPASSWORD_SUCCESS,
  RESETPASSWORD_SUCCESS,
  PAYMENT_SUCCESS,
  POSTDISCOUNT_SUCCESS,
  FACEBOOK_LOGIN_SUCCESS,
  GOOGLE_LOGIN_SUCCESS
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
        auth: res //auth is payload we passing to useReducer.js file in login reducer
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

export const _forgotPassword = (
  resetPasswordLink,
  newPassword
) => async dispatch => {
  try {
    const res = await DataService.forgotPassword(
      resetPasswordLink,
      newPassword
    );

    dispatch({
      type: FORGOTPASSWORD_SUCCESS,
      payload: res
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const _resetPassword = email => async dispatch => {
  try {
    const res = await DataService.resetPassword(email);

    dispatch({
      type: RESETPASSWORD_SUCCESS,
      payload: res
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const _payment = (
  token,
  product,

  _id,
  transaction
) => async dispatch => {
  try {
    const res = await DataService.payment(
      token,
      product,

      _id,
      transaction
    );

    dispatch({
      type: PAYMENT_SUCCESS,
      payload: res
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const _postDiscount = (_id, discount) => async dispatch => {
  try {
    const res = await DataService.postDiscount(_id, discount);

    dispatch({
      type: POSTDISCOUNT_SUCCESS,
      payload: res
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const _facebookLogin = (accessToken, userID) => async dispatch => {
  try {
    const res = await DataService.facebookLogin(accessToken, userID);

    if (res.status === 200) {
      localStorage.setItem("x-auth-token", JSON.stringify(res.data.token));
      dispatch({
        type: FACEBOOK_LOGIN_SUCCESS,
        auth: res
      });
    }
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const _googleLogin = tokenId => async dispatch => {
  try {
    const res = await DataService.googleLogin(tokenId);

    if (res.status === 200) {
      localStorage.setItem("x-auth-token", JSON.stringify(res.data.token));
      dispatch({
        type: GOOGLE_LOGIN_SUCCESS,
        auth: res
      });
    }
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};
