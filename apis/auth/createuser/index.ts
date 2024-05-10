import axios from "axios";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";
const BASE_API = process.env.NEXT_PUBLIC_BASE_API || "";

const axiosInstance = axios.create({
  baseURL: BASE_API,
});

interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  password: string;
  inviteCode: string;
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

const constructRegisterData: (values: any) => RegisterData = (values) => {
  return {
    first_name: values.firstName,
    last_name: values.lastName,
    email: values.email,
    phone: values.phone,
    country: values.country,
    password: values.password,
    inviteCode: values?.inviteCode,
  };
};

export const createUserRequest = async (values: any) => {
  let data = JSON.stringify(constructRegisterData(values));

  let config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": API_KEY,
    },
    data: data,
  };

  console.log("createUserRequest config", data);

  try {
    const res = await axios(
      `https://api.100pay.co/api/v1/user/register`,
      config
    );

    console.log(res);

    return {
      message: "User Created",
      token: res.data,
    };
  } catch (err: any) {
    console.log("catch");

    console.log("createUser POST err", err);
    console.log(err.response.data);

    throw Error(err.response.data);
  }
};

export const POST = async (req: Request) => {
  const data = await req.json();
  const raw = JSON.stringify(constructRegisterData(data));

  let config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: raw,
  };

  try {
    const res = await axios(
      `https://api.100pay.co/api/v1/user/register`,
      config
    );

    console.log(res);

    return Response.json({
      message: "User Created",
      token: res.data,
    });
  } catch (err: any) {
    console.log("catch");

    console.log("createUser POST err", err);
    console.log(err.response.data);

    return Response.json({ error: err.response.data }, { status: 400 });
  }
};

export const getUserData: (token: string) => Promise<UserData> = async (
  token: string
) => {
  try {
    const res = await axiosInstance("/user", {
      headers: {
        "Auth-Token": token,
      },
    });

    return res.data;
  } catch (err: any) {
    console.log("catch");

    console.log("createUser POST err", err);
    console.log(err.response.data);

    throw Error(err.response.daa);
  }
};
