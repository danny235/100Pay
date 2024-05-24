import axios from "axios";




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
  

  let config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: values,
  };


  try {
    const res = await axios(
      `https://api.100pay.co/api/v1/user/register`,
      config
    );



   return {
     message: "Account creation successful  🎉 🎉 🎉",
     token: res.data,
     status: res.status,
   };
  } catch (err: any) {
    throw Error(err.response.data);
  }
};



