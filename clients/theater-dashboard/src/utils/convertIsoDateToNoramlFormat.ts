export const convertIsoDateToNormalFormat = (isoDate: string) => {
  const date = new Date(isoDate);

  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours() >= 12 ? date.getHours() - 12 : date.getHours();
  const minute = date.getMinutes()
    ? date.getMinutes().toString().padStart(2, "0")
    : "";
  const amOrPm = date.getHours() >= 12 ? "PM" : "AM";

  return `${month} ${day}, ${year} ${hour && minute ? "-" : ""} ${hour ? hour.toString().padStart(2, "0") : ""}${hour && minute ? ":" : ""}${minute ? minute : ""} ${hour && minute ? amOrPm : ""}`;
};
