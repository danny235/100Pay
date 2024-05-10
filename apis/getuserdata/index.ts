// get user data

import axios from 'axios';

type GetAppT = {
  token: string;
};
export async function GetApp(token: string) {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Auth-Token': token,
    },
  };
  try {
    const response = await axios.get(
      'https://api.100pay.co/api/v1/user/apps',
      config,
    );

    return response.data;
  } catch (error) {
    
    return error;
  }
}
