const form = document.getElementById("formTransaction");

const inputTransactionDescription = document.getElementById("inputTransaction");
const amount = document.getElementById("inputAmount");
const transactionSelect = document.getElementById("typeSelect");
const categorySelect = document.getElementById("categorySelect");
const transactionDate = document.getElementById("transactionDate");

const btnCancelNewTransaction = document.getElementById(
  "btnCancelNewTransaction"
);
const btnNewTransaction = document.getElementById("btnAddTransaction");

const transactions = document.getElementById("transactions");

// ***************** ***************** *****************
// ***************** suport functions *****************
// ***************** ***************** *****************

// ***************** create list *****************

const createList = () => {
  return document.createElement("li");
};

// ***************** clear input *****************
const clearInputTransaction = () => {
  inputTransactionDescription.value = "";
  inputTransactionDescription.focus();
};

// ***************** ***************** ***************** *****************
// *************** main functions - create new transaction ***************
// ***************** ***************** ***************** *****************
const showNewTransaction = (descriptionValue) => {
  const newTransaction = createList();
  newTransaction.innerText = descriptionValue;
  transactions.appendChild(newTransaction);

  clearInputTransaction();
  // createEditCategoryBtn(newCategory);
  // createDeleteCategoryBtn(newCategory);
  // saveCategories();
};

// const createObjTransaction = () => {
//     return {
//         //atributos
//         form: document.querySelector(form),
//         description: String,
//         amount: Number,
//         transaction: String,
//         category: String,
//         dateTransaction: Date,

//         //metodos

//     }
// }

// ***************** event with click *****************
btnNewTransaction.addEventListener("click", function () {
  if (!inputTransactionDescription.value) return;
  showNewTransaction(inputTransactionDescription.value);
});
