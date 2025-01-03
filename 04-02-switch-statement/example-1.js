function gradeMessage(grade) {
  switch (grade) {
    case "A":
      console.log("Excellent work! Keep it up.");
      break;
    case "B":
      console.log("Great job! Aim for an A next time.");
      break;
    case "C":
      console.log("Good effort. Consider revising key concepts.");
      break;
    case "D":
      console.log("You passed, but there's room for improvement.");
      break;
    case "F":
      console.log(
        "Failed. It's important to review the material and try again."
      );
      break;
    default:
      console.log("Invalid grade. Please enter A, B, C, D, or F.");
  }
}

// Test the function with different grades
gradeMessage("A"); // Expected: "Excellent work! Keep it up."
gradeMessage("F"); // Expected: "Failed. It's important to review the material and try again."
gradeMessage("Z"); // Expected: "Invalid grade. Please enter A, B, C, D, or F."
