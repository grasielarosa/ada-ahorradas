const tBody = document.getElementById("tBody");

// ***************** butons *****************
const createEditTransactionBtn = () => {
  const btnEditTransaction = document.createElement("button");
  btnEditTransaction.innerText = "editar";
  btnEditTransaction.setAttribute("class", "btn btn-sm btn-outline-warning");
  btnEditTransaction.setAttribute("title", "click para editar esta operación");
  return btnEditTransaction;
};

const createDeleteTransactionBtn = () => {
  const btnDeleteTransaction = document.createElement("button");
  btnDeleteTransaction.innerText = "apagar";
  btnDeleteTransaction.setAttribute(
    "class",
    "btn btn-sm btn-outline-danger delete-category"
  );
  btnDeleteTransaction.setAttribute(
    "title",
    "click para apagar esta operación"
  );
  return btnDeleteTransaction;
};

// ***************** FILTROS *****************
// ***************** category select *****************

const categoriesInputBalance = () => {
  const storage = getStorage();
  const categoryFilterSelect = document.getElementById("categoryFilterSelect");
  for (let category of storage.categories) {
    const option = document.createElement("option");
    option.innerText = category.name.toLowerCase();
    option.value = category.name;
    categoryFilterSelect.appendChild(option);
  }
};

// ***************** LocalStorage *****************

const createTd = () => {
  const td = document.createElement("td");
  return td;
};

// ***************** LocalStorage *****************
const addSavedTransactions = () => {
  const transactionList = getStorage();

  for (let object of transactionList.transactions) {
    const { id, description, amount, transaction, category, transactionDate } =
      object;

    const tr = document.createElement("tr");
    if (transaction === "debt") {
      tr.setAttribute("class", "table table-danger");
    }
    if (transaction === "credit") {
      tr.setAttribute("class", "table table-success");
    }

    tr.dataset.id = object.id;

    const descriptionTable = document.createElement("th");
    descriptionTable.setAttribute("scope", "row");
    descriptionTable.innerText = description;

    const dateTable = createTd();
    dateTable.innerText = transactionDate;
    const categoryTable = createTd();
    categoryTable.innerText = category;
    const amountTable = createTd();
    amountTable.innerText = amount;
    const btnTable = createTd();
    const newDeleteTransactionBtn = createDeleteTransactionBtn();
    const newEditTransactionBtn = createEditTransactionBtn();

    tr.appendChild(descriptionTable);
    tr.appendChild(categoryTable);
    tr.appendChild(dateTable);
    tr.appendChild(amountTable);
    btnTable.appendChild(newEditTransactionBtn);
    btnTable.appendChild(newDeleteTransactionBtn);
    tr.appendChild(btnTable);
    tBody.appendChild(tr);
  }
};

// ***************** delete function *****************
const deleteTransaction = (id) => {
  const storage = getStorage();
  const index = storage.transactions.findIndex((el) => el.id === id);
  storage.transactions.splice(index, 1);
  localStorage.setItem("ahorradas", JSON.stringify(storage));
};

document.addEventListener("click", function (e) {
  const el = e.target;
  if (el.classList.contains("delete-category")) {
    const li = el.parentElement.parentElement;
    const id = li.getAttribute("data-id");
    li.remove();
    deleteTransaction(id);
    balanceSummary();

    //! remover todas as operações
  }
  // if (el.classList.contains("edit-category")) {
  //   const li = el.parentElement.parentElement;
  //   const id = li.getAttribute("data-id");
  //   //! editar categoria
  //   console.log(id);
  // }
});

// ***************** Balance *****************

const balanceSummary = () => {
  const creditSummary = document.getElementById("creditBalance");
  const debtSummary = document.getElementById("debtBalance");
  const financialSummary = document.getElementById("totalBalance");
  const storage = getStorage();

  const credit = storage.transactions
    .filter((obj) => obj.transaction === "credit")
    .reduce((start, elemento) => {
      return parseFloat((start + Number(elemento.amount)).toFixed(2));
    }, 0);
  const debt = storage.transactions
    .filter((obj) => obj.transaction === "debt")
    .reduce((start, elemento) => {
      return parseFloat((start + Number(elemento.amount)).toFixed(2));
    }, 0);

  creditSummary.innerText = credit;
  creditSummary.setAttribute("class", "text-success");
  debtSummary.innerText = ` - ${debt}`;
  debtSummary.setAttribute("class", "text-danger");
  const total = parseFloat((credit - debt).toFixed(2));
  if (total > 0) {
    financialSummary.innerText = `${total}`;
    financialSummary.setAttribute("class", "text-success");
  }
  if (total < 0) {
    financialSummary.innerText = `${total}`;
    financialSummary.setAttribute("class", "text-danger");
  }
};

const init = () => {
  addSavedTransactions();
  categoriesInputBalance();
  balanceSummary();
};

init();
