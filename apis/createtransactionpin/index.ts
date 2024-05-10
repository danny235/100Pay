import axios from "axios";
const BASE_API = process.env.NEXT_PUBLIC_BASE_API || "";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

const axiosInstance = axios.create({
  baseURL: BASE_API,
});

let token: string | null;

if (typeof window !== "undefined") token = localStorage.getItem("token");

interface CreateTransactionPin {
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

export const createTransactionPinRequest = async (values: any) => {
  let data = JSON.stringify(constructCreateTransactionPin(values));

  let config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": API_KEY,
      "Auth-Token": token,
    },
    data: data,
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
    console.log("catch");

    console.log("transaction pin creation POST err", err);
    console.log(err.response.data);

    throw Error(err.response.data);
  }
};

export const getUserData: (token: string) => Promise<UserData> = async (
  token: string
) => {
  try {
    const res = await axiosInstance("/user", {
      headers: {
        "Auth-Token": token,
      },
    });

    return res.data;
  } catch (err: any) {
    console.log("catch");

    console.log("user logged in POST err", err);
    console.log(err.response.data);

    throw Error(err.response.daa);
  }
};

// send code
export const requestResetTransactionPinCode = async () => {
  let config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": API_KEY,
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
    console.log("catch");

    console.log("pin reset code creation POST err", err);
    console.log(err.response.data);

    throw Error(err.response.data);
  }
};

export const resetTransactionPin = async (values: any) => {
  let data = JSON.stringify(constructResetTransactionPin(values));

  let config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": API_KEY,
      "Auth-Token": token,
    },
    data: data,
  };

  console.log(data, "faraa");

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
    console.log("catch");

    console.log("pin reset code creation POST err", err);
    console.log(err.response.data);

    throw Error(err.response.data);
  }
};
