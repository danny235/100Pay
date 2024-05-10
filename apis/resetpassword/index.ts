import axios from "axios";
const BASE_API = process.env.NEXT_PUBLIC_BASE_API || "";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

const axiosInstance = axios.create({
  baseURL: BASE_API,
});

let token: string | null;


interface ResetPassword {
  oldPassword: string;
  newPassword: string;
}

const constructResetPassword: (values: any) => ResetPassword = (values) => {
  return {
    oldPassword: values.currentPassword,
    newPassword: values.newPassword,
  };
};

export const createResetPasswordRequest = async (values: any) => {
  let data = JSON.stringify(constructResetPassword(values));

  let config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": API_KEY,
      "Auth-Token": token,
    },
    data: data,
  };

  console.log(data);

  try {
    const res = await axios(
      `https://api.100pay.co/api/v1/user/password-reset`,
      config
    );

    return {
      message: "Password Reset was Successsful!",
      data: res.data,
    };
  } catch (err: any) {
    console.log("catch");

    console.log("password creation POST err", err);
    console.log(err.response.data);

    throw Error(err.response.data);
  }
};
