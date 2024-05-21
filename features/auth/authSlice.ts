import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { formatDateString } from "../../utils";
import { GetApp } from "../../apis/getuserdata";
import { getUserData } from "../../apis/auth/loginuser";

export const fetchUserApps = createAsyncThunk(
  "user/fetchUseApps",
  async (token: string) => {
    const response = await GetApp(token);
    return response;
  }
);

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (token: string) => {
    const response = await getUserData(token);
    return response;
  }
);


interface CreateUser {
  country: string; //"AF";
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  confirmPassword: string;
  phone: string;
  countryDialCode: string;
  countryName: string;
  countryFlag: string;
  inviteCode: string;
}

const initialState: CreateUser = {
  country: "",
  email: "",
  first_name: "",
  last_name: "",
  password: "",
  confirmPassword: "",
  phone: "",
  countryDialCode: "",
  countryName: "",
  countryFlag: "",
  inviteCode: ""
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateFormInput: (state, action) => {
        return { ...state, ...action.payload };
    },
    clearField: (state) => {
      state.country = "";
      state.email = "";
      state.first_name = "";
      state.last_name = "";
      state.password = "";
      state.phone = "";
    },
  },
});

export const {
  updateFormInput
} = authSlice.actions;

export default authSlice.reducer;
