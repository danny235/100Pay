import axios from "axios";
const BASE_API = process.env.NEXT_PUBLIC_BASE_API || "";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

const axiosInstance = axios.create({
  baseURL: BASE_API,
});

let token: string | null;

if (typeof window !== "undefined") token = localStorage.getItem("token");

interface CreateBuyRequest {
  amount: string;
  app_id: string;
  pin: any;
  tokenAmount: string;
  token_symbol: string;
}

interface CreateSellRequest {
  amount: string;
  app_id: string;
  pin: any;
  tokenAmount: string;
  token_symbol: string;
}

const constructCreateBuyRequestt: (
  values: any,
  userDetails: any
) => CreateBuyRequest = (values, userDetails) => {
  return {
    amount: values.amountInNaira,
    app_id: userDetails._id,
    pin: values.pin,
    tokenAmount: values.amountInPayToken,
    token_symbol: "$PAY",
  };
};

const constructCreateSellRequestt: (
  values: any,
  userDetails: any
) => CreateSellRequest = (values, userDetails) => {
  return {
    amount: values.amountToReceive,
    app_id: userDetails._id,
    pin: values.pin,
    tokenAmount: values.amountToSell,
    token_symbol: "$PAY",
  };
};

export const createBuyRequest = async (values: any, userDetails: any) => {
  let data = JSON.stringify(constructCreateBuyRequestt(values, userDetails));

  let config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": API_KEY,
      "Auth-Token": token,
    },
    data: data,
  };

  console.log(config);

  try {
    const res = await axios(
      `https://api.100pay.co/api/v1/user/buy-token`,
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

export const createSellRequest = async (values: any, userDetails: any) => {
  let data = JSON.stringify(constructCreateSellRequestt(values, userDetails));

  let config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": API_KEY,
      "Auth-Token": token,
    },
    data: data,
  };

  console.log(config);

  try {
    const res = await axios(
      `https://api.100pay.co/api/v1/user/sell-token`,
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
