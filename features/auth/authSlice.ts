import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";






export type BankAccountT = {
  account_number: string;
  account_name: string;
  bankCode: string;
  bank_name: string;
  isFavourite: boolean;
};


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
  bankAccountList: BankAccountT[]
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
  inviteCode: "",
  bankAccountList: []
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateFormInput: (state, action) => {
      return { ...state, ...action.payload };
    },
    addBankAccount: (state, action: PayloadAction<BankAccountT>) => {
      state.bankAccountList.push(action.payload);
    },
    removeBankAccount: (state, action: PayloadAction<string>) => {
      state.bankAccountList = state.bankAccountList.filter(
        (account) => account.account_number !== action.payload
      );
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
  updateFormInput,
  addBankAccount,
  removeBankAccount
} = authSlice.actions;

export default authSlice.reducer;
