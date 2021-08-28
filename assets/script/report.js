const tBodyCategories = document.getElementById("tBodyCategories");
const storage = getStorage().transactions;

// ******************** categories  ********************
const categoryReport = () => {
  let categoryReport = [];
  storage.forEach((value) => {
    if (!categoryReport[value.category]) {
      categoryReport[value.category] = {};
      categoryReport[value.category].credit = 0;
      categoryReport[value.category].debt = 0;
    }

    categoryReport[value.category][value.transaction] += Number(value.amount);

    return categoryReport;
  });
  generateCategoryReport(categoryReport);
};

const generateCategoryReport = (categoryReport) => {
  tBodyCategories.innerHTML = null;
  for (let category in categoryReport) {
    const name = category;
    const credit = categoryReport[category].credit;
    const debt = categoryReport[category].debt;
    const balance =
      categoryReport[category].credit - categoryReport[category].debt;
    console.log(name, credit, debt, balance);

    const tr = document.createElement("tr");
    const thCategory = document.createElement("th");
    thCategory.setAttribute("class", "fw-light text-start");
    const span = document.createElement("span");
    span.innerText = name;
    span.setAttribute("class", 'bg-success px-lg-3 py-1">teste');
    const thCredit = document.createElement("th");
    thCredit.innerText = credit;
    thCredit.setAttribute("class", "fw-light text-success");
    const thDebt = document.createElement("th");
    thDebt.innerText = debt;
    thDebt.setAttribute("class", "fw-light text-danger");
    const thBalance = document.createElement("th");
    thBalance.innerText = balance;
    if (balance >= 0) {
      thBalance.setAttribute("class", "fw-bold text-success");
    }
    if (balance < 0) {
      thBalance.setAttribute("class", "fw-bold text-danger");
    }

    thCategory.appendChild(span);
    tr.appendChild(thCategory);
    tr.appendChild(thCredit);
    tr.appendChild(thDebt);
    tr.appendChild(thBalance);
    tBodyCategories.appendChild(tr);
  }
};

const initReport = () => {
  categoryReport();
  summaryReport();
};

initReport();
