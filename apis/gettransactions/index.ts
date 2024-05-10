// get user tranasactions

import axios from "axios";

export type ChargeT = {
  token: string;
  apiKey: string | undefined;
};

export async function getCharge({token, apiKey}: ChargeT) {
  try {
    const response = await axios.get('https://api.100pay.co/api/v1/charge', {
      headers: {
        'Api-Key': apiKey,
        'Auth-Token': token,
      },
    });
    
    return response.data
  
    
  } catch (error) {
    return error
  }
}
