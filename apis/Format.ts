const formatCurrency = (value: number, options?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat(
    "en-US",
    options || {
      // style: "currency",
      // currency: "USD",
      minimumFractionDigits: 2,
      compactDisplay: "short",
    }
  ).format(value);
};

export const formatCoins = (
  value: number,
  options?: Intl.NumberFormatOptions
) => {
  // Check if the number is an integer
  if (Number.isInteger(value)) {
    return new Intl.NumberFormat(
      "en-US",
      options || {
        // style: "currency",
        // currency: "USD",
        minimumFractionDigits: 2,
        compactDisplay: "short",
      }
    ).format(value);
  } else {
    // If it's not an integer, apply the formatting with the provided options
    return new Intl.NumberFormat("en-US", {
      ...options,
      minimumFractionDigits: options?.minimumFractionDigits ?? 5, // Set default minimumFractionDigits if not provided
      compactDisplay: "short",
    }).format(value);
  }
};

export const dateFormater = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// format fiat balance and add currency
export const formatCurrencySign = (
  value: number,
  currency: string,
  options?: Intl.NumberFormatOptions
) => {
  return new Intl.NumberFormat(
    "en-US",
    options || {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 2,
      currencyDisplay: "symbol",
      compactDisplay: "short",
    }
  ).format(value);
};

// format pay value up to 3 decimal places
export const formatPay = (
  value: number,
  options?: Intl.NumberFormatOptions
) => {
  return new Intl.NumberFormat(
    "en-US",
    options || {
      maximumFractionDigits: 3,
      compactDisplay: "short",
    }
  ).format(value);
};

export const SlashDateFormater = (date: string) => {
  const formattedDate = new Date(date);
  const day = formattedDate.toLocaleString("en-US", { day: "2-digit" });
  const month = formattedDate.toLocaleString("en-US", { month: "short" });
  const year = formattedDate.toLocaleString("en-US", { year: "2-digit" });

  return `${day} - ${month} - ${year}`;
};

export const apiSlashDateFormater = (date: string) => {
  const formattedDate = new Date(date);
  const formattedDateString = formattedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formattedDateString;
};

export const timeFormatter = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const period = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${period}`;
};


export default formatCurrency;
