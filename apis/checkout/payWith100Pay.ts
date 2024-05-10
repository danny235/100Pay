'use client';

import axios, {AxiosResponse} from 'axios';
import {PaymentData, PaymentDataResponse} from '../../components/types/payment';
// import { COUNTRIES, CURRENCIES, shop100Pay } from "@100pay-hq/checkout";
// const API_KEY = process.env.NEXT_PUBLIC_100PAY_API_KEY;
// import { v4 as uuidv4 } from "uuid";

// accept data with onclose, onerror, oncallback callbacks

export const handleCryptoCharge = async (data: PaymentData) => {
  let paymentData = {
    ref_id: Math.ceil(Math.random() * 1000000).toString(),
    call_back_url: 'https://100pay.co',
    //  userId: '6143bfb7fe85e0020bf243f9',
    charge_source: 'api',
    customer: {
      user_id: data.customer.user_id,
      name: data.customer.name,
      phone: data.customer.phone,
      email: data.customer.email,
    },
    billing: {
      description: data.billing.description,
      amount: data.billing.amount,
      country: data.billing.country,
      currency: data.billing.currency,
      pricing_type: data.billing.pricing_type,
    },
    metadata: {
      is_approved: 'yes',
      charge_ref: 'REF',
      orderId: 'OR2',
    },
    
  };

  let config = {
    headers: {
      'Api-Key': `${data.apiKey}`,
    },
  };

  try {
    console.log(paymentData)

    const response: AxiosResponse<PaymentDataResponse, any> = await axios.post(
      'https://api.100pay.co/api/v1/pay/charge',
      paymentData,
      config,
    );

    return response;
  } catch (err) {
    return err;
  }
};

// {"ref_id":"660055","billing":{"amount":62500,"currency":"NGN","description":"Deposit","country":"NG","pricing_type":"fixed_price"},"customer":{"user_id":"64970fbdf6dbaf011f7292be","name":"Brainy Josh","email":"joshuabrendan5@gmail.com","phone":"+2348066427168"},"metadata":{"is_approved":"yes","order_id":"OR2","charge_ref":"REF"},"call_back_url":"http://localhost:8000/verifyorder/"}

// const payWith100Pay = async (
//   data: PaymentData,
//   onPayClose?: () => void,
//   onPayError?: (error: any) => void,
//   onPayCallback?: (reference: string) => void
// ) => {

//   let result = {};

//   shop100Pay.setup(
//     {
//       ref_id: Math.ceil(Math.random() * 1000000).toString(),
//       api_key: data.apiKey,
//       billing: {
//         amount: data.billing.amount,
//         currency: data.billing.currency ,
//         description: data.billing.description,
//         country: data.billing.country,
//         pricing_type: data.billing.pricing_type,
//       },
//       customer: {
//         user_id: data.customer.user_id,
//         name: data.customer.name,
//         email: data.customer.email,
//         phone: data.customer.phone,
//       },
//       metadata: {
//         is_approved: "yes",
//         order_id: "OR2", // optional
//         charge_ref: "REF", // optionalm, you can add more fields
//       },
//       call_back_url: "http://localhost:8000/verifyorder/",
//       onClose: () => {
//         // alert("User closed payment modal.");
//         onPayClose && onPayClose();
//       },
//       // callback: (reference) => {
//       //   // alert(`Transaction successful with id: ${reference}`);

//       //   onPayCallback && onPayCallback(reference);
//       // },
//       // onError: (error) => {
//       //   console.log(error);
//       //   // alert("Sorry something went wrong pls try again.");
//       //   onPayError && onPayError(error);
//       // },
//     },
//     {
//       maxWidth: "500px",
//     }
//   );

//   return result;
// };

// export default payWith100Pay;
