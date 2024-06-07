import axios from "axios";


const getOtpRequest = async ({
  token,
  apiKey,
}: {
  token: string;
  apiKey: string;
}) => {

  try {
    const res = await axios(`https://api.100pay.co/api/v1/user/send-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": token,
        "Api-Key": apiKey,
      },
    });
    return res.data;
  } catch (error: any) {
    throw Error(error.response.data);
  }
};

export default getOtpRequest;
