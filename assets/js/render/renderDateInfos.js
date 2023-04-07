import { getDateInfo } from "../utils/getDateInfo.js";

function renderDateInfos() {
  const yearAndMonth = document.querySelector("[data-year]");
  const fullDate = document.querySelector("[data-date]");
  const date = getDateInfo();

  const { monthName, dayName, dayOfMonth, year } = date;

  yearAndMonth.innerText = `${monthName} ${year}`;
  fullDate.innerText = `${dayName}, ${
    monthName[0] + monthName[1] + monthName[2]
  } ${dayOfMonth}, ${year}`;
}

export default renderDateInfos;
