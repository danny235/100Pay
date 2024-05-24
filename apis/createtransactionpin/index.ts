import axios from "axios";



export interface CreateTransactionPin {
  pin: any;
  confirmedPin: any;
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

const constructCreateTransactionPin: (values: any) => CreateTransactionPin = (
  values
) => {
  return {
    pin: values.pin,
    confirmedPin: values.confirmedPin,
  };
};

const constructResetTransactionPin: (values: any) => ResetTransactionPin = (
  values
) => {
  return {
    code: values.otpCode,
    newPin: values.newPin,
  };
};

export const createTransactionPinRequest = async (values: CreateTransactionPin, token: any, apiKey) => {

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
      `https://api.100pay.co/api/v1/user/crypto/wallet`,
      config
    );

    return {
      message: "Transaction Pin Created!",
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

export const resetTransactionPin = async (values: ResetTransactionPin, apiKey: any, token: any) => {


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
