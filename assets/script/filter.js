const filterForm = document.getElementById("filterForm");

const typeFilter = (storage) => {
  const select = document.getElementById("selectType").value;

  const filterType = storage.filter(
    (obj) => select === "all" || obj.transaction === select
  );
  return filterType;
};

const categoryFilter = (storage) => {
  const select = document.getElementById("categoryFilterSelect").value;
  const filterCategory = storage.filter(
    (obj) => select === "all" || obj.category === select
  );
  return filterCategory;
};

const dateFilter = (storage) => {
  const select = document.getElementById("dateFilterSelect").value;
  const filterDate = storage.filter((obj) => obj.transactionDate >= select);
  return filterDate;
};

const filter = () => {
  const storage = getStorage();
  let dataFiltered = storage.transactions;

  dataFiltered = typeFilter(dataFiltered);
  dataFiltered = categoryFilter(dataFiltered);
  dataFiltered = dateFilter(dataFiltered);
  addSavedTransactions(dataFiltered);
};

// ***************** Events *****************

filterForm.addEventListener("change", filter);
filterForm.addEventListener("change", filter);
filterForm.addEventListener("change", filter);
