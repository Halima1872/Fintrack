//Nav Bar
let $blocks = $('.block-card');

$('.filter-btn').on('click', e => {
  let $btn = $(e.target).addClass('active');
  $btn.siblings().removeClass('active');
  
  let selector = $btn.data('target');
  $blocks.removeClass('active').filter(selector).addClass('active');
});



//Necessary Functions
//Function to calculate the total of the category i.e income to be displayed
function calculateCategory(category) {
    if(getStorageItem(category + 'Categories')){
        const categories = getStorageItem(category + 'Categories');
        //This returns the total of the category i.e income to be displayed, acc is used as the accumulator
        return categories.reduce((acc, curr) => (acc += parseInt(curr[category])), 0);
}else{
    return
}
}
//Function to set key,value in localStorage
function setStorageItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
//Function to get key,value from localStorage
function getStorageItem(item) {
    const localStorageItem = localStorage.getItem(item);
    if (localStorageItem !== null) {
        return JSON.parse(localStorageItem);
    }else{
        return undefined;
    }
}
//Function to get categories from localStorage
function Categories(category) {
    if (getStorageItem(category + 'Categories'))
      return getStorageItem(category + 'Categories');
    return [];
  }

//Income Page
totalIncome= calculateCategory('income');
localStorage.setItem('totalIncome', totalIncome);
newIncomeForm = document.getElementById("newIncomeForm");
newIncomeForm.addEventListener("submit", IncomeEvent );
p = document.getElementById("incomeValue");
p.append(totalIncome);

//Function to add income
  function addIncome(newIncome, source) {
    const income = getStorageItem('incomeCategories');
    const newIncomeObj = {
        income: newIncome,
        source: source
    };
    if (income !== undefined) {
        income.push(newIncomeObj);
        setStorageItem('incomeCategories', income);
    }else{
        setStorageItem('incomeCategories', [newIncomeObj]);
        
    }
    location.reload()
}

