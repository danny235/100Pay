import { UpdateUserData } from "../../components/types/user"; 
const API_URL = process.env.NEXT_PUBLIC_BASE_API;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

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
}: {
  data: UpdateUserData;
  token: string;
}) => {
  const userData = constructUserData(data);
  try {
    const res = await fetch(`${API_URL}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": token,
        "Api-Key": API_KEY,
      },
      body: JSON.stringify(userData),
    });
    return res;
  } catch (error: any) {
    console.log("user update POST err", error);
    console.log(error.response.data);
    throw Error(error.response.data);
  }
};

export default updateUserRequest;
