// utils/clipboard.ts
import * as Clipboard from "expo-clipboard";


export const copyToClipboard = async (text) => {
 
  try {
    await Clipboard.setStringAsync(text);
    
  } catch (error) {
   console.log(error?.message)
  }
};

export function addCommas(number) {
  if (number === null || number === undefined) return;

  // Convert number to string
  let numberStr = number.toString();

  // Handle negative sign
  let isNegative = false;
  if (numberStr[0] === "-") {
    isNegative = true;
    numberStr = numberStr.slice(1); // Remove the negative sign temporarily
  }

  // Split into integer and decimal parts
  let parts = numberStr.split(".");

  // Add commas to the integer part
  let integerPart = parts[0];
  let formattedInteger = "";
  while (integerPart.length > 3) {
    formattedInteger = "," + integerPart.slice(-3) + formattedInteger;
    integerPart = integerPart.slice(0, -3);
  }
  formattedInteger = integerPart + formattedInteger;

  // Restore negative sign if necessary
  if (isNegative) {
    formattedInteger = "-" + formattedInteger;
  }

  // Combine integer and decimal parts
  if (parts.length > 1) {
    return formattedInteger + "." + parts[1];
  } else {
    return formattedInteger;
  }
}

export function roundToNearestWholeNumber(decimal) {
  return Math.round(decimal);
}

export function roundUpToNearestHundred(price) {
  // Check if the price is already a multiple of 100
  if (price % 100 === 0) {
    return price;
  }

  // Calculate the next multiple of 100 greater than the price
  const nextMultipleOf100 = Math.ceil(price / 100) * 100;

  return nextMultipleOf100;
}

export function roundUpToNearest400(number) {
  const remainder = number % 400;
  if (remainder === 0) {
    // Already a multiple of 400, no need to round up
    return number;
  } else {
    // Add the difference to the next multiple of 400
    return number + (400 - remainder);
  }
}

export function formatTimeString(dateString) {
  // Get the local time zone offset in minutes

  const date = new Date(dateString);

  // Use toLocaleTimeString to format the time in the user's local timezone
  const formattedTime = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return formattedTime;
}

export function formatDateString(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const formattedDate = `${day.toString().padStart(2, "0")}/${(month + 1)
    .toString()
    .padStart(2, "0")}/${year}`;

  return formattedDate;
}

export function addTime(timeUnit, amount) {
  var parsedAmount = isNaN(amount) ? parseFloat(amount) : amount;
  var currentTime = new Date();
  var newTime = new Date(currentTime);

  if (timeUnit === "minutes") {
    newTime.setMinutes(newTime.getMinutes() + parsedAmount);
  } else if (timeUnit === "hours") {
    newTime.setHours(newTime.getHours() + parsedAmount);
  } else if (timeUnit === "seconds") {
    newTime.setSeconds(newTime.getSeconds() + parsedAmount);
  }

  var hours = newTime.getHours();
  var minutes = newTime.getMinutes();

  // Format the time
  var formattedTime =
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0");

  return formattedTime;
}

// // Example usage:
// var updatedTime = addTime('minutes', 10); // Add 10 minutes

// console.log(updatedTime);

export function getRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const seconds = Math.floor((now - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 1) {
    return `${days} days ago`;
  } else if (days === 1) {
    return "yesterday";
  } else if (hours > 1) {
    return `${hours} hours ago`;
  } else if (hours === 1) {
    return "an hour ago";
  } else if (minutes > 1) {
    return `${minutes} minutes ago`;
  } else if (minutes === 1) {
    return "a minute ago";
  } else {
    return "just now";
  }
}

// Function to generate a random ID
function generateRandomId(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }

  return id;
}

// Set to store generated IDs for uniqueness checking
const generatedIds = new Set();
const idLength = 10; // Adjust the length of the ID as needed

// Generate a unique random ID
export function generateUniqueRandomId() {
  let id;
  do {
    id = generateRandomId(idLength);
  } while (generatedIds.has(id));

  generatedIds.add(id);
  return id;
}

export function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength) + "...";
  }
}

export function GenerateArray(length, step) {
  return Array.from({ length }, (_, index) => {
    return { start: index * step, end: (index + 1) * step - 1 };
  });
}

export function getFirstName(fullName) {
  return fullName?.split(" ")[0];
}

export function getLastName(fullName) {
  return fullName?.split(" ")[1];
}