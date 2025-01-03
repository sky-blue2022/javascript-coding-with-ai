const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const feedbackElement = document.getElementById("feedback");

// Quiz data
const quizData = {
  question: "What is the capital of France?",
  choices: ["Berlin", "Madrid", "Paris", "Rome"],
  correctChoice: 3, // Index of the correct choice (1-based)
};

// Load question and choices
function loadQuiz() {
  questionElement.textContent = quizData.question;

  const choiceButtons = document.querySelectorAll(".choice");
  choiceButtons.forEach((button, index) => {
    button.textContent = quizData.choices[index];
    button.onclick = () => handleAnswer(index + 1);
  });
}

// Handle user selection
function handleAnswer(choice) {
  if (choice === quizData.correctChoice) {
    feedbackElement.textContent = "Correct! 🎉";
    feedbackElement.style.color = "green";
  } else {
    feedbackElement.textContent = "Wrong answer. Try again!";
    feedbackElement.style.color = "red";
  }
}

// Initialize quiz
loadQuiz();
