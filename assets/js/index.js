async function getWeatherInfo(location, apiMethod) {
  let link;

  if (apiMethod === "forecast.json")
    link = `http://api.weatherapi.com/v1/forecast.json?key=8b0331a2ed8d4fefa7f214759230104&q=${location}&days=1&aqi=no&alerts=no&lang=pt`;
  if (apiMethod === "current.json")
    link = `https://api.weatherapi.com/v1/${apiMethod}?key=8b0331a2ed8d4fefa7f214759230104&q=${location}&aqi=no&lang=pt`;

  try {
    const weatherInfo = await fetch(link);
    const weatherInfoJSON = await weatherInfo.json();
    return weatherInfoJSON;
  } catch (error) {
    console.log(error);
  }
}

function getDayName(dayNumber) {
  let day;
  switch (dayNumber) {
    case 0:
      day = "Domingo";
      break;
    case 1:
      day = "Segunda-feira";
      break;
    case 2:
      day = "Terça-feira";
      break;
    case 3:
      day = "Quarta-feira";
      break;
    case 4:
      day = "Quinta-feira";
      break;
    case 5:
      day = "Sexta-feira";
      break;
    case 6:
      day = "Sábado";
      break;
    default:
      return false;
  }
  return day;
}

function getMonthName(monthNumber) {
  let month;
  switch (monthNumber) {
    case 0:
      month = "Janeiro";
      break;
    case 1:
      month = "Fevereiro";
      break;
    case 2:
      month = "Março";
      break;
    case 3:
      month = "Abril";
      break;
    case 4:
      month = "Maio";
      break;
    case 5:
      month = "Junho";
      break;
    case 6:
      month = "Julho";
      break;
    case 7:
      month = "Agosto";
      break;
    case 8:
      month = "Setembro";
      break;
    case 9:
      month = "Outubro";
      break;
    case 10:
      month = "Novembro";
      break;
    case 11:
      month = "Dezembro";
      break;
    default:
      return false;
  }
  return month;
}

function getDateInfo() {
  const date = new Date();
  return {
    dayNumber: date.getDay(),
    dayName: getDayName(date.getDay()),
    dayOfMonth: date.getDate(),
    monthNumber: date.getMonth(),
    monthName: getMonthName(date.getMonth()),
    year: date.getFullYear(),
  };
}

function renderDateInfos({ dayName, dayOfMonth, monthName, year }) {
  const yearAndMonth = document.querySelector("[data-year]");
  const fullDate = document.querySelector("[data-date]");

  yearAndMonth.innerText = `${monthName} ${year}`;
  fullDate.innerText = `${dayName}, ${
    monthName[0] + monthName[1] + monthName[2]
  } ${dayOfMonth}, ${year}`;
}

const dateInfos = getDateInfo();

renderDateInfos(dateInfos);
