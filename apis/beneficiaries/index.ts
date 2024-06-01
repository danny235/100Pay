// https://api.100pay.co/api/v1/user/beneficiaries

import axios from "axios";

export type BenefeciariesT = {
  _id: string;
  lastTransferId: string;
  account_name: string;
  account_number: string;
  bank_name: string;
  bank_code: string;
  userId: string;
  __v: number;
};


export const getBeneficiaries = async ({ token }) => {
  let config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Auth-Token": token,
    },
  };

  try {
    const res = await axios(
      `https://api.100pay.co/api/v1/user/beneficiaries`,
      config
    );

    return res.data;
  } catch (err: any) {
    throw Error(err.response.data);
  }
};