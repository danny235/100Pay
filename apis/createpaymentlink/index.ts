import { CreatePaymentLink } from "@/types/payment";
import axios from "axios";
const BASE_API = process.env.NEXT_PUBLIC_BASE_API || "";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

const axiosInstance = axios.create({
  baseURL: BASE_API,
});

let token: string | null;
if (typeof window !== "undefined") token = localStorage.getItem("token");

const constructCreatePaymentLink: (
  values: any,
  userDetails: any
) => CreatePaymentLink = (values, userDetails) => {
  console.log(userDetails, "tirar");
  return {
    app_id: userDetails._id,
    link_name: values.paymentLink,
    business_name: userDetails.business_name,
    currency: values.currency || "any_currency",
    description: values.paymentDesc,
    amount: parseFloat(values.amount) || 0,
    code: values.qrCode,
    call_back_url: values.website,
  };
};

export const createPaymentLinkRequest = async (
  values?: any,
  userDetails?: any,
  constructedPaymentLink?: CreatePaymentLink
) => {
  console.log("createPaymentLinkRequest", {
    values,
    userDetails,
    constructedPaymentLink,
  });

  let data =
    constructedPaymentLink ||
    JSON.stringify(constructCreatePaymentLink(values, userDetails));

  let config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": API_KEY,
      "Auth-Token": token,
    },
    data: data,
  };

  console.log(data, "amount");

  try {
    const res = await axios(
      `https://api.100pay.co/api/v1/pay/payment_page`,
      config
    );

    return {
      message: "Payment Link Created!",
      data: res.data,
    };
  } catch (err: any) {
    console.log("catch");

    console.log("payment link creation POST err", err);
    console.log(err.response.data);

    throw Error(err.response.data);
  }
};
