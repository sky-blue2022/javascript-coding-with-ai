// Input: Array of product objects
const products = [
  { name: "Product A", price: 100 },
  { name: "Product B", price: 45 },
  { name: "Product C", price: 70 },
  { name: "Product D", price: 30 },
];

// Arrow function to process the products
const processProducts = (products) =>
  products
    .filter((product) => product.price >= 50) // Filter products with price >= 50
    .map((product) => ({
      name: product.name,
      discountedPrice: (product.price * 0.9).toFixed(2), // Apply 10% discount
    }))
    .sort((a, b) => a.discountedPrice - b.discountedPrice); // Sort by discounted price

// Using the function and displaying the result
const result = processProducts(products);
console.log(result);
