const scores = [95, 67, 88, 42, 76, 100, 54, 81];

// Step 1: Filter scores above 70
const filteredScores = scores.filter((score) => score > 70);

// Step 2: Map the filtered scores to objects with grades
const gradedScores = filteredScores.map((score) => {
  let grade;
  if (score >= 90) grade = "A";
  else if (score >= 80) grade = "B";
  else grade = "C";
  return { score, grade };
});

// Step 3: Reduce the array to calculate the average score
const averageScore =
  gradedScores.reduce((sum, obj) => sum + obj.score, 0) / gradedScores.length;

console.log("Filtered Scores:", filteredScores);
console.log("Graded Scores:", gradedScores);
console.log("Average Score:", averageScore.toFixed(2));
