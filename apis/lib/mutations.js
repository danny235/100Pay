export const CreateUserWalletMutation = `
    mutation CreateUserWallet($symbol: String!, $appId: String) {
        createUserWallet(symbol: $symbol, appId: $appId) {
            walletType
            symbol
            name
            status
            id
            decimals
        }
    }
`;
