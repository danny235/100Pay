import { NairaIcon, PaySIcon } from "../SvgAssets";

// Define an enum for the items
export enum CurrencyItemType {
  Naira = 'naira',
  PayToken = 'pay-token',
}

// Define a type for the item data
export type CurrencyItemData = {
  type: string;
  icon: React.ReactNode;
  primaryText: string;
  secondaryText: string;
  amountNaira: number;
  amountDollars: number;
};

export const currencyItems: CurrencyItemData[] = [
  {
    type: CurrencyItemType.Naira,
    icon: <NairaIcon />,
    primaryText: 'NGN',
    secondaryText: 'Nigerian Naira',
    amountNaira: 500000,
    amountDollars: 1000000,

  },
  {
    type: CurrencyItemType.PayToken,
    icon: <PaySIcon />,
    primaryText: '$Pay',
    secondaryText: '100Pay Token',
    amountNaira: 500000,
    amountDollars: 1000000,
  },
];
