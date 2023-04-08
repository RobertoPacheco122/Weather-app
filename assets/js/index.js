import renderApp from "./render/renderApp.js";

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

searchInput.addEventListener("change", handleChange);
form.addEventListener("submit", (event) => event.preventDefault());

renderApp();
