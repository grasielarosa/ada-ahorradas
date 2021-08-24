const tBody = document.getElementById('tBody');
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
  btnDeleteTransaction.setAttribute("class", "btn btn-sm btn-outline-danger");
  btnDeleteTransaction.setAttribute("title", "click para apagar esta operación");
  return btnDeleteTransaction;
};

// ***************** FILTROS *****************
// ***************** category select *****************

  const categoriesInput = () => {
  	const storage = getStorage();

  for (let category of storage.categories) {
    const categorySelect = document.getElementById("categoryFilterSelect");
    const option = document.createElement("option");
    option.innerText = category.name.toLowerCase();
    option.value = category;
    categorySelect.appendChild(option);
  }
}; 
categoriesInput();


// ***************** LocalStorage *****************

const createTd = () => {
  const td = document.createElement('td');
  return td
}


// ***************** LocalStorage *****************
  const addSavedTransactions = () => {
    const transactions = localStorage.getItem("transactions");
    const transactionList = JSON.parse(transactions);
    console.log(transactionList);
    
  
    for (let object of transactionList) {
      console.log(object);
      const {description,
        amount,
        transactionSelect,
        categorySelect,
        transactionDate} = object;
        const tr = document.createElement('tr');
        tr.setAttribute('class', 'table table-success');
        const descriptionTable = document.createElement('th');
        descriptionTable.setAttribute('scope', 'row');
        descriptionTable.innerText = description;
        const amountTable = createTd();
        amountTable.innerText = amount;
        const dateTable = createTd();
        dateTable.innerText = transactionDate;
        const categoryTable = createTd();
        categoryTable.innerText = categorySelect;
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

  addSavedTransactions()
  categoriesInput()