import axios from "axios";
import { UpdateUserData, UserData } from "../../components/types/user"; 


const constructUserData: (values: any) => UpdateUserData = (values) => {
  return {
    avatar: values.avatar,
    isEmailVerified: values.isEmailVerified,
    hasSetPin: values.hasSetPin,
    _id: values._id,
    first_name: values.first_name,
    last_name: values.last_name,
    email: values.email,
    phone: values.phone,
    country: values.country,
    username: values.username,
    code: values.code.toString(),
    // createdAt: values.createdAt,
  };
};

const updateUserRequest = async ({
  data,
  token,
  apiKey,

}: {
  data: any;
  token: string;
  apiKey: string;

}) => {
  const userData = constructUserData(data);
  try {
    const res = await axios(`https://api.100pay.co/api/v1/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": token,
        "Api-Key": apiKey,
      },
      data,
    });
    return res.data;
  } catch (error: any) {
    throw Error(error.response.data);
  }
};

export default updateUserRequest;
