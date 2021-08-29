// ***************** ***************** *****************
// *****************  new-category.js  *****************

const createList = () => {
  const list = document.createElement("li");
  list.setAttribute("class", " row justify-content-between");
  return list;
};

const createDiv = () => {
  const div = document.createElement("div");
  return div;
};

// ***************** clear input *****************
const clearInputCategory = () => {
  inputName.value = "";
  inputName.focus();
};

// ***************** ****** *****************
// ***************** report *****************

const getMonthName = (monthIndex) => {
  const monthName = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "novembre",
    "diciembre",
  ];
  return monthName[monthIndex];
};
