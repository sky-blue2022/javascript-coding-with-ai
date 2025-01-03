const calculateInvoiceTotal = (items, applyDiscount = false) => {
  if (!Array.isArray(items) || items.length === 0) {
    return "No items to process.";
  }

  let total = items.reduce((sum, item) => {
    if (item.quantity && item.price) {
      return sum + item.quantity * item.price;
    } else {
      console.warn("Missing quantity or price in:", item);
      return sum;
    }
  }, 0);

  if (applyDiscount) {
    total *= 0.9; // Apply a 10% discount
  }

  return total.toFixed(2); // Return total formatted to 2 decimal places
};

// Example usage:
const invoiceItems = [
  { description: "Laptop", quantity: 1, price: 1200 },
  { description: "Mouse", quantity: 2, price: 25 },
  { description: "Keyboard", quantity: 1, price: 75 },
];

console.log(calculateInvoiceTotal(invoiceItems)); // Output: 1325.00
console.log(calculateInvoiceTotal(invoiceItems, true)); // Output: 1192.50
console.log(calculateInvoiceTotal([], true)); // Output: "No items to process."
