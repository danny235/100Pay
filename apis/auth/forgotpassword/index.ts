import axios from "axios";
const BASE_API = process.env.NEXT_PUBLIC_BASE_API || "";

const axiosInstance = axios.create({
  baseURL: BASE_API,
});

interface SendOtpData {
  email: string;
}
interface ForgotPasswordData {
  email: string;
  password: string;
  code: any;
}

const constructSendOtpData: (values: any) => SendOtpData = (values) => {
  return {
    email: values.email,
  };
};

const constructForgotPasswordData: (values: any) => ForgotPasswordData = (
  values
) => {
  return {
    email: values.email,
    password: values.password,
    code: values.code
  };
};

export const sendOtpRequest = async (values: any) => {
  let data = JSON.stringify(constructSendOtpData(values));

  let config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const res = await axios(
      `https://api.100pay.co/api/v1/send-code`,
      config
    );

    return {
      message: "Check your email for the otp code!",
      token: res.data,
    };
  } catch (err: any) {
    console.log("catch");

    console.log("forgot password POST err", err);
    console.log(err.response.data);

    throw Error(err.response.data);
  }
};

export const forgotPasswordRequest = async (values: any) => {
  let data = JSON.stringify(constructForgotPasswordData(values));

  let config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const res = await axios(
      `https://api.100pay.co/api/v1/password-reset`,
      config
    );

    return {
      message: "You have successfully reset your password, login to continue!",
      token: res.data,
    };
  } catch (err: any) {
    console.log("catch");

    console.log("forgot password POST err", err);
    console.log(err.response.data);

    throw Error(err.response.data);
  }
};
