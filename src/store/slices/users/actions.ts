// axios
import axios from "axios";
import * as reducers from './slice.reducers'
import { Dispatch } from 'redux';

export const fetchAllUsers = () => async (dispatch:Dispatch) => {
    console.log("llama a fetchAllUsers")
    axios
      .get("https://reqres.in/api/users?per_page=12")
      .then((response) => {
        dispatch(reducers.setUserList(response.data.data));
      })
      .catch((error) => console.log(error));
  };