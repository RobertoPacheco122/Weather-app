const createAsideHTML = (
  { country, name, region, localtime },
  { temp_c, condition: { text, icon } }
) => {
  const asideDiv = document.createElement("div");
  asideDiv.classList.add("main--container--aside");
  const time = localtime.replace(/\d{4}\-\d{2}\-\d{2} /, "");

  asideDiv.innerHTML = `
    <header class="main__header--infos">
      <div class="main--container--locationData">
        <p class="main__text main__text--location bold" data-location>${name}</p>
        <p class="main__text grey--text" data-region>${region}, ${country}</p>
      </div>
      <div class="main--container--locationHour">
        <p class="main__text bold" data-time>${time}</p>
      </div>
    </header>
    <section class="main__section main__section--weather">
      <i class="main__icon main__icon--weather icon" data-weather-icon style="background-image: url(${icon})"></i>
      <div class="main--container--weatherData">
        <p class="main__text main__text--degrees bold" data-degrees>${temp_c}° C</p>
        <p class="main__text grey--text" data-weather-condition>${text}</p>
      </div>
    </section>
    <section class="main__section main__section--rain" data-rain>
      <p class="main__subtitle bold">Chance de chuva</p>
    </section>
    <section class="main__section main__section--sun">
      <p class="main__subtitle bold">Nascer e Pôr do Sol</p>
      <ul class="main__list main__list--sun">
        <li class="main__item main__item--sun">
          <div class="main__item--image">
            <i class="main__icon icon icon--sunrise"></i>
          </div>
          <div class="main__item--content">
            <p class="main__text main__text--itemTitle grey--text">Nascer do Sol</p>
            <p class="main__text main__text--info" data-time-sunrise></p>
          </div>
        </li>
        <li class="main__item main__item--sun">
          <div class="main__item--image">
            <i class="main__icon icon icon--sunset"></i>
          </div>
          <div class="main__item--content">
            <p class="main__text main__text--itemTitle grey--text">Pôr do Sol</p>
            <p class="main__text main__text--info" data-time-sunset></p>
          </div>
        </li>
      </ul>
    </section>
    <section class="main__section main__section--credits" style="display: flex;">
      <p class="main__text">Powered by WeatherAPI.com</p>
      
      <a href="https://www.weatherapi.com/" title="Free Weather API"><img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" border="0"></a>
    </section>
  `;

  return asideDiv;
};

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

function renderAsideSection(weather) {
  try {
    const asideContainer = document.querySelector(".main--container--infos");
    const hourNow = new Date().getHours();
    const { location, current, forecast } = weather;

    const asideDivContent = createAsideHTML(location, current);
    asideContainer.appendChild(asideDivContent);
    renderRainExpectation(forecast, hourNow);
    renderSunsetAndRise(forecast);
  } catch (error) {
    console.log(error);
  }
}

export default renderAsideSection;
