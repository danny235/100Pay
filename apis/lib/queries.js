export const UserWalletTransactionQuery = `
    query UserWalletTransactions($symbol: String!, $appId: String!) {
        userWalletTransactions(symbol: $symbol, appId: $appId) {
            userId
            updatedAt
            type
            transactionHash
            to
            symbol
            status
            id
            from
            createdAt
            appId
            amount
            accountId
        }
    }
`;

export const UserWalletsQuery = `
    query UserWallet($appId: String!) {
        userWallet(appId: $appId) {
            name
            status
            symbol
            logo
            accountType
            balance {
            available
                locked
            }
            decimals
            account {
                address
            }
            walletType
            accountType
            id
        }
    }
`;

export const SupportedWalletsQuery = `
    query SupportedWallets {
        supportedWallets {
            name
            symbol
            logo
            decimals
            contractAddress
            fee {
                transfer
                convert
            }
        }
    }
`;

export const GetApp = `
    query App($appId: String!) {
      app(appId: $appId) {
        referrals {
          first_name
          last_name
          email
          photo
          phone
        }
      }
    }
  `;
