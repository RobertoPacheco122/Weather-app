import renderApp from "./render/renderApp.js";
import getUserLocation from "./utils/getUserLocation.js";

const handleChange = (event) => {
  event.preventDefault();
  const overviewSection = document.querySelector(".main__section--overview");
  const asideSection = document.querySelector(".main--container--aside");
  const inputValue = event.currentTarget.value;

  if (overviewSection && asideSection) {
    overviewSection.remove();
    asideSection.remove();
  }

  renderApp(inputValue);
};

const form = document.querySelector(".main__form");
const searchInput = document.querySelector("#location");
const gpsIconContainer = document.querySelector(".main--container--icon");

searchInput.addEventListener("change", handleChange);
form.addEventListener("submit", (event) => event.preventDefault());
gpsIconContainer.addEventListener("click", () => getUserLocation());

renderApp();
