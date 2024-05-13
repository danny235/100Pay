// const constructDashboardData: (values: any) => AppData = (values) => {
//   return {
//     address: values.address,
//     admins: values.admin,
//     app_name: values.app_name,
//     business_name: values.business_name,
//     call_back: values.call_back,
//     city: values.city,
//     code: values.code,
//     country: values.country,
//     createdAt: values.createdAt,
//     currency: values.currency,
//     description: values.description,
//     fiat_balance: values.fiat_balance,
//     gateways: values.gateways,
//     keys: values.keys,
//     kycVerified: values.kycVerified,
//     phone: values.phone,
//     postal: values.postal,
//     referralCode: values.referralCode,
//     status: values.status,
//     suported_coins: values.suported_coins,
//     support_email: values.support_email,
//     tokenBalance: values.tokenBalance,
//     user_id: values.user_id,
//     verification_token: values.verification_token,
//     web_hook: values.web_hook,
//     website_address: values.website_address,
//     __v: values._v,
//     _id: values._id,
//     regNumber: values.regNumber,
//     instantPayout: values.instantPayout,
//     instantPayoutAccountId: values.instantPayoutAccountId,
//   };
// };

// const updateDashboardRequest = async ({
//   data,
//   token,
// }: {
//   data: AppData;
//   token: string;
// }) => {
//   const userData = constructDashboardData(data);
//   try {
//     const res = await fetch(${API_URL}/user/support_coin, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         "Auth-Token": token,
//         "Api-Key": API_KEY,
//       },
//       body: JSON.stringify(userData),
//     });
//     return await res.text();
//   } catch (error: any) {
//     console.log("user update POST err", error);
//     console.log(error.response.data);
//     throw Error(error.response.data);
//   }
// };

// export default updateDashboardRequest;