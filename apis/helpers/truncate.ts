const truncate = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str;
  }

  const startLength = Math.ceil((maxLength - 3) / 2);
  const endLength = Math.floor((maxLength - 3) / 2);
  return str.slice(0, startLength) + "..." + str.slice(-endLength);
};

export default truncate;
