export const encode = (str) => {
  return btoa(str);
};

export const decode = (encoded) => {
  return atob(encoded);
};

export const isEmpty = (obj) => {
  return JSON.stringify(obj) === "{}";
};

export const isExists = (obj) => {
  return JSON.stringify(obj) !== "{}";
};

export const getDateTime = (dateTime = new Date()) => {
  const years = dateTime.getFullYear();
  const months = String(dateTime.getMonth() + 1).padStart(2, "0");
  const dates = String(dateTime.getDate()).padStart(2, "0");
  const hours = String(dateTime.getHours()).padStart(2, "0");
  const minutes = String(dateTime.getMinutes()).padStart(2, "0");
  const seconds = String(dateTime.getSeconds()).padStart(2, "0");
  return `${years}-${months}-${dates} ${hours}:${minutes}:${seconds}`;
};
