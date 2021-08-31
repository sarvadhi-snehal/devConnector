import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CLEAR_PROFILE,
  LOGOUT
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const response = await axios.get("/api/auth");


    dispatch({ type: USER_LOADED, payload: response.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

//Register User
export const register =
  ( { name, email, password }) =>
  async (dispatch) => {
    const newUser = {
      name,
      email,
      password,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/users", newUser, config);
     
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser())
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

//login
  export const login =
  ( email, password ) =>
  async (dispatch) => {
    const user = {
      email,
      password,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth", user, config);
  

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser())
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

  //logout 
  export const logout = () =>dispatch =>{
    dispatch({
      type: CLEAR_PROFILE,
    })  ;
     dispatch({
      type: LOGOUT,
    })
  }