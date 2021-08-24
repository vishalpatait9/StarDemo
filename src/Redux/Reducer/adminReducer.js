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
} from "./../Actions/admin.types";

const initialState = {
  travels: [],
  users: [],
  reservation: []
};

function adminReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    //for travels
    case GETALL_TRAVELS_SUCCESS:
      state = {
        ...state,

        travels: payload
      };
      break;
    case POST_TRAVELS_SUCCESS:
      state = {
        ...state,

        travels: payload
      };
      break;
    case DELETE_TRAVELS_SUCCESS:
      state = {
        ...state,

        travels: payload
      };
      break;
    case UPDATE_TRAVELS_SUCCESS:
      state = {
        ...state,

        travels: payload
      };
      break;

    //for users
    case GETALL_USERS_SUCCESS:
      state = {
        ...state,

        users: payload
      };
      break;
    case POST_USERS_SUCCESS:
      state = {
        ...state,

        users: payload
      };
      break;
    case DELETE_USERS_SUCCESS:
      state = {
        ...state,

        users: payload
      };
      break;
    case UPDATE_USERS_SUCCESS:
      state = {
        ...state,

        users: payload
      };
      break;

    //for reservation
    case GETALL_RESERVATION_SUCCESS:
      state = {
        ...state,

        reservation: payload
      };
      break;
    case POST_RESERVATION_SUCCESS:
      state = {
        ...state,

        reservation: payload
      };
      break;
    case DELETE_RESERVATION_SUCCESS:
      state = {
        ...state,

        reservation: payload
      };
      break;
    case UPDATE_RESERVATION_SUCCESS:
      state = {
        ...state,

        reservation: payload
      };
      break;
    default:
      return state;
  }
  return state;
}

export default adminReducer;
