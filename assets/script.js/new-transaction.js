const form = document.getElementById("formTransaction");

const btnCancelNewTransaction = document.getElementById(
  "btnCancelNewTransaction"
);
const btnNewTransaction = document.getElementById("btnAddTransaction");

const transactions = document.getElementById("transactions");

// ***************** category input *****************

const categoriesInput = () => {
  	const storage = getStorage();

  for (let category of storage.categories) {
    const categorySelect = document.getElementById("categorySelect");
    const option = document.createElement("option");
    option.innerText = category.name.toLowerCase();
    option.value = category;
    categorySelect.appendChild(option);
  }
}; 
categoriesInput();

// ***************** clear input *****************
const clearInput = () => {
  const inputTransactionDescription =
    document.getElementById("inputTransaction");
  const amount = document.getElementById("inputAmount");
  const transactionDate = document.getElementById("transactionDate");

  inputTransactionDescription.value = "";
  inputTransactionDescription.focus();
  amount.value = "";
  amount.focus();
  transactionDate.value = new Date();
  transactionDate.focus();
};


// ***************** create object *****************

let transactionArray = [];

const createTransactionObject = (
  //id,
  inputTransactionDescription,
  amount,
  transactionSelect,
  categorySelect,
  transactionDate
) => {
  const transactionObject = {
    //id: id,
    description: inputTransactionDescription,
    amount: amount,
    transaction: transactionSelect,
    category: categorySelect,
    transactionDate,
  };
  const storageTransaction = getStorage();
  storageTransaction.transactions.push(transactionObject);
  localStorage.setItem('ahorradas', JSON.stringify(storageTransaction));
};


// ***************** create new transaction *****************
const createNewTransaction = (e) => {
  e.preventDefault();
  const inputTransactionDescription = document
    .getElementById("inputTransaction")
    .value.toLowerCase();
  const amount = document.getElementById("inputAmount").value.toLowerCase();
  const transactionSelect = document
    .getElementById("typeSelect")
    .value.toLowerCase();
  const categorySelect = document
    .getElementById("categorySelect")
    .value.toLowerCase();
  const transactionDate = document
    .getElementById("transactionDate")
    .value.toLowerCase();

  createTransactionObject(
    inputTransactionDescription,
    amount,
    transactionSelect,
    categorySelect,
    transactionDate
  );

  clearInput();
};

// ***************** event with click *****************
btnNewTransaction.addEventListener("click", createNewTransaction);

