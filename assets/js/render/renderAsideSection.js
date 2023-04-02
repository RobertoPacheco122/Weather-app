import getWeatherInfo from "../utils/getWeatherInfo.js";

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

function renderSunsetAndRise(forecast) {
  const sunriseElement = document.querySelector("[data-time-sunrise]");
  const sunsetElement = document.querySelector("[data-time-sunset]");
  const { sunrise, sunset } = forecast.forecast.forecastday[0].astro;

  sunriseElement.innerText = sunrise;
  sunsetElement.innerText = sunset;
}

async function renderAsideSection(location) {
  try {
    const hourNow = new Date().getHours();
    const forecastInfo = await getWeatherInfo(location, "forecast.json");
    const locationObject = await forecastInfo.location;
    const currentObject = await forecastInfo.current;

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

export default renderAsideSection;
