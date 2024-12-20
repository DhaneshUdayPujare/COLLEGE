let budget = 0;
        let totalExpenses = 0;

        // Function to set the budget
        function setBudget() {
            const budgetInput = document.getElementById('budget').value;
            if (budgetInput && budgetInput > 0) {
                budget = parseFloat(budgetInput);
                totalExpenses = 0; // Reset total expenses
                document.getElementById('remainingBudget').textContent = budget;
                document.getElementById('totalExpenses').textContent = totalExpenses;
                alert('Budget set successfully!');
            } else {
                alert('Please enter a valid budget!');
            }
        }

        // Function to add an expense
        function addExpense() {
            const description = document.getElementById('expenseDescription').value;
            const amount = parseFloat(document.getElementById('expenseAmount').value);
            const category = document.getElementById('expenseCategory').value;

            if (description && !isNaN(amount) && amount !== 0) {
                const newTotalExpenses = totalExpenses + amount;

                // Check if the new total expenses exceed the budget
                if (newTotalExpenses > budget) {
                    alert('Your budget has been exceeded! You cannot add this expense.');
                } else {
                    totalExpenses += amount;
                    const remainingBudget = budget - totalExpenses;

                    // Update the Total Expenses and Remaining Budget
                    document.getElementById('totalExpenses').textContent = totalExpenses;
                    document.getElementById('remainingBudget').textContent = remainingBudget;

                    // Add the expense to the table
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${description}</td>
                        <td>${amount}</td>
                        <td>${category}</td>
                        <td><button onclick="deleteExpense(this, ${amount})">Delete</button></td>
                    `;
                    document.getElementById('expenseTable').querySelector('tbody').appendChild(row);

                    // Clear input fields
                    document.getElementById('expenseDescription').value = '';
                    document.getElementById('expenseAmount').value = '';
                }
            } else {
                alert('Please enter valid expense details.');
            }
        }

        // Function to delete an expense and update the total balance
        function deleteExpense(button, amount) {
            button.closest('tr').remove();
            totalExpenses -= amount;
            const remainingBudget = budget - totalExpenses;

            // Update the Total Expenses and Remaining Budget
            document.getElementById('totalExpenses').textContent = totalExpenses;
            document.getElementById('remainingBudget').textContent = remainingBudget;
        }
        function loadExpensesFromJSON() {
            fetch('expenses-data.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to load expense data.');
                    }
                    return response.json();
                })
                .then(data => {
                    const expenseTable = document.getElementById('expenseTable').querySelector('tbody');
                    data.forEach(expense => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${expense.description}</td>
                            <td>${expense.amount}</td>
                            <td>${expense.category}</td>
                            <td><button onclick="deleteExpense(this, ${expense.amount})">Delete</button></td>
                        `;
                        expenseTable.appendChild(row);
                    });
                })
                .catch(error => {
                    console.error('Error loading expense data:', error);
                });
        }
        
        // Call this function on page load to populate the table
        window.onload = loadExpensesFromJSON;
        