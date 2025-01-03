// Sample array of people
const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 17 },
  { name: "Charlie", age: 19 },
  { name: "Diana", age: 16 },
];

// Array to store adults
const adults = [];

// For loop to filter adults
for (let i = 0; i < people.length; i++) {
  if (people[i].age > 18) {
    adults.push(people[i]);
  }
}

console.log(adults);
// Output: [{ name: "Alice", age: 25 }, { name: "Charlie", age: 19 }]
