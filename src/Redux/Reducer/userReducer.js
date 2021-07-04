import {
  LOGIN_SUCCESS,
  RESERVATION_SUCCESS,
  REGISTRATION_SUCCESS,
  GETALL_TRAVELS
} from "../Actions/user.types";

const initialState = {
  user: {}
};

function userReducer(state = initialState, action) {
  const { type, auth, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      state = {
        ...state,

        user: auth
      };

      break;

    case REGISTRATION_SUCCESS:
      state = {
        ...state,

        user: auth
      };

      break;

    case RESERVATION_SUCCESS:
      state = {
        ...state,

        user: payload
      };

      break;
    case GETALL_TRAVELS:
      state = {
        ...state,

        user: payload
      };

      break;

    default:
      return state;
  }
  return state;
}

export default userReducer;
