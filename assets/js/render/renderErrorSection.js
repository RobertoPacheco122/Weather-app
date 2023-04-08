const renderErrorSection = () => {
  const overviewSection = document.querySelector(".main--container--overview");
  const errorSection = document.createElement("section");
  errorSection.classList.add("main__section", "main__section--error");

  errorSection.innerHTML = `
    <div class="main--container--error">
      <img src="assets/img/icons/sad-tear.svg" alt="" class="main__img--error">
      <p class="main__text bold">Não encontramos uma localidade com esse nome</p>
      <p class="main__text">Tente novamente!</p>
    </div>
  `;

  overviewSection.appendChild(errorSection);
};

export default renderErrorSection;
