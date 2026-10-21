# Expense Tracker

A lightweight, responsive Expense Tracker web application built using standard web technologies: semantic HTML, modern CSS, and Vanilla JavaScript. It helps users log their income and expenses, calculate totals automatically in Indian Rupees (₹), and persist data locally in the browser.

---

## 🛠️ Actual Technologies Used

* **HTML5**: Semantic elements (`<header>`, `<section>`, `<form>`, `<table>`, etc.) and native form controls.
* **CSS3**: 
  * CSS Variables (`:root`) for color palette and theme consistency.
  * CSS Grid (`repeat(auto-fit, minmax(...))`) for responsive dashboard cards.
  * CSS Flexbox and media queries for mobile-friendly layout and responsiveness.
* **Vanilla JavaScript (ES6+)**:
  * DOM querying and dynamic manipulation (`getElementById`, `createElement`, `appendChild`).
  * Event handling (`DOMContentLoaded`, form `submit`, `preventDefault`).
  * Array operations and higher-order functions (`filter`, `reduce`, `forEach`, `unshift`).
  * **Web Storage API (`localStorage`)**: Persists transactions locally across browser sessions using `JSON.stringify()` and `JSON.parse()`.
  * **Intl / Locale Formatting**: Formats currency amounts into Indian Rupees (`₹`) using `toLocaleString('en-IN')`.
  * Basic client-side validation and HTML entity escaping for XSS prevention.
* **External Dependencies**: None (0 external libraries or frameworks).

---

## ✨ Features (Current MVP)

1. **Dashboard Summary**
   * Displays **Total Balance**, **Total Income**, and **Total Expenses** formatted in INR (`₹`).
   * Automatically recalculates balances whenever transactions are added.

2. **Add Transaction Form**
   * Inputs for **Transaction Name**, **Amount (₹)**, and **Type** (Income or Expense).
   * Client-side validation preventing empty fields, zero amounts, or negative numbers with clear error feedback.

3. **Transaction History**
   * Shows a table of all recorded entries with Name, Amount, Type badge (green for Income, red for Expense), and Date.
   * Displays an empty state message (*"No transactions added yet."*) when no records exist.

4. **Data Persistence**
   * Saves transaction history to browser `localStorage`.
   * Automatically reloads and displays saved transactions and calculations upon page refresh.

---

## 📁 Project Structure

```text
Expense_tracker/
├── index.html   # Semantic HTML markup and layout
├── style.css    # CSS variables, grid, responsive styles
├── script.js    # Application logic, state management, and localStorage
└── README.md    # Project documentation
```

---

## 🚀 Getting Started

No build tools, package managers, or local servers are required.

1. Clone or download the repository:
   ```bash
   git clone https://github.com/surendra952/Expense-Tracker-.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Expense-Tracker-
   ```
3. Open `index.html` directly in any modern web browser (Chrome, Firefox, Edge, Safari):
   * Double-click `index.html`, or
   * Right-click and choose **Open with > Browser**, or
   * Use an extension like VS Code Live Server if preferred.
