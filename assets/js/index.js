import renderApp from "./render/renderApp.js";

const handleChange = async (event) => {
  event.preventDefault();

  const inputValue = event.currentTarget.value;
  await renderApp(inputValue);
};

const form = document.querySelector(".main__form");
const searchInput = document.querySelector("#location");

searchInput.addEventListener("change", handleChange);
form.addEventListener("submit", (event) => event.preventDefault());

renderApp();
