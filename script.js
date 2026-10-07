// DOM Elements Selection
const balanceEl = document.getElementById('total-balance');
const incomeEl = document.getElementById('total-income');
const expenseEl = document.getElementById('total-expense');
const formEl = document.getElementById('transaction-form');
const nameInput = document.getElementById('name');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const transactionListEl = document.getElementById('transaction-list');
const emptyStateEl = document.getElementById('empty-state');
const errorMessageEl = document.getElementById('error-message');

// Load transactions from localStorage or initialize with empty array
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

/**
 * Save transactions array to browser localStorage
 */
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

/**
 * Format a number as currency string (e.g. ₹1,234.56)
 */
function formatCurrency(amount) {
  return '₹' + amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/**
 * Format date string to readable format (e.g. Oct 2, 2026)
 */
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

/**
 * Calculate totals for Balance, Income, and Expenses and update UI
 */
function updateDashboardSummary() {
  // Calculate total income
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  // Calculate total expenses
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  // Calculate overall balance
  const totalBalance = totalIncome - totalExpense;

  // Update DOM elements
  incomeEl.textContent = formatCurrency(totalIncome);
  expenseEl.textContent = formatCurrency(totalExpense);
  balanceEl.textContent = formatCurrency(totalBalance);
}

/**
 * Render transaction items into history table
 */
function renderTransactions() {
  // Clear existing table content
  transactionListEl.innerHTML = '';

  // Show empty state message if no transactions exist
  if (transactions.length === 0) {
    emptyStateEl.style.display = 'block';
    return;
  }

  emptyStateEl.style.display = 'none';

  // Loop through transactions and append table rows
  transactions.forEach(transaction => {
    const row = document.createElement('tr');

    const isIncome = transaction.type === 'income';
    const amountPrefix = isIncome ? '+' : '-';
    const amountClass = isIncome ? 'amount-income' : 'amount-expense';
    const badgeClass = isIncome ? 'badge-income' : 'badge-expense';

    row.innerHTML = `
      <td>${escapeHTML(transaction.name)}</td>
      <td class="${amountClass}">${amountPrefix}${formatCurrency(transaction.amount)}</td>
      <td><span class="badge ${badgeClass}">${transaction.type}</span></td>
      <td>${formatDate(transaction.date)}</td>
    `;

    transactionListEl.appendChild(row);
  });
}

/**
 * Helper function to escape HTML special characters to prevent XSS
 */
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Show validation error message
 */
function showError(message) {
  errorMessageEl.textContent = message;
  errorMessageEl.classList.remove('hidden');
}

/**
 * Hide validation error message
 */
function hideError() {
  errorMessageEl.textContent = '';
  errorMessageEl.classList.add('hidden');
}

/**
 * Form Submit Event Listener to Add New Transaction
 */
formEl.addEventListener('submit', function (e) {
  e.preventDefault();
  hideError();

  // Extract input values
  const nameValue = nameInput.value.trim();
  const amountValue = parseFloat(amountInput.value);
  const typeValue = typeInput.value;

  // Validation Checks
  if (!nameValue) {
    showError('Please enter a valid transaction name.');
    return;
  }

  if (isNaN(amountValue) || amountValue <= 0) {
    showError('Please enter a positive amount greater than zero.');
    return;
  }

  if (!typeValue) {
    showError('Please select a transaction type (Income or Expense).');
    return;
  }

  // Create new transaction object
  const newTransaction = {
    id: Date.now(),
    name: nameValue,
    amount: amountValue,
    type: typeValue,
    date: new Date().toISOString()
  };

  // Add new transaction to beginning of list
  transactions.unshift(newTransaction);

  // Update localStorage and refresh UI
  updateLocalStorage();
  updateDashboardSummary();
  renderTransactions();

  // Reset form inputs
  formEl.reset();
});

/**
 * Initial App Initialization
 */
function init() {
  updateDashboardSummary();
  renderTransactions();
}

// Run init when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
