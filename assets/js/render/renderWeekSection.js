import { getDayName } from "../utils/getDateInfo.js";

const renderWeekSection = (forecastDays) => {
  const weekCardsList = document.querySelector("[data-week-list]");

  for (let i = 1; i < forecastDays.length; i++) {
    const {
      maxtemp_c,
      mintemp_c,
      condition: { icon },
    } = forecastDays[i].day;

    const forecastDay = new Date(
      forecastDays[i].date.replace(/-/g, "/")
    ).getDay();
    const dayName = getDayName(forecastDay);
    const listItem = document.createElement("li");
    listItem.classList.add("main__item--week");

    listItem.innerHTML = `
      <div class="main--week--name">
        <p class="main__text ">${dayName}</p>
      </div>
      <div class="main--week--condition">
        <i class="main__icon--week icon" style="background-image: url(${icon})"></i>
      </div>
      <div class="main--week--temperature">
        <p class="main__text bold">${mintemp_c}°C</p>
        <p class="main__text bold">${maxtemp_c}°C</p>
      </div>
      `;

    weekCardsList.appendChild(listItem);
  }
};

export default renderWeekSection;
