/**
 * Converts between two currencies based on their prices.
 *
 * @param {number} amount - The amount of the currency to convert.
 * @param {number} fromPrice - The price of the currency you're converting from.
 * @param {number} toPrice - The price of the currency you're converting to.
 * @returns {number} - The converted value.
 *
 * Example:
 * ```ts
 * const btcToPay = convertCurrency({
 *   amount: 1,
 *   fromPrice: btcPrice,
 *   toPrice: payPrice,
 * });
 *
 * const payToBtc = convertCurrency({
 *   amount: 1,
 *   fromPrice: payPrice,
 *   toPrice: btcPrice,
 * });
 * ```
 */
type CurrencyConversionParams = {
  amount: number;
  fromPrice: number; // Price of the currency you're converting from
  toPrice: number; // Price of the currency you're converting to
};

export function convertCurrency({
  amount,
  fromPrice,
  toPrice,
}: CurrencyConversionParams): number {
  if (fromPrice === 0 || toPrice === 0) {
    throw new Error("Prices must be greater than 0");
  }

  return (amount * fromPrice) / toPrice;
}

// Example usage:

// const btcPrice = 66000; // Price of 1 BTC in USD
// const payPrice = 0.02; // Price of 1 PAY in USD

// const btcToPay = convertCurrency({
//   amount: 1,
//   fromPrice: btcPrice,
//   toPrice: payPrice,
// });
// console.log(`1 BTC is equivalent to ${btcToPay} PAY`);

// const payToBtc = convertCurrency({
//   amount: 1,
//   fromPrice: payPrice,
//   toPrice: btcPrice,
// });
// console.log(`1 PAY is equivalent to ${payToBtc} BTC`);



type CoinType = {
  _id: string;
  symbol: string;
  __v: number;
  last_updated: string;
  margin: number;
  price: number;
  updated_price: number;
}[];

/**
 * Function to get a single coin from the CoinType array by its symbol
 *
 * @param {CoinType} coins - The array of coins
 * @param {string} symbol - The symbol of the coin to find
 * @returns {CoinType[0] | undefined} - The coin object or undefined if not found
 */
export function getCoinBySymbol(
  coins: CoinType,
  symbol: string
): CoinType[0] | undefined {
  return coins.find((coin) => coin.symbol === symbol);
}

// // Example usage
// const cryptoPrices: CoinType = [
//   {
//     _id: "1",
//     symbol: "BTC",
//     __v: 0,
//     last_updated: "2024-10-18",
//     margin: 1.2,
//     price: 66000,
//     updated_price: 65800,
//   },
//   {
//     _id: "2",
//     symbol: "ETH",
//     __v: 0,
//     last_updated: "2024-10-18",
//     margin: 1.1,
//     price: 2000,
//     updated_price: 1980,
//   },
//   {
//     _id: "3",
//     symbol: "PAY",
//     __v: 0,
//     last_updated: "2024-10-18",
//     margin: 1.05,
//     price: 0.02,
//     updated_price: 0.019,
//   },
// ];

// const btc = getCoinBySymbol(cryptoPrices, "BTC");
// console.log(btc);
