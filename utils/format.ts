export {};
// Utility functions for formatting

/**
 * Format an integer budget into USD currency string
 * e.g. 10000000 -> "$10,000,000"
 */
function formatBudget(amount) {
  if (typeof amount !== 'number') {
    return amount;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

module.exports = {
  formatBudget,
};