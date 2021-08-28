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

// ***************** Sort *****************

const sortedDescriptionASC = (value1, value2) =>
  value1.description < value2.description ? -1 : 1;

const sortedDescriptionDES = (value1, value2) =>
  value1.description > value2.description ? -1 : 1;

const sortedDateASC = (value1, value2) =>
  value1.transactionDate > value2.transactionDate ? -1 : 1;

const sortedDateDES = (value1, value2) =>
  value1.transactionDate < value2.transactionDate ? -1 : 1;

const sortedAmountASC = (value1, value2) => value2.amount - value1.amount;

const sortedAmountDES = (value1, value2) => value1.amount - value2.amount;

const sortedFilter = (storage) => {
  const selectSorted = document.getElementById("selectSorted").value;
  switch (selectSorted) {
    case "lastTr":
      return storage.sort(sortedDateASC);
    case "firstTr":
      return storage.sort(sortedDateDES);
    case "biggestTr":
      return storage.sort(sortedAmountASC);
    case "smallerTr":
      return storage.sort(sortedAmountDES);
    case "aToZ":
      return storage.sort(sortedDescriptionASC);

    case "zToA":
      return storage.sort(sortedDescriptionDES);

    default:
      return;
  }
};

// *****************
const filter = () => {
  const storage = getStorage();
  let dataFiltered = storage.transactions;

  dataFiltered = typeFilter(dataFiltered);
  dataFiltered = categoryFilter(dataFiltered);
  dataFiltered = dateFilter(dataFiltered);
  dateFiltered = sortedFilter(dataFiltered);
  addSavedTransactions(dataFiltered);
};
// *****************

// ***************** Events *****************

filterForm.addEventListener("change", filter);
