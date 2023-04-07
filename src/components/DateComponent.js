import React from "react";

function DateComponent({ date }) {
  let iDate = new Date(date);
  let month = iDate.toLocaleString("en-us", { month: "2-digit" });
  let day = iDate.toLocaleString("en-us", { day: "2-digit" });
  let year = iDate.getFullYear();
  iDate = `${day}.${month}.${year}`;

  return <>{iDate}</>;
}

export default DateComponent;