//Function to make donut chart for income
function addIncomeChart(){
    const labels = []
    const data = []
    const tableBody = document.getElementById("Incometablebody");
    const incomeCategories = Categories('income')
    const incomeChart = document.getElementById("incomeChart").getContext('2d')
  
    incomeCategories.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<tr><td>-${item.source}</td><td>${item.income}</td></tr>`;
        tableBody.insertAdjacentElement('beforeend',tr)
        labels.push(item.source)
        data.push(item.income)
    });
    const chartData = {
        labels : labels,
        datasets:[
            {
                data: data,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(1, 142, 203)',
                    'rgb(106, 144, 204)',
                    'rgb(1, 142, 203)',
                    'rgb(102, 55, 221)',
                  ],
            }
        ]
    }
    const config = {
        type: 'doughnut',
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Income Sources',
            },
          },
        },
      };
      
    const chart1 = new Chart(incomeChart,config)
}

function IncomeEvent(e){
    e.preventDefault();
    alert("Form submitted!");
    const IncomeSourceInput = document.getElementById('IncomeSourceInput').value;
    const newIncomeSourceInput = document.getElementById('newIncomeSourceInput').value;
    const IncomeAmount = document.getElementById('incomeAmount').value;

    const Source = newIncomeSourceInput || IncomeSourceInput;
    if (IncomeAmount !== '') {
        addIncome(IncomeAmount, Source);
}

}
addIncomeChart()

//Budget Page
const budgetInput = document.getElementById("budget-input");
budgetInput.max = parseFloat(localStorage.getItem('totalIncome'));
const expensesInput = document.getElementById("expenseAmount");
expensesInput.max = parseFloat(localStorage.getItem('budget'));
const budgetForm = document.getElementById("budget-form-element");
const budgetMessage = document.getElementById("budget-message");
const budgetInfo = document.getElementById("budget-info");
const editBudgetButton = document.getElementById("edit-budget");

budgetForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const budgetInput = document.getElementById("budget-input");
    const budget = budgetInput.value;
    // Save the budget to localStorage
    localStorage.setItem("budget", budget);
    // Hide the budget form
    budgetForm.style.display = "none";
    budgetMessage.style.display = "block";
    budgetInfo.textContent = "Budget has been set to: ₹" + budget;
  });

editBudgetButton.addEventListener("click", function() {
    // Hide the budget message
    budgetMessage.style.display = "none";
    budgetForm.style.display = "block";
  });

  // Check if budget is already set in localStorage
const storedBudget = localStorage.getItem("budget");
if (storedBudget) {
    // Hide the budget form
    budgetForm.style.display = "none";
    budgetMessage.style.display = "block";
    budgetInfo.textContent = "Budget has been set to: ₹" + storedBudget;
}

//Expense Page
totalExpense= calculateCategory('expense');
localStorage.setItem('totalExpense', totalExpense);
newExpenseForm = document.getElementById("newExpenseForm");
newExpenseForm.addEventListener("submit", ExpenseEvent );
p = document.getElementById("expenseValue");
p.append(totalExpense);

function addExpense(newExpense, source,date) {
  const expense = getStorageItem('expenseCategories');
  const newExpenseObj = {
      expense: newExpense,
      source: source,
      date: date
  };
  if (expense !== undefined) {
      expense.push(newExpenseObj);
      setStorageItem('expenseCategories', expense);
  }else{
      setStorageItem('expenseCategories', [newExpenseObj]);
  }
  location.reload()
}

//Function to make donut chart for expense
function addExpenseChart(){
  const labels = []
  const data = []
  const tableBody = document.getElementById("Expensetablebody");
  const expenseCategories = Categories('expense')
  const expenseChart = document.getElementById("expenseChart").getContext('2d')

  expenseCategories.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<tr><td>-${item.source}</td><td>${item.expense}</td><td>${item.date}</td></tr>`;
      tableBody.insertAdjacentElement('beforeend',tr)
      labels.push(item.source)
      data.push(item.expense)
  });
  const chartData = {
      labels : labels,
      datasets:[
          {
              data: data,
              backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(1, 142, 203)',
                  'rgb(106, 144, 204)',
                  'rgb(1, 142, 203)',
                  'rgb(102, 55, 221)',
                ],
          }
      ]
  }
  const config = {
      type: 'doughnut',
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Expense Sources',
          },
        },
      },
    };
    
  const chart1 = new Chart(expenseChart,config)
}

function ExpenseEvent(e){
  e.preventDefault();
  alert("Form submitted!");
  const newExpenseSourceInput = document.getElementById('newExpenseSourceInput').value;
  const ExpenseAmount = document.getElementById('expenseAmount').value;
  const ExpenseDate = document.getElementById('expenseDate').value;
  
  if (ExpenseAmount !== '') {
      addExpense(ExpenseAmount, newExpenseSourceInput, ExpenseDate);
  }
}

addExpenseChart()

//Finiancial Summary Page
incomep= document.getElementById("incomeValuep");
incomep.append(localStorage.getItem('totalIncome'));
budgetp = document.getElementById("budgetValue");
budgetp.append(localStorage.getItem('budget'));
expensep = document.getElementById("expenseValuep");
expensep.append(localStorage.getItem('totalExpense'));

function addSummaryChart(){
const summaryChart = document.getElementById("SummaryChart").getContext('2d')
const Savings = parseFloat(localStorage.getItem('totalIncome')) - parseFloat(localStorage.getItem('totalExpense'));
const labels = ["TotalIncome","Budget","TotalExpense","Savings"];
const data = {
  labels: labels,
  datasets: [{
    label: 'Financial Summary',
    data: [parseFloat(localStorage.getItem('totalIncome')), parseFloat(localStorage.getItem('budget')),parseFloat(localStorage.getItem('totalExpense')),Savings],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
    ],
    borderWidth: 1
  }]
};

const config = {
  type: 'bar',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },
};
const chart1 = new Chart(summaryChart,config)
}

addSummaryChart()