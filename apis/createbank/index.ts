import axios from 'axios';

export interface CreateBank {
  bank_name: string;
  account_number: string;
  account_name: any;
  currency: any;
}

export interface GetBankT {
  token: string;
  apiKey: string | undefined;
}

const constructCreateBank: (values: any) => CreateBank = values => {
  return {
    bank_name: values.bankName,
    account_number: values.accountNumber,
    account_name: values.accountName,
    currency: 'NGN',
  };
};

export const createBankRequest = async (
  values: CreateBank,
  token: string,
  apiKey: string,
) => {
  let data = JSON.stringify(constructCreateBank(values));

  let config = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Api-Key': apiKey,
      'Auth-Token': token,
    },
    data: data,
  };

  try {
    const res = await axios(
      `https://api.100pay.co/api/v1/pay/bank_account`,
      config,
    );

    return res.data;
  } catch (err: any) {
    return err;
  }
};

export const getBankRequest = async ({token, apiKey}: GetBankT) => {
  let config = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Api-Key': apiKey,
      'Auth-Token': token,
    },
  };

  try {
    const res = await axios(
      `https://api.100pay.co/api/v1/pay/bank_accounts`,
      config,
    );

    return res.data;
  } catch (err: any) {
    return err;
  }
};
