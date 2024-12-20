// Initialize budget and expenses
let totalBudget = 0;
let totalExpenses = 0;

// Function to set the budget
function setBudget() {
    const budgetInput = parseFloat(document.getElementById('budgetInput').value);
    if (isNaN(budgetInput) || budgetInput <= 0) {
        alert('Please enter a valid budget.');
        return;
    }
    totalBudget = budgetInput;
    updateRemainingBudget();
}

// Function to update the remaining budget
function updateRemainingBudget() {
    const remainingBudget = totalBudget - totalExpenses;
    document.getElementById('remainingBudget').innerText = remainingBudget.toFixed(2);
}

// Function to add an expense
function addExpense() {
    const description = document.getElementById('expenseDescription').value.trim();
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const category = document.getElementById('expenseCategory').value;

    if (!description || isNaN(amount) || amount <= 0) {
        alert('Please enter valid expense details.');
        return;
    }

    // Update totals
    totalExpenses += amount;
    document.getElementById('totalExpenses').innerText = totalExpenses.toFixed(2);

    // Add the expense to the table
    const expenseTable = document.getElementById('expenseTable').querySelector('tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${description}</td>
        <td>${amount.toFixed(2)}</td>
        <td>${category}</td>
        <td><button onclick="deleteExpense(this, ${amount})">Delete</button></td>
    `;
    expenseTable.appendChild(row);

    updateRemainingBudget();
}

// Function to delete an expense
function deleteExpense(button, amount) {
    button.parentElement.parentElement.remove();
    totalExpenses -= amount;
    document.getElementById('totalExpenses').innerText = totalExpenses.toFixed(2);
    updateRemainingBudget();
}

// Function to load expenses from a JSON file
function loadExpensesFromJSON() {
    fetch('expenses-data.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(expense => {
                addExpense(expense.description, parseFloat(expense.amount), expense.category);
            });
        })
        .catch(error => console.error('Error loading expenses:', error));
}
