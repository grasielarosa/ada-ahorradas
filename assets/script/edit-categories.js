const editInput = document.getElementById("inputEditCategory");
const btnEditing = document.getElementById("btnEditCategory");
const urlParams = new URLSearchParams(window.location.search);
const idParams = urlParams.get("id");
const categoryParams = urlParams.get("category");
editInput.value = categoryParams;

const editCategory = (event) => {
  const categoryName = editInput.value;
  if (categoryName != null) {
    const storage = getStorage();

    for (category of storage.categories) {
      if (category.id == idParams) {
        category.name = categoryName;
      }
    }
    storage.transactions.forEach((el) => {
      if (el.category === categoryParams) {
        el.category = categoryName;
      }
    });
    localStorage.setItem("ahorradas", JSON.stringify(storage));
  }
  window.location.href = "./index.html";
};

btnEditing.addEventListener("click", editCategory);

editInput.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    if (!editInput.value) return;
    editCategory(editInput.value);
  }
});
