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

function renderOverview({
  wind_kph,
  pressure_mb,
  uv,
  humidity,
  precip_mm,
  feelslike_c,
}) {
  const windSpeed = document.querySelector("[data-wind]");
  const thermicSensation = document.querySelector("[data-degrees-sensation]");
  const pressure = document.querySelector("[data-pressure]");
  const uvIndex = document.querySelector("[data-uv]");
  const humidityCondition = document.querySelector("[data-humidity]");
  const precipitation = document.querySelector("[data-precipitation]");

  windSpeed.innerText = `${wind_kph} km/h`;
  thermicSensation.innerText = `${feelslike_c}° C`;
  pressure.innerText = `${pressure_mb} mbar`;
  uvIndex.innerText = `${uv}`;
  humidityCondition.innerText = `${humidity}%`;
  precipitation.innerText = `${precip_mm} mm`;
}

function renderLocationWeather(
  { country, name, region, localtime },
  { temp_c },
  { text, icon }
) {
  const cityLocation = document.querySelector("[data-location]");
  const regionLocation = document.querySelector("[data-region]");
  const weatherIcon = document.querySelector("[data-weather-icon]");
  const weatherCondition = document.querySelector("[data-weather-condition]");
  const degrees = document.querySelector("[data-degrees]");
  const localTime = document.querySelector("[data-time]");

  cityLocation.innerText = name;
  regionLocation.innerText = `${region}, ${country}`;
  localTime.innerText = localtime.replace(/\d{4}\-\d{2}\-\d{2} /g, "");
  weatherIcon.style.backgroundImage = `url(${icon})`;
  weatherCondition.innerText = text;
  degrees.innerText = `${temp_c}° C`;
}

function renderSunsetAndRise(forecast) {
  const sunriseElement = document.querySelector("[data-time-sunrise]");
  const sunsetElement = document.querySelector("[data-time-sunset]");
  const { sunrise, sunset } = forecast.forecast.forecastday[0].astro;

  sunriseElement.innerText = sunrise;
  sunsetElement.innerText = sunset;
}

function renderRainExpectation(forecast, hourNow) {
  const rainSection = document.querySelector("[data-rain]");
  const list = document.createElement("ul");
  list.classList.add("main__list--rain");

  const hours = forecast.forecast.forecastday[0].hour;
  const maxIterations = 4;

  for (let i = 1; i < maxIterations; i++) {
    const listItem = document.createElement("li");
    listItem.classList.add("main__item--rain");
    const chanceOfRain = hours[hourNow + i].chance_of_rain;

    listItem.innerHTML = `
      <p class="main__text grey--text">${hourNow + i}:00</p>
      <div class="main--container--progress" style="background: linear-gradient(to right, #8cb2fb 0%, #8cb2fb ${chanceOfRain}%, #2b4366 ${chanceOfRain}%)"></div>
      <p class="main__text grey--text"> ${chanceOfRain}%</p>
    `;

    list.appendChild(listItem);
  }

  rainSection.appendChild(list);
}

async function renderAllWeatherInfos(location) {
  try {
    const hourNow = new Date().getHours();
    const forecastInfo = await getWeatherInfo(location, "forecast.json");
    const locationObject = await forecastInfo.location;
    const currentObject = await forecastInfo.current;

    renderOverview(currentObject);
    renderLocationWeather(
      locationObject,
      currentObject,
      currentObject.condition
    );
    renderRainExpectation(forecastInfo, hourNow);
    renderSunsetAndRise(forecastInfo);
  } catch (error) {
    console.log(error);
  }
}

renderDateInfos();
renderAllWeatherInfos("Rio de Janeiro");
