const inputName = document.getElementById("inputNameID");
const btnNewCategory = document.getElementById("btnNewCategory");
const categories = document.getElementById("categoriesId");

// ***************** create edit y delete button *****************

const createEditCategoryBtn = () => {
  const btnEditCategory = document.createElement("a");
  btnEditCategory.innerText = "editar";
  btnEditCategory.setAttribute(
    "class",
    "btn btn-sm btn-outline-warning edit-category"
  );
  btnEditCategory.setAttribute("title", "click para editar esta categoría");
  return btnEditCategory;
};

const createDeleteCategoryBtn = () => {
  const btnDeleteCategory = document.createElement("button");
  btnDeleteCategory.innerText = "apagar";
  btnDeleteCategory.setAttribute(
    "class",
    "btn btn-sm btn-outline-danger delete-category"
  );
  btnDeleteCategory.setAttribute("title", "click para apagar esta categoría");
  return btnDeleteCategory;
};

// ***************** create Category Object *****************
const createCategoryObject = (inputName) => {
  const categoryObject = {
    id: createID(),
    name: inputName,
  };

  const storageCategory = getStorage();
  storageCategory.categories.push(categoryObject);
  localStorage.setItem("ahorradas", JSON.stringify(storageCategory));

  clearInputCategory();
  createNewCategory();
};

// ***************** create New Category *****************
const createNewCategory = () => {
  categories.innerHTML = " ";
  const storage = getStorage();

  for (const category of storage.categories) {
    const newList = createList();
    newList.dataset.id = category.id;
    newList.dataset.name = category.name;
    const col1 = createDiv();
    col1.setAttribute(
      "class",
      "col-12 col-md-6 col-lg-8 align-self-md-end mb-2"
    );

    const newCategory = document.createElement("span");
    newCategory.innerText = category.name.toLowerCase();
    newCategory.setAttribute("class", "bg-success px-lg-3 py-1");
    newCategory.dataset.id = category.id;

    const col2 = createDiv();
    col2.setAttribute(
      "class",
      "col-12 col-md-5 col-lg-3 text-md-end align-self-md-start me-0 me-md-3"
    );
    const newDeleteCategoryBtn = createDeleteCategoryBtn();
    const newEditCategoryBtn = createEditCategoryBtn();
    newEditCategoryBtn.href = `./edit-categories.html?id=${category.id}&category=${category.name}`;

    col1.appendChild(newCategory);
    col2.appendChild(newEditCategoryBtn);
    col2.appendChild(newDeleteCategoryBtn);
    newList.appendChild(col1);
    newList.appendChild(col2);
    categories.appendChild(newList);
  }
};

// ***************** delete function *****************
const deleteCategory = (id, name) => {
  const storage = getStorage();
  const filterCategories = storage.categories.filter((el) => el.id !== id);
  const filterTransactions = storage.transactions.filter(
    (el) => el.category !== name
  );
  storage.categories = filterCategories;
  storage.transactions = filterTransactions;
  localStorage.setItem("ahorradas", JSON.stringify(storage));
};

createNewCategory();

// ***************** ***************** *****************
// *****************       events      *****************
// ***************** ***************** *****************

// ***************** event with click *****************
btnNewCategory.addEventListener("click", function () {
  if (!inputName.value) return;
  createCategoryObject(inputName.value);
});

// ***************** event with keyboard *****************
inputName.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    if (!inputName.value) return;
    createCategoryObject(inputName.value);
  }
});

// ***************** buttons event *****************
document.addEventListener("click", function (e) {
  const el = e.target;
  if (el.classList.contains("delete-category")) {
    const li = el.parentElement.parentElement;
    const id = li.getAttribute("data-id");
    const name = li.getAttribute("data-name");

    li.remove();
    deleteCategory(id, name);
  }
  if (el.classList.contains("edit-category")) {
    const li = el.parentElement.parentElement;
    const id = li.getAttribute("data-id");
  }
});
