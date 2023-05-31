let $blocks = $('.block-card');

$('.filter-btn').on('click', e => {
  let $btn = $(e.target).addClass('active');
  $btn.siblings().removeClass('active');
  
  let selector = $btn.data('target');
  $blocks.removeClass('active').filter(selector).addClass('active');
});


totalIncome= calculateCategory('income');
newIncomeForm = document.getElementById("newIncomeForm");
newIncomeForm.addEventListener("submit", IncomeEvent );
p = document.getElementById("incomeValue");
p.append(totalIncome);

totalExpense= calculateCategory('expense');
newExpenseForm = document.getElementById("newExpenseForm");
newExpenseForm.addEventListener("submit", ExpenseEvent );
p = document.getElementById("expenseValue");
p.append(totalExpense);

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

//Function to add income
function Categories(category) {
    if (getStorageItem(category + 'Categories'))
      return getStorageItem(category + 'Categories');
    return [];
  }

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
    //location.reload()
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