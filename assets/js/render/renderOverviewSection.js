import getWeatherInfo from "../utils/getWeatherInfo.js";

function getOverviewElement() {
  return {
    windSpeed: document.querySelector("[data-wind]"),
    thermicSensation: document.querySelector("[data-degrees-sensation]"),
    pressure: document.querySelector("[data-pressure]"),
    uvIndex: document.querySelector("[data-uv]"),
    humidityCondition: document.querySelector("[data-humidity]"),
    precipitation: document.querySelector("[data-precipitation]"),
  };
}

async function renderOverviewSection(location) {
  const currentWeather = await getWeatherInfo(location, "current.json");

  const { wind_kph, pressure_mb, uv, humidity, precip_mm, feelslike_c } =
    currentWeather.current;
  const overviewElements = getOverviewElement();
  const {
    windSpeed,
    thermicSensation,
    pressure,
    uvIndex,
    humidityCondition,
    precipitation,
  } = overviewElements;

  windSpeed.innerText = `${wind_kph} km/h`;
  thermicSensation.innerText = `${feelslike_c}° C`;
  pressure.innerText = `${pressure_mb} mbar`;
  uvIndex.innerText = `${uv}`;
  humidityCondition.innerText = `${humidity}%`;
  precipitation.innerText = `${precip_mm} mm`;
}

export default renderOverviewSection;
