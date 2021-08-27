// ***************** Events *****************

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

// sortedAmount = getStorage();
// sortedAmount.transactions.sort((value1, value2) => {
//   return value1.amount - value2.amount;
// });

// const sortedDescription = (value1, value2) => {
//   if (value1.description > value2.description) {
//     return 1;
//   }
//   if (value1.description < value2.description) {
//     return -1;
//   }

//   return 0;
// };

// const sortedDate = (value1, value2) => {
//   if (value1.transactionDate > value2.transactionDate) {
//     return 1;
//   }
//   if (value1.transactionDate < value2.transactionDate) {
//     return -1;
//   }
//   return 0;
// };

// const sortedFilter = (storage) => {
//   const selectSorted = document.getElementById("selectSorted").value;
//   console.log(selectSorted);
//   switch (selectSorted) {
// case "lastTr":
//   return;
//   break;
// case "firstTr":
//   return;
//   break;
// case "biggestTr":
//   return;
//   break;
// case "smallerTr":
//   return;
//   break;
//     case "aToZ":
//       console.log(storage);
//       storage.sort((value1, value2) => {
//         return sortedDescription(value1, value2);
//       });
//       break;
// case "zToA":
//   return;
//   break;
// default:
//   return;
//   }
// };

// *****************
const filter = () => {
  const storage = getStorage();
  let dataFiltered = storage.transactions;

  dataFiltered = typeFilter(dataFiltered);
  dataFiltered = categoryFilter(dataFiltered);
  dataFiltered = dateFilter(dataFiltered);
  // dateFiltered = sortedFilter(dataFiltered);
  addSavedTransactions(dataFiltered);
};
// *****************

// ***************** Events *****************

filterForm.addEventListener("change", filter);
//filterForm.addEventListener("change", sortedFilter);
