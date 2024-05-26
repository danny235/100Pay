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

export interface BankTransferT {
  amount: number;
  app_id: string;
  destination_wallet: string;
  pin: string;
  description: string;
  account: {
    account_number: string;
    account_name: string;
    bankCode: string;
    bank_name: string;
  };
}

interface ResetTransactionPin {
  code: any;
  newPin: any;
}

export const validatePayId = async (payId: string, token: any) => {
  let config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Auth-Token": token,
    },
    data: {
      payId,
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
  token: any
) => {
  let config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Auth-Token": token,
    },
    data: {
      accountNumber: data.accountNumber,
      bankCode: data.bankCode,
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

export const bankTransfer = async (data: BankTransferT, token: any) => {
  let config = {
    method: "post",
    headers: {
      "auth-Token": token,
    },
    data,
  };

  try {
    const res = await axios(
      `https://api.100pay.co/api/v1/user/transfer`,
      config
    );

    return {
      message: "Transfer complete 🎊!",
      data: res.data,
    };
  } catch (err: any) {
    throw Error(err.response.data);
  }
};
