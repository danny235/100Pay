import axios from "axios";

export interface ValidateBankAccountT {
  accountNumber: string;
  bankCode: string;
}

export interface UserData {
  avatar: string;
  isEmailVerified: boolean;
  hasSetPin: boolean;
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  username: string;
  createdAt: string;
}


interface ResetTransactionPin {
  code: any;
  newPin: any;
}



export const validatePayId = async (
  payId: string,
  token: any,
) => {
  let config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Auth-Token": token,
    },
    data: {
      payId
    },
  };

  try {
    const res = await axios(
      `https://api.100pay.co/api/v1/user/validate-payid`,
      config
    );

    return {
      message: "PayId gotten!",
      data: res.data,
    };
  } catch (err: any) {
    throw Error(err.response.data);
  }
};

export const validateBankAccount = async (
  data: ValidateBankAccountT,
  token: any,
) => {
  let config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Auth-Token": token,
    },
    data: {
      accountNumber: data.accountNumber,
      bankCode: data.bankCode
    },
  };

  try {
    const res = await axios(
      `https://api.100pay.co/api/v1/user/validate-account-number`,
      config
    );

    return {
      message: "Bank account gotten!",
      data: res.data,
    };
  } catch (err: any) {
    throw Error(err.response.data);
  }
};

// send code
export const requestResetTransactionPinCode = async (apikey, token) => {
  let config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": apikey,
      "Auth-Token": token,
    },
  };

  try {
    const res = await axios(
      `https://api.100pay.co/api/v1/user/send-code`,
      config
    );

    return {
      message: "Code Sent! please check your email",
      data: res.data,
    };
  } catch (err: any) {
    throw Error(err.response.data);
  }
};

export const resetTransactionPin = async (
  values: ResetTransactionPin,
  apiKey: any,
  token: any
) => {
  let config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": apiKey,
      "Auth-Token": token,
    },
    data: values,
  };

  try {
    const res = await axios(
      `https://api.100pay.co/api/v1/user/pin-reset`,
      config
    );

    return {
      message: "Transaction Pin Reset Successful",
      data: res.data,
    };
  } catch (err: any) {
    throw Error(err.response.data);
  }
};
