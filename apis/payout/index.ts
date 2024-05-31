import axios from "axios";
const BASE_API = process.env.NEXT_PUBLIC_BASE_API || "";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

const axiosInstance = axios.create({
  baseURL: BASE_API,
});

let token: string | null;

interface CreatePayout {
  amount: string;
  app_id: string;
  destination_wallet: string;
  pin: any;
  walletAddress: string;
}

interface CreateBankPayout {
  amount: string;
  app_id: string;
  bank_account_id: string;
  destination_wallet: string;
  pin: any;
}

const constructCreatePayout: (values: any, userDetails: any) => CreatePayout = (
  values,
  userDetails
) => {
  return {
    amount: values.amount,
    app_id: userDetails._id,
    destination_wallet: "usdt",
    pin: values.pin,
    walletAddress: values.wallet,
  };
};

const constructCreateBankPayout: (
  values: any,
  userDetails: any
) => CreateBankPayout = (values, userDetails) => {
  return {
    amount: values.amount,
    app_id: userDetails._id,
    bank_account_id: values.bank,
    destination_wallet: "bank_account",
    pin: values.pin,
  };
};

export const createPayoutRequest = async (values: any, userDetails: any) => {
  let data = JSON.stringify(constructCreatePayout(values, userDetails));

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
      `https://api.100pay.co/api/v1/user/pay-out`,
      config
    );

    return {
      message: "Payout completed!",
      data: res.data,
    };
  } catch (err: any) {
    console.log("catch");

    console.log("bank creation POST err", err);
    console.log(err.response.data);

    throw Error(err.response.data);
  }
};

export const createBankPayoutRequest = async (
  values: any,
  userDetails: any
) => {
  let data = JSON.stringify(constructCreateBankPayout(values, userDetails));

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
      `https://api.100pay.co/api/v1/user/pay-out`,
      config
    );

    return {
      message: "Payout completed!",
      data: res.data,
    };
  } catch (err: any) {
    console.log("catch");

    console.log("bank creation POST err", err);
    console.log(err.response.data);

    throw Error(err.response.data);
  }
};

export const getPayouts = async ({ appId, token }) => {
  let config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Auth-Token": token,
    },
    data: {
      appId,
    },
  };

  try {
    const res = await axios(
      `https://api.100pay.co/api/v1/user/payouts`,
      config
    );

    return res.data
  } catch (err: any) {
    throw Error(err.response.data);
  }
};
