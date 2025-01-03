function createArrayProcessor(operation, condition) {
    return function (array) {
      return array
        .filter(condition) // Filter the elements based on the condition
        .map(operation);   // Apply the operation to the filtered elements
    };
  }
  // Example usage:
  const doubleIfGreaterThan5 = createArrayProcessor(
    (num) => num * 2,           // Operation: double the number
    (num) => num > 5            // Condition: number must be greater than 5
  );
  const inputArray = [3, 6, 8, 1, 10];
  const result = doubleIfGreaterThan5(inputArray);
  console.log(result); // Output: [12, 16, 20]
  