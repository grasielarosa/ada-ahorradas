const inputName = document.getElementById("inputNameID");
const btnNewCategory = document.getElementById("btnNewCategory");
const categories = document.getElementById("categoriesId");

// ***************** ***************** ***************** *****************
// ***************** suport functions *****************
// ***************** ***************** ***************** *****************

// ***************** create list *****************

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

// ***************** create edit y delete button *****************

const createEditCategoryBtn = () => {
  const btnEditCategory = document.createElement("button");
  btnEditCategory.innerText = "editar";
  btnEditCategory.setAttribute("class", "btn btn-sm btn-outline-warning edit-category");
  btnEditCategory.setAttribute("title", "click para editar esta categoría");
  return btnEditCategory;
};

const createDeleteCategoryBtn = () => {
  const btnDeleteCategory = document.createElement("button");
  btnDeleteCategory.innerText = "apagar";
  btnDeleteCategory.setAttribute("class", "btn btn-sm btn-outline-danger delete-category");
  btnDeleteCategory.setAttribute("title", "click para apagar esta categoría");
  return btnDeleteCategory;
};

// ***************** ***************** ***************** *****************
// ***************** main functions - create new category *****************
// ***************** ***************** ***************** *****************
const createNewCategory = (inputValue) => {
  const newList = createList();
  const col1 = createDiv();
  col1.setAttribute("class", "col-12 col-md-6 col-lg-8 align-self-md-end mb-2");

  const newCategory = document.createElement("span");
  newCategory.innerText = inputValue.toLowerCase();
  newCategory.setAttribute("class", "bg-success px-lg-3 py-1");

  const col2 = createDiv();
  col2.setAttribute(
    "class",
    "col-12 col-md-5 col-lg-3 text-md-end align-self-md-start me-0 me-md-3"
  );
  const newDeleteCategoryBtn = createDeleteCategoryBtn();
  const newEditCategoryBtn = createEditCategoryBtn();

  col1.appendChild(newCategory);
  col2.appendChild(newEditCategoryBtn);
  col2.appendChild(newDeleteCategoryBtn);
  newList.appendChild(col1);
  newList.appendChild(col2);
  categories.appendChild(newList);

  clearInputCategory();
  saveCategories();
};

// ***************** event with click *****************
btnNewCategory.addEventListener("click", function () {
  if (!inputName.value) return;
  createNewCategory(inputName.value);
});

// ***************** event with keyboard *****************
inputName.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    if (!inputName.value) return;
    createNewCategory(inputName.value);
  }
});

// ***************** delete  function *****************
document.addEventListener("click", function (e) {
  const el = e.target;

  if (el.classList.contains("delete-category")) {
    el.parentElement.parentElement.remove();
    saveCategories();
  }
});

// ***************** ***************** *****************
// *****************   Local Storage   *****************
// ***************** ***************** *****************

// cambiar para spread operator
const saveCategories = () => {
  const liCategory = categories.querySelectorAll("li");
  const categoryList = [];

  for (category of liCategory) {
    let categoryName = category.innerText;
    categoryName = categoryName.replace("apagar", "").trim();
    categoryName = categoryName.replace("editar", "").trim();
    categoryList.push(categoryName);
  }

  const categoriesJSON = JSON.stringify(categoryList);
  localStorage.setItem("categories", categoriesJSON);
};

const addSavedCategories = () => {
  const categories = localStorage.getItem("categories");
  const categoryList = JSON.parse(categories);
  console.log(categoryList);

  for (let category of categoryList) {
    createNewCategory(category);
  }
};

addSavedCategories();
