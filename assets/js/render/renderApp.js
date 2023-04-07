import renderAsideSection from "./renderAsideSection.js";
import renderDateInfos from "./renderDateInfos.js";
import renderOverviewSection from "./renderOverviewSection.js";
import getWeatherInfo from "../utils/getWeatherInfo.js";

const renderApp = async (location) => {
  if (location === undefined) location = "Rio de Janeiro";

  try {
    const weather = await getWeatherInfo(location, "forecast.json");
    const todayOverview = await weather.forecast.forecastday[0].day;

    renderDateInfos();
    await renderOverviewSection(todayOverview);
    await renderAsideSection(weather);
  } catch (error) {
    console.log(error);
  }
};

export default renderApp;
