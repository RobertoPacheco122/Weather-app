function getOverviewElements() {
  return {
    minTemperature: document.querySelector("[data-min-temperature]"),
    maxTemperature: document.querySelector("[data-max-temperature]"),
    windSpeed: document.querySelector("[data-wind]"),
    uvIndex: document.querySelector("[data-uv]"),
    humidityCondition: document.querySelector("[data-humidity]"),
    precipitation: document.querySelector("[data-precipitation]"),
  };
}

async function renderOverviewSection(todayOverview) {
  const { avghumidity, uv, totalprecip_mm, maxwind_kph, maxtemp_c, mintemp_c } =
    todayOverview;

  const overviewElements = getOverviewElements();
  const {
    minTemperature,
    maxTemperature,
    windSpeed,
    uvIndex,
    humidityCondition,
    precipitation,
  } = overviewElements;

  minTemperature.innerText = `${mintemp_c}° C`;
  maxTemperature.innerText = `${maxtemp_c}° C`;
  windSpeed.innerText = `${maxwind_kph} km/h`;
  uvIndex.innerText = `${uv}`;
  humidityCondition.innerText = `${avghumidity}%`;
  precipitation.innerText = `${totalprecip_mm} mm`;
}

export default renderOverviewSection;
