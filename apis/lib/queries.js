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
