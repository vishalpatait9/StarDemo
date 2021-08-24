import {
  GETALL_TRAVELS_SUCCESS,
  DELETE_TRAVELS_SUCCESS,
  POST_TRAVELS_SUCCESS,
  UPDATE_TRAVELS_SUCCESS,
  GETALL_USERS_SUCCESS,
  DELETE_USERS_SUCCESS,
  POST_USERS_SUCCESS,
  UPDATE_USERS_SUCCESS,
  GETALL_RESERVATION_SUCCESS,
  DELETE_RESERVATION_SUCCESS,
  POST_RESERVATION_SUCCESS,
  UPDATE_RESERVATION_SUCCESS
} from "./admin.types";
import DataService from "../services/api.service";

//for travels management
export const _getAllTravels_Admin = () => async dispatch => {
  try {
    const res = await DataService.getTravels_Admin();

    dispatch({
      type: GETALL_TRAVELS_SUCCESS,
      payload: res
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const _postTravels_Admin = (
  startCity,
  destination,
  busNumber,
  pricePerSeat,
  busType,
  totalSeats,
  availableSeats
) => async dispatch => {
  try {
    const res = await DataService.postTravels_Admin(
      startCity,
      destination,
      busNumber,
      pricePerSeat,
      busType,
      totalSeats,
      availableSeats
    );

    dispatch({
      type: POST_TRAVELS_SUCCESS,
      payload: res
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const _updateTravels_Admin = data => async dispatch => {
  try {
    const res = await DataService.updateTravels_Admin(data);

    dispatch({
      type: UPDATE_TRAVELS_SUCCESS,
      payload: data
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const _deleteTravels_Admin = id => async dispatch => {
  try {
    const res = await DataService.deleteTravels_Admin(id);

    dispatch({
      type: DELETE_TRAVELS_SUCCESS,
      payload: { id }
    });

    return Promise.resolve(res);
  } catch (err) {
    console.log(err);
  }
};
//.....................................................................................................

// for users management

export const _getAllUsers_Admin = () => async dispatch => {
  try {
    const res = await DataService.getUsers_Admin();

    dispatch({
      type: GETALL_USERS_SUCCESS,
      payload: res
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const _postUsers_Admin = (
  name,
  email,
  mobile,

  gender,
  dob
) => async dispatch => {
  try {
    const res = await DataService.postUsers_Admin(
      name,
      email,
      mobile,

      gender,
      dob
    );

    dispatch({
      type: POST_USERS_SUCCESS,
      payload: res
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const _updateUsers_Admin = data => async dispatch => {
  try {
    const res = await DataService.updateUsers_Admin(data);

    dispatch({
      type: UPDATE_USERS_SUCCESS,
      payload: data
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const _deleteUsers_Admin = id => async dispatch => {
  try {
    const res = await DataService.deleteUsers_Admin(id);

    dispatch({
      type: DELETE_USERS_SUCCESS,
      payload: { id }
    });

    return Promise.resolve(res);
  } catch (err) {
    console.log(err);
  }
};

//.....................................................................................................

// for reservation management

export const _getAllReservation_Admin = () => async dispatch => {
  try {
    const res = await DataService.getReservation_Admin();

    dispatch({
      type: GETALL_RESERVATION_SUCCESS,
      payload: res
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const _postReservation_Admin = (
  startCity,
  destination,
  busNumber,
  reservedSeat,
  pricePerSeat,
  transaction,
  name,
  mobile,
  email,
  passengers
) => async dispatch => {
  try {
    const res = await DataService.postReservation_Admin(
      startCity,
      destination,
      busNumber,
      reservedSeat,
      pricePerSeat,
      transaction,
      name,
      mobile,
      email,
      passengers
    );

    dispatch({
      type: POST_RESERVATION_SUCCESS,
      payload: res
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const _updateReservation_Admin = data => async dispatch => {
  try {
    const res = await DataService.updateReservation_Admin(data);

    dispatch({
      type: UPDATE_RESERVATION_SUCCESS,
      payload: data
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteReservation_Admin = id => async dispatch => {
  try {
    const res = await DataService.deleteReservation_Admin(id);

    dispatch({
      type: DELETE_RESERVATION_SUCCESS,
      payload: { id }
    });

    return Promise.resolve(res);
  } catch (err) {
    console.log(err);
  }
};
