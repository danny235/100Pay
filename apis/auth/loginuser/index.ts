import axios from 'axios';
const BASE_API = process.env.NEXT_PUBLIC_BASE_API || '';

const axiosInstance = axios.create({
  baseURL: BASE_API,
});

interface LoginData {
  email: string;
  password: string;
}

interface User {
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
  invitedBy: string;
  __v: number;
}

const constructLoginData: (values: any) => LoginData = values => {
  return {
    email: values.email,
    password: values.password,
  };
};

export const logInUserRequest = async (values: any) => {
  let data = JSON.stringify(constructLoginData(values));

  let config = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  try {
    const res = await axios(`https://api.100pay.co/api/v1/user/login`, config);

    return {
      message: 'Login successful!',
      token: res.data,
      status: res.status,
    };
  } catch (err: any) {
    throw Error(err.response.data);
  }
};

export const getUserData: (token: string) => Promise<User> = async (
  token: string,
) => {
  try {
    const res = await axios.get('https://api.100pay.co/api/v1/user', {
      headers: {
        'Auth-Token': token,
      },
    });

    return res.data;
  } catch (err) {
    return err;
  }
};
