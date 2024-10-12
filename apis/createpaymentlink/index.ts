
import axios from "axios";
const BASE_API = process.env.NEXT_PUBLIC_BASE_API || "";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

const axiosInstance = axios.create({
  baseURL: BASE_API,
});

export type PaymentT = {
  token: string;
  apiKey: string | undefined;
};





export const getPaymentLinks = async ({token, apiKey}: PaymentT) => {
  try {
    const response = await axios.get(
      "https://api.100pay.co/api/v1/pay/payment_page",
      {
        headers: {
          "Auth-Token": token,
          "Api-Key": apiKey
        },
      }
    );

    return response.data;
  } catch (err) {
    throw Error(err.response.data);
  }
};
