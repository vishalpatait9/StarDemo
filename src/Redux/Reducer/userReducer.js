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

        user: auth //auth is payload we get from user.acttion.js file in login action
      };

      break;

    case REGISTRATION_SUCCESS:
      state = {
        ...state,

        user: auth
      };

      break;
    case FORGOTPASSWORD_SUCCESS:
      state = {
        ...state,

        user: payload
      };

      break;
    case RESETPASSWORD_SUCCESS:
      state = {
        ...state,

        user: payload
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
    case PAYMENT_SUCCESS:
      state = {
        ...state,

        user: payload
      };

      break;
    case POSTDISCOUNT_SUCCESS:
      state = {
        ...state,

        user: payload
      };

      break;
    case FACEBOOK_LOGIN_SUCCESS:
      state = {
        ...state,

        user: auth
      };

      break;
    case GOOGLE_LOGIN_SUCCESS:
      state = {
        ...state,

        user: auth
      };

      break;
    default:
      return state;
  }
  return state;
}

export default userReducer;
