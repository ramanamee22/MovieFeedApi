const { formatBudget } = require('../../utils/format');

describe('formatBudget', () => {
  test('formats integer to USD currency string', () => {
    expect(formatBudget(1000000)).toBe('$1,000,000');
    expect(formatBudget(0)).toBe('$0');
  });

  test('returns non-number values as is', () => {
    expect(formatBudget(null)).toBeNull();
    expect(formatBudget('abc')).toBe('abc');
  });
});