import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  RESERVATION_SUCCESS,
  REGISTRATION_SUCCESS,
  GETALL_TRAVELS,
  FORGOTPASSWORD_SUCCESS,
  RESETPASSWORD_SUCCESS,
  PAYMENT_SUCCESS,
  POSTDISCOUNT_SUCCESS,
  FACEBOOK_LOGIN_SUCCESS,
  GOOGLE_LOGIN_SUCCESS,
  REGISTRATION_FAILED,
  RESERVATION_FAILED,
  GETALL_TRAVELS_FAILED
} from "./user.types";

import DataService from "../services/api.service";

export const _login = (email, password) => async dispatch => {
  try {
    const res = await DataService.login(email, password);
    console.log(res);

    if (res.status === 200) {
      localStorage.setItem("x-auth-token", JSON.stringify(res.data.token));
      // dispatch({
      //   type: LOGIN_SUCCESS,
      //   auth: res //auth is payload we passing to userReducer.js file in login reducer
      // });
      dispatch(loginActionSuccess(res));
    }
    return Promise.resolve(res);
  } catch (err) {
    // return Promise.reject(err);
    dispatch(loginActionError(err));
  }
};
export const loginActionSuccess = data => ({
  type: LOGIN_SUCCESS,
  //   auth: res //auth is payload we passing to userReducer.js file in login reducer
  auth: data
});
export const loginActionError = error => ({
  type: LOGIN_FAIL,
  error: error
});

// ...........................................................
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

    // dispatch({
    //   type: REGISTRATION_SUCCESS,
    //   auth: res
    // });
    dispatch(registrationActionSuccess(res));
    return Promise.resolve(res);
  } catch (err) {
    // return Promise.reject(err);
    dispatch(registrationActionError(err));
  }
};
export const registrationActionSuccess = data => ({
  type: REGISTRATION_SUCCESS,
  //   auth: res //auth is payload we passing to userReducer.js file in login reducer
  auth: data // data is res from line no 70
});
export const registrationActionError = error => ({
  type: REGISTRATION_FAILED,
  error: error
});
// ............................................................
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

    // dispatch({
    //   type: RESERVATION_SUCCESS,
    //   payload: res
    // });
    dispatch(reservationActionSuccess(res));
    return Promise.resolve(res);
  } catch (err) {
    dispatch(reservationActionError(err));
    // return Promise.reject(err);
  }
};
export const reservationActionSuccess = data => ({
  type: RESERVATION_SUCCESS,
  payload: data
});
export const reservationActionError = error => ({
  type: RESERVATION_FAILED,
  error: error
});
// ...................................................
export const _getAllTravels = () => async dispatch => {
  try {
    const res = await DataService.getAllTravels();

    // dispatch({
    //   type: GETALL_TRAVELS,
    //   payload: res
    // });
    dispatch(getTravelsActionSuccess(res));
    return Promise.resolve(res);
  } catch (err) {
    dispatch(getTravelsActionError(err));
    // return Promise.reject(err);
  }
};
export const getTravelsActionSuccess = data => ({
  type: GETALL_TRAVELS,
  payload: data // data is res from line no 142
});
export const getTravelsActionError = errorr => ({
  type: GETALL_TRAVELS_FAILED,
  error: errorr // err is from line no 145
});
// .......................................................
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
