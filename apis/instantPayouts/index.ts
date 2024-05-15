import axios from "axios";
import { UserAppType } from "../../features/user/userSlice";

const constructDashboardData: (values: any) => UserAppType = (values) => {
  return {
    address: values.address,
    admins: values.admin,
    app_name: values.app_name,
    business_name: values.business_name,
    call_back: values.call_back,
    city: values.city,
    code: values.code,
    country: values.country,
    createdAt: values.createdAt,
    currency: values.currency,
    description: values.description,
    fiat_balance: values.fiat_balance,
    gateways: values.gateways,
    keys: values.keys,
    kycVerified: values.kycVerified,
    phone: values.phone,
    postal: values.postal,
    referralCode: values.referralCode,
    status: values.status,
    suported_coins: values.suported_coins,
    support_email: values.support_email,
    tokenBalance: values.tokenBalance,
    user_id: values.user_id,
    verification_token: values.verification_token,
    web_hook: values.web_hook,
    website_address: values.website_address,
    __v: values._v,
    _id: values._id,
    regNumber: values.regNumber,
    instantPayout: values.instantPayout,
    instantPayoutAccountId: values.instantPayoutAccountId,
  };
};

export const updateDashboardRequest = async ({
  data,
  token,
  apiKey,
}: {
  data: UserAppType;
  token: string;
  apiKey: string;
}) => {
  const userData = constructDashboardData(data);
  try {
    
    const res = await axios.put(
      "https://api.100pay.co/api/v1/user/support_coin",
      data,
      {
        headers: {
          "Auth-Token": token,
          "Api-Key": apiKey,
        },
      }
    );
    return res.data;
  } catch (error: any) {
    return error;
  }
};

export default updateDashboardRequest;
