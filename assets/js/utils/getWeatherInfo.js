async function getWeatherInfo(location, apiMethod) {
  let link;

  if (apiMethod === "forecast.json")
    link = `http://api.weatherapi.com/v1/forecast.json?key=8b0331a2ed8d4fefa7f214759230104&q=${location}&days=7&aqi=no&alerts=no&lang=pt`;
  if (apiMethod === "current.json")
    link = `https://api.weatherapi.com/v1/current.json?key=8b0331a2ed8d4fefa7f214759230104&q=${location}&aqi=no&lang=pt`;

  try {
    const weatherInfo = await fetch(link);
    const weatherInfoJSON = await weatherInfo.json();
    return weatherInfoJSON;
  } catch (error) {
    console.log(error);
  }
}

export default getWeatherInfo;
