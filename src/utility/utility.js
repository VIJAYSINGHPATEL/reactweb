export const padTo2Digits = (num) => num.toString().padStart(2, "0");

export const formatDate = (date) =>
  [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-") +
  " " +
  [
    padTo2Digits(date.getHours()),
    padTo2Digits(date.getMinutes()),
    padTo2Digits(date.getSeconds()),
  ].join(":");
