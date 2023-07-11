import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  addUserSuccess,
  addUserStart,
  addUserFailure,
} from "./userRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
      const res = await publicRequest.post("/auth/login", user);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      dispatch(loginFailure());
    }
  };
  
  export const getUsers = async (dispatch) => {
    dispatch(getUsersStart());
    try {
      const res = await publicRequest.get("/user");
      dispatch(getUsersSuccess(res.data));
    } catch (err) {
      dispatch(getUsersFailure());
    }
  };
  
  export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
      // const res = await userRequest.delete(`/products/${id}`);
      dispatch(deleteUserSuccess(id));
    } catch (err) {
      dispatch(deleteUserFailure());
    }
  };
  
  export const updateUser = async (id, user, dispatch) => {
    dispatch(updateUserStart());
    try {
      // update
      dispatch(updateUserSuccess({ id, user }));
    } catch (err) {
      dispatch(updateUserFailure());
    }
  };

  export const addUser = async (user, dispatch) => {
    dispatch(addUserStart());
    try {
      const res = await userRequest.post(`/user`, user);
      dispatch(addUserSuccess(res.data));
    } catch (err) {
      dispatch(addUserFailure());
    }
  };
  