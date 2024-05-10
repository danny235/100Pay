export interface Customer {
  user_id?: string | undefined;
  name: string | undefined;
  phone: string | undefined;
  email: string | undefined;
}

export interface Billing {
  amount: number;
  currency: string | undefined;
  description?: string;
  country: string | undefined;
  vat?: number;
  pricing_type: 'fixed_price' | 'partial';
}

export interface PaymentData {
  customer: Customer;
  billing: Billing;
  apiKey: string | undefined;
  call_back_url: string;
}

export interface CreatePaymentLink {
  app_id: string;
  link_name: string;
  business_name: string;
  currency: any;
  description: any;
  amount: number | string;
  code: any;
  call_back_url: string;
  userId?: string;
}


export type PaymentDataResponse = {
  billing: {
    currency: string;
    vat: number;
    pricing_type: string;
    amount: string;
    description: string;
    country: string;
  };
  status: {
    context: {
      status: string;
      value: number;
    };
    value: string;
    total_paid: number;
  };
  ref_id: string;
  payments: any[]; // You might want to define a type for payments if they have a specific structure
  charge_source: string;
  createdAt: string;
  _id: string;
  customer: {
    user_id: string;
    name: string;
    email: string;
    phone: string;
  };
  metadata: {
    is_approved: string;
    order_id: string;
    charge_ref: string;
  };
  call_back_url: string;
  app_id: string;
  userId: string;
  chargeId: string;
  __v: number;
  hosted_url: string;
};
