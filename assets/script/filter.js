const filterForm = document.getElementById("filterForm");

const typeFilter = () => {
  const select = document.getElementById("selectType").value;
  const storage = getStorage();
  const noFilterType = select === "all" ? storage.transactions : false;
  console.log(noFilterType);

  const filterType = storage.transactions.filter(
    (obj) => obj.transaction === select
  );
  console.log(filterType);
};

const categoryFilter = () => {
  const select = document.getElementById("categoryFilterSelect").value;
  const storage = getStorage();
  const noFilterCategory = select === "all" ? storage.transactions : false;
  console.log(noFilterCategory);
  const filterCategory = storage.transactions.filter(
    (obj) => obj.category === select
  );
  console.log(filterCategory);
};

const dateFilter = () => {
  const select = document.getElementById("dateFilterSelect").value;
  const storage = getStorage();
  //const noFilterDate = select === "" ? storage.transactions : false;

  const filterDate = storage.transactions.filter(
    (obj) => obj.transactionDate === select
  );
  console.log(filterDate);
};

// ***************** Events *****************

filterForm.addEventListener("change", typeFilter);
filterForm.addEventListener("change", categoryFilter);
filterForm.addEventListener("change", dateFilter);
