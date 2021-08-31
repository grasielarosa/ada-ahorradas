const editFormTransaction = document.getElementById("editFormTransaction");
// ***************** category input *****************

const categoriesInput = () => {
  const storage = getStorage();
  const categoryOperation = document.getElementById("editCategorySelect");
  for (let category of storage.categories) {
    const option = document.createElement("option");
    option.innerText = category.name.toLowerCase();
    option.value = category.name;
    option.dataset.id = category.id;
    categoryOperation.appendChild(option);
  }
};
categoriesInput();
// ***************** form *****************
const form = document.getElementById("editFormTransaction");
const editInputTransaction = document.getElementById("editInputTransaction");
const editInputAmount = document.getElementById("editInputAmount");
const editTypeSelect = document.getElementById("editTypeSelect");
const editCategorySelect = document.getElementById("editCategorySelect");
const editTransactionDate = document.getElementById("editTransactionDate");

const btnEditTransaction = document.getElementById("btnEditTransaction");
// ***************** params *****************
const urlParams = new URLSearchParams(window.location.search);
const idParams = urlParams.get("id");
const descriptionParams = urlParams.get("description");
const amountParams = urlParams.get("amount");
const transactionParams = urlParams.get("transaction");
const categoryParams = urlParams.get("category");
const dateParams = urlParams.get("transactionDate");

// ***************** params on form *****************
editInputTransaction.value = descriptionParams;
editInputAmount.value = amountParams;
editTypeSelect.value = transactionParams;
editCategorySelect.value = categoryParams;
editTransactionDate.value = dateParams;

const editTransaction = (e) => {
  e.preventDefault();
  const description = editInputTransaction.value;
  const amount = editInputAmount.value;
  const transaction = editTypeSelect.value;
  const category = editCategorySelect.value;
  const transactionDate = editTransactionDate.value;

  if (description != null) {
    const storage = getStorage();

    for (object of storage.transactions) {
      if (object.id == idParams) {
        object.description = description;
        object.amount = amount;
        object.transaction = transaction;
        object.category = category;
        object.transactionDate = transactionDate;
      }
    }
    localStorage.setItem("ahorradas", JSON.stringify(storage));
  }
};

editFormTransaction.addEventListener("submit", (e) => {
  if (e.target.checkValidity() === false) {
    e.preventDefault();
    e.stopPropagation();
    editFormTransaction.classList.add("was-validated");
  } else if (e.target.checkValidity() === true) {
    editTransaction(e);
    window.location.href = "./index.html";
  }
});
