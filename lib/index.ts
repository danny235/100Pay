import axios from "axios";
import { UserWalletQuery, UserWalletTransactionsQuery } from "./queries";

type QueryVariables = {
  [key: string]: any;
};

type GraphqlRequestParams = {
  query: string;
  variables: QueryVariables;
  authToken: string;
};

export const graphqlRequest = async ({
  query,
  variables,
  authToken,
}: GraphqlRequestParams) => {
  const endpoint = "https://graph.100pay.co/graphql"; // Replace with your actual GraphQL endpoint

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };

  const data = {
    query,
    variables,
  };

  try {
    const response = await axios.post(endpoint, data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const GetUserWallets = async (authToken: string, appId: string) => {
  const variables = { appId };
  const response = await graphqlRequest({
    query: UserWalletQuery,
    variables,
    authToken,
  });
  return response.data;
};

export const GetUserWalletTransactions = async (
  authToken: string,
  symbol: string
) => {
  const variables = { symbol };
  const response = await graphqlRequest({
    query: UserWalletTransactionsQuery,
    variables,
    authToken,
  });
  return response.data
};
