function getDayName(dayNumber) {
  let day;
  switch (dayNumber) {
    case 0:
      day = "Domingo";
      break;
    case 1:
      day = "Segunda-feira";
      break;
    case 2:
      day = "Terça-feira";
      break;
    case 3:
      day = "Quarta-feira";
      break;
    case 4:
      day = "Quinta-feira";
      break;
    case 5:
      day = "Sexta-feira";
      break;
    case 6:
      day = "Sábado";
      break;
    default:
      return false;
  }
  return day;
}

function getMonthName(monthNumber) {
  let month;
  switch (monthNumber) {
    case 0:
      month = "Janeiro";
      break;
    case 1:
      month = "Fevereiro";
      break;
    case 2:
      month = "Março";
      break;
    case 3:
      month = "Abril";
      break;
    case 4:
      month = "Maio";
      break;
    case 5:
      month = "Junho";
      break;
    case 6:
      month = "Julho";
      break;
    case 7:
      month = "Agosto";
      break;
    case 8:
      month = "Setembro";
      break;
    case 9:
      month = "Outubro";
      break;
    case 10:
      month = "Novembro";
      break;
    case 11:
      month = "Dezembro";
      break;
    default:
      return false;
  }
  return month;
}

function getDateInfo() {
  const date = new Date();
  return {
    dayNumber: date.getDay(),
    dayName: getDayName(date.getDay()),
    dayOfMonth: date.getDate(),
    monthNumber: date.getMonth(),
    monthName: getMonthName(date.getMonth()),
    year: date.getFullYear(),
  };
}
