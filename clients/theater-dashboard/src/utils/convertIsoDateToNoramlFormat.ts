export const convertIsoDateToNormalFormat = (isoDate: string) => {
  const date = new Date(isoDate);

  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const minute = date.getMinutes()
    ? date.getMinutes().toString().padStart(2, "0")
    : "";
  const amOrPm = date.getHours() >= 12 ? "PM" : "AM";
  const line = hour? "-": ""
  const showHour = hour.toString().padStart(2, "0")
  const showAmOrPm = hour? amOrPm: ""
  const showMinutes = minute? `:${minute.padStart(2, "0")}`: ":00"
  
  return `${month} ${day}, ${year} ${line} ${hour ? showHour : ""}${showMinutes} ${showAmOrPm}`;
};
