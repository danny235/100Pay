// get user token

import axios from "axios";


export type getPaymentsT = {
  token: string;
  apiKey: string | undefined;
  appId: string | undefined;
};

export async function getPayments({token, apiKey, appId}: getPaymentsT) {
  console.log({ token, apiKey, appId });
  try {
    const response = await axios.post(
      "https://api.100pay.co/api/v1/pay/crypto/app/payments",
      {appId},
      {
        headers: {
          "Content-Type": "application/json",
          "Api-Key": apiKey,
          "Auth-Token": token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}

