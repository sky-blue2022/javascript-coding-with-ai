// Initialize the array of numbers
let numbers = [3, 10, 5, 20, 7, 8, 15, 12];

// Initialize variables for the sum and index
let sum = 0;
let index = 0;

// Use a while loop to process the array
while (index < numbers.length) {
  let number = numbers[index];

  // Check if the number is even
  if (number % 2 === 0) {
    sum += number; // Add even number to the sum

    // Stop processing if the sum exceeds 50
    if (sum > 50) {
      console.log("Sum exceeds 50. Stopping loop.");
      break;
    }
  }

  index++; // Move to the next element
}

// Output the final sum
console.log("Final Sum:", sum);
