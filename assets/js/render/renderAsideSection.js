function getAsideElements() {
  return {
    cityLocation: document.querySelector("[data-location]"),
    regionLocation: document.querySelector("[data-region]"),
    weatherIcon: document.querySelector("[data-weather-icon]"),
    weatherCondition: document.querySelector("[data-weather-condition]"),
    degrees: document.querySelector("[data-degrees]"),
    localTime: document.querySelector("[data-time]"),
  };
}

function renderLocationWeather(
  { country, name, region, localtime },
  { temp_c },
  { text, icon }
) {
  const asideElements = getAsideElements();

  const {
    cityLocation,
    regionLocation,
    localTime,
    weatherIcon,
    weatherCondition,
    degrees,
  } = asideElements;

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
  const hours = forecast.forecastday[0].hour;
  const maxIterations = 3;
  list.classList.add("main__list--rain");

  for (let i = 1; i < maxIterations + 1; i++) {
    const listItem = document.createElement("li");
    const chanceOfRain = hours[hourNow + i].chance_of_rain;
    listItem.classList.add("main__item--rain");

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
  const { sunrise, sunset } = forecast.forecastday[0].astro;

  sunriseElement.innerText = sunrise;
  sunsetElement.innerText = sunset;
}

async function renderAsideSection(weather) {
  try {
    const hourNow = new Date().getHours();
    const { location, current, forecast } = weather;

    renderLocationWeather(location, current, current.condition);
    renderRainExpectation(forecast, hourNow);
    renderSunsetAndRise(forecast);
  } catch (error) {
    console.log(error);
  }
}

export default renderAsideSection;
