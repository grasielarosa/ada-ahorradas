// ***************** ***************** *****************
// *****************   new-category.js   *****************
// ***************** ***************** *****************

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


// ***************** ***************** *****************
// *****************   new-transaction.js   *****************
// ***************** ***************** *****************