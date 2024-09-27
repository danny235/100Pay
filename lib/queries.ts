export const UserWalletQuery = `
  query UserWallet($appId: String!) {
    userWallet(appId: $appId) {
      name
      status
      symbol
      decimals
      logo
      account {
        address
      }
      balance {
        available
        locked
      }
      walletType
      id
    }
  }
`;

export const UserWalletTransactionsQuery = `
  query UserWalletTransactions($symbol: String!) {
    userWalletTransactions(symbol: $symbol) {
      accountId
      amount
      appId
      createdAt
      from
      symbol
      to
      type
      updatedAt
      userId
      transactionHash
    }
  }
`;

