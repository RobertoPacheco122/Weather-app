import renderAsideSection from "./renderAsideSection.js";
import renderDateInfos from "./renderDateInfos.js";
import renderOverviewSection from "./renderOverviewSection.js";
import getWeatherInfo from "../utils/getWeatherInfo.js";
import renderWeekSection from "../render/renderWeekSection.js";
import renderErrorSection from "./renderErrorSection.js";

const renderApp = async (location) => {
  if (location === undefined) location = "Rio de Janeiro";
  const errorSection = document.querySelector(".main__section--error");

  try {
    const weather = await getWeatherInfo(location, "forecast.json");
    const todayOverview = await weather.forecast.forecastday[0].day;
    renderOverviewSection(todayOverview);
    renderDateInfos();
    renderWeekSection(weather.forecast.forecastday);
    renderAsideSection(weather);
    if (errorSection) errorSection.remove();
  } catch (error) {
    console.log(error);
    renderErrorSection();
  }
};

export default renderApp;
