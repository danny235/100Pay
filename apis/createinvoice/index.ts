import axios from "axios";
const BASE_API = process.env.NEXT_PUBLIC_BASE_API || "";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

const axiosInstance = axios.create({
  baseURL: BASE_API,
});

let token: string | null;
if (typeof window !== "undefined") token = localStorage.getItem("token");

interface CreateInvoiceData {
  email: string;
  name: string;
  phone: any;
  user_id: any;
}

interface CreateCustomerCharge {
  ref_id: any;
  customer: {
    user_id: any;
    name: string;
    phone: any;
    email: string;
  };
  billing: {
    description: string;
    amount: number;
    country: string;
    currency: string;
    vat: number;
    pricing_type: any;
  };
}

const constructCreateInvoiceData: (values: any) => CreateInvoiceData = (
  values
) => {
  return {
    email: values.customerEmail,
    name: values.customerName,
    phone: values.customerPhone,
    user_id: values.customerId,
  };
};

const constructCreateCustomerCharge: (
  values: any,
  selectedCustomer: any
) => CreateCustomerCharge = (values, selectedCustomer) => {
  return {
    ref_id: selectedCustomer.user_id,
    customer: {
      user_id: selectedCustomer.user_id,
      name: selectedCustomer.name,
      phone: selectedCustomer.phone,
      email: selectedCustomer.email,
    },
    billing: {
      description: values.paymentDesc,
      amount: values.amount,
      country: values.country,
      currency: values.currency,
      vat: values.vat,
      pricing_type: "fixed",
    },
    call_back_url: values.thankYouPage,
  };
};

export const createInvoiceRequest = async (values: any) => {
  let data = JSON.stringify(constructCreateInvoiceData(values));

  let config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": API_KEY,
      "Auth-Token": token,
    },
    data: data,
  };

  try {
    const res = await axios(
      `https://api.100pay.co/api/v1/pay/customer`,
      config
    );

    return {
      message: "Customer Created!",
      data: res.data,
    };
  } catch (err: any) {
    console.log("catch");

    console.log("customer creation POST err", err);
    console.log(err.response.data);

    throw Error(err.response.data);
  }
};

export const getCustomers = async (token: any) => {
  let config = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": API_KEY,
      "Auth-Token": token,
    },
  };

  try {
    const res = await axios(
      `https://api.100pay.co/api/v1/pay/customers`,
      config
    );

    return {
      message: "Customers Fetched!",
      status: 200,
      data: res.data,
    };
  } catch (err: any) {
    console.log("catch");

    console.log("customer creation POST err", err);
    console.log(err.response.data);

    throw Error(err.response.data);
  }
};

export const CreateCustomerCharge = async (
  values: any,
  selectedCustomer: any
) => {
  let data = JSON.stringify(
    constructCreateCustomerCharge(values, selectedCustomer)
  );

  let config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": API_KEY,
      "Auth-Token": token,
    },
    data: data,
  };

  try {
    const res = await axios(
      `https://api.100pay.co/api/v1/pay/user/charge`,
      config
    );

    return {
      message: "Customer Invoice Created!",
      data: res.data,
    };
  } catch (err: any) {
    console.log("catch");

    console.log("customer invoice creation POST err", err);
    console.log(err.response.data);

    throw Error(err.response.data);
  }
};
