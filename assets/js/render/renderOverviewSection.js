const createOverviewHTML = ({
  avghumidity,
  uv,
  totalprecip_mm,
  maxwind_kph,
  maxtemp_c,
  mintemp_c,
}) => {
  const overviewSection = document.createElement("section");
  overviewSection.classList.add("main__section", "main__section--overview");

  overviewSection.innerHTML = `
    <div class="main--container--today">
      <h2 class="main__subtitle bold">Visão geral do dia</h2>
      <ul class="main__list">
        <li class="main__item">
          <div class="main__item--image">
            <i class="main__icon icon icon--min--temperature"></i>
          </div>
          <div class="main__item--content">
            <p class="main__text main__text--itemTitle">Temperatura Mínima</p>
            <p class="main__text main__text--info bold" data-min-temperature>${mintemp_c}° C</p>
          </div>
        </li>
        <li class="main__item">
          <div class="main__item--image">
            <i class="main__icon icon icon--max--temperature"></i>
          </div>
          <div class="main__item--content">
            <p class="main__text main__text--itemTitle">Temperatura Máxima</p>
            <p class="main__text main__text--info bold" data-max-temperature>${maxtemp_c}° C</p>
          </div>
        </li>
        <li class="main__item">
          <div class="main__item--image">
            <i class="main__icon icon icon--wind"></i>
          </div>
          <div class="main__item--content">
            <p class="main__text main__text--itemTitle">Velocidade dos Ventos</p>
            <p class="main__text main__text--info bold" data-wind>${maxwind_kph} km/h</p>
          </div>
        </li>
        <li class="main__item">
          <div class="main__item--image">
            <i class="main__icon icon icon--sun"></i>
          </div>
          <div class="main__item--content">
            <p class="main__text main__text--itemTitle">Índice de UV</p>
            <p class="main__text main__text--info bold" data-uv>${uv}</p>
          </div>
        </li>
        <li class="main__item">
          <div class="main__item--image">
            <i class="main__icon icon icon--humidity"></i>
          </div>
          <div class="main__item--content">
            <p class="main__text main__text--itemTitle">Humidade do Ar</p>
            <p class="main__text main__text--info bold" data-humidity>${avghumidity}%</p>
          </div>
        </li>
        <li class="main__item">
          <div class="main__item--image">
            <i class="main__icon icon icon--precipitation"></i>
          </div>
          <div class="main__item--content">
            <p class="main__text main__text--itemTitle">Total de Precipitação</p>
            <p class="main__text main__text--info bold" data-precipitation>${totalprecip_mm} mm</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="main--container--week" data-week-container>
      <h2 class="main__subtitle bold">Semana</h2>
      <ul class="main__list--week" data-week-list>
      </ul>
    </div>
  `;

  return overviewSection;
};

const renderOverviewSection = (todayOverview) => {
  const overviewSection = document.querySelector(".main--container--overview");
  const overviewHTML = createOverviewHTML(todayOverview);
  overviewSection.appendChild(overviewHTML);
};

export default renderOverviewSection;
