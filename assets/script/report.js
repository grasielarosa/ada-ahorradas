const tBodyResumen = document.getElementById("tBodyResumen");
const tBodyCategories = document.getElementById("tBodyCategories");
const tBodyDate = document.getElementById("tBodyDate");
const storage = getStorage().transactions;

// ******************** categories  ********************
const categoryReport = () => {
  let categoryReportArr = [];
  storage.forEach((value) => {
    if (!categoryReportArr[value.category]) {
      categoryReportArr[value.category] = {};
      categoryReportArr[value.category].credit = 0;
      categoryReportArr[value.category].debt = 0;
    }

    categoryReportArr[value.category][value.transaction] += Number(
      value.amount
    );
    return categoryReportArr;
  });
  generateCategoryReport(categoryReportArr);
  categoryResumen(categoryReportArr);
};

const generateCategoryReport = (categoryReportArr) => {
  tBodyCategories.innerHTML = null;
  for (let category in categoryReportArr) {
    const name = category;
    const credit = categoryReportArr[category].credit;
    const debt = categoryReportArr[category].debt;
    const balance =
      categoryReportArr[category].credit - categoryReportArr[category].debt;

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

// ******************** date  ********************

const dateReport = () => {
  let dateReport = [];
  storage.forEach((value) => {
    const date = new Date(value.transactionDate);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (!dateReport[year]) {
      dateReport[year] = {};
    }
    if (!dateReport[year][month]) {
      dateReport[year][month] = {};
      dateReport[year][month].credit = 0;
      dateReport[year][month].debt = 0;
    }
    dateReport[year][month][value.transaction] += Number(value.amount);
    return dateReport;
  });

  generateDateReport(dateReport);
  dateResumen(dateReport);
};

const generateDateReport = (dateReport) => {
  tBodyDate.innerHTML = null;
  for (let year of dateReport) {
    for (let month in year) {
      const monthName = getMonthName(month - 1);
      const credit = year[month].credit;
      const debt = year[month].debt;
      const balance = year[month].credit - year[month].debt;

      const tr = document.createElement("tr");
      const thDate = document.createElement("th");
      thDate.setAttribute("class", "fw-light text-start");
      const span = document.createElement("span");
      span.innerText = ` / ${monthName}`;
      // ! no he podido poner el año
      span.setAttribute("class", "bg-success px-lg-3 py-1");
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

      thDate.appendChild(span);
      tr.appendChild(thDate);
      tr.appendChild(thCredit);
      tr.appendChild(thDebt);
      tr.appendChild(thBalance);
      tBodyDate.appendChild(tr);
    }
  }
};

// ******************** summary  ********************
const categoryResumen = (categoryReportArr) => {
  let valueCredit = 0;
  let valueDebt = 0;
  let valueBalance = 0;
  let profit = new Object();
  let expenses = new Object();
  let income = new Object();
  for (category in categoryReportArr) {
    const name = category;
    const credit = categoryReportArr[category].credit;
    const debt = categoryReportArr[category].debt;
    const balance =
      categoryReportArr[category].credit - categoryReportArr[category].debt;
    if (credit > valueCredit) {
      (valueCredit = credit),
        (profit = {
          category: name,
          total: credit,
        });
    }
    if (debt > valueDebt) {
      (valueDebt = debt),
        (expenses = {
          category: name,
          total: debt,
        });
    }
    if (balance > valueBalance) {
      (valueBalance = balance),
        (income = {
          category: name,
          total: balance,
        });
    }
  }
  generateSummaryCategory(profit, expenses, income);
};

const generateSummaryCategory = (profit, expenses, income) => {
  const profitCat = document.getElementById("profitCat");
  const thCategory = document.createElement("th");
  thCategory.setAttribute("class", "fw-light");
  const spanProfit = document.createElement("span");
  spanProfit.innerText = profit.category;
  spanProfit.setAttribute("class", "bg-success px-lg-3 py-1");
  const thCredit = document.createElement("th");
  thCredit.innerText = profit.total;
  thCredit.setAttribute("class", "fw-bold text-success");

  const expensesCat = document.getElementById("expensesCat");
  const thExpenses = document.createElement("th");
  thExpenses.setAttribute("class", "fw-light");
  const spanExpenses = document.createElement("span");
  spanExpenses.innerText = expenses.category;
  spanExpenses.setAttribute("class", "bg-success px-lg-3 py-1");
  const thDebt = document.createElement("th");
  thDebt.innerText = expenses.total;
  thDebt.setAttribute("class", "fw-bold text-danger");

  const incomeCat = document.getElementById("incomeCat");
  const thIncome = document.createElement("th");
  thIncome.setAttribute("class", "fw-light");
  const spanIncome = document.createElement("span");
  spanIncome.innerText = income.category;
  spanIncome.setAttribute("class", "bg-success px-lg-3 py-1");
  const thBalance = document.createElement("th");
  thBalance.innerText = income.total;
  if (income.total >= 0) {
    thBalance.setAttribute("class", "fw-bold text-success");
  }
  if (income.total < 0) {
    thBalance.setAttribute("class", "fw-bold text-danger");
  }

  thCategory.appendChild(spanProfit);
  profitCat.appendChild(thCategory);
  profitCat.appendChild(thCredit);

  thExpenses.appendChild(spanExpenses);
  expensesCat.appendChild(thExpenses);
  expensesCat.appendChild(thDebt);

  thIncome.appendChild(spanIncome);
  incomeCat.appendChild(thIncome);
  incomeCat.appendChild(thBalance);
};

const dateResumen = (dateReport) => {
  let valueCredit = 0;
  let valueDebt = 0;
  let profit = new Object();
  let expenses = new Object();
  for (let year of dateReport) {
    for (let month in year) {
      const monthName = getMonthName(month - 1);
      const credit = year[month].credit;
      const debt = year[month].debt;

      if (credit > valueCredit) {
        (valueCredit = credit),
          (profit = {
            category: monthName,
            total: credit,
          });
      }
      if (debt > valueDebt) {
        (valueDebt = debt),
          (expenses = {
            category: monthName,
            total: debt,
          });
      }
    }
  }
  generateSummaryDate(profit, expenses);
};

const generateSummaryDate = (profit, expenses) => {
  const profitMonth = document.getElementById("profitMonth");
  const thCategory = document.createElement("th");
  thCategory.setAttribute("class", "fw-light");
  const spanProfit = document.createElement("span");
  spanProfit.innerText = profit.category;
  spanProfit.setAttribute("class", "bg-success px-lg-3 py-1");
  const thCredit = document.createElement("th");
  thCredit.innerText = profit.total;
  thCredit.setAttribute("class", "fw-bold text-success");

  const expensesMonth = document.getElementById("expensesMonth");
  const thExpenses = document.createElement("th");
  thExpenses.setAttribute("class", "fw-light");
  const spanExpenses = document.createElement("span");
  spanExpenses.innerText = expenses.category;
  spanExpenses.setAttribute("class", "bg-success px-lg-3 py-1");
  const thDebt = document.createElement("th");
  thDebt.innerText = expenses.total;
  thDebt.setAttribute("class", "fw-bold text-danger");

  thCategory.appendChild(spanProfit);
  profitMonth.appendChild(thCategory);
  profitMonth.appendChild(thCredit);

  thExpenses.appendChild(spanExpenses);
  expensesMonth.appendChild(thExpenses);
  expensesMonth.appendChild(thDebt);
};

const initReport = () => {
  categoryReport();
  dateReport();
};

initReport();
