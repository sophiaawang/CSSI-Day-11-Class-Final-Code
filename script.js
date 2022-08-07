// Helper function - gets a random integer up to (but not including) the maximum
const getRandomInteger = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

// Select the spans & divs where we'll display outputs.
const scoreSpan = document.querySelector("#score");
const pointsSpan = document.querySelector("#points");
const questionDiv = document.querySelector("#question");

const pointCard = document.querySelector('#points')
const questionCard = document.querySelector('#q')
const emptyCard = document.querySelector('#blank')
const category = document.querySelector('#category')


let currentQuestionLive = true;
// Select the buttons and input fields where users can provide inputs.
const randomButton = document.querySelector("#random");
const hardButton = document.querySelector("#hard");
const categoryButton = document.querySelector("#categoryChoice");
const answerInputBox = document.querySelector("#userAnswer");
const submitButton = document.querySelector("#submit");
const submitCategoryButton = document.querySelector("#submitCategory");

// Starting variables - we'll eventually replace these with API responses.
let currentScore = 0;
let currentPoints = 300;
let currentQuestion =
  "The Japanese name for this grass-type pokemon, Fushigidane, is a pun on the phrase 'strange seed.'";
let currentAnswer = "bulbasaur";

// This function updates the text on the board to display:
// 1) The player's current score
// 2) The points for the current question
// 3) The text of the current question
const updateBoard = () => {
  scoreSpan.innerHTML = currentScore;
  pointsSpan.innerHTML = currentPoints;
  //  Update the question too.
  questionDiv.innerHTML = currentQuestion;

};

// Call the updateBoard() function to fill the board.
updateBoard();
// Finish this function to checks the user's answer.
const checkAnswer = () => {
  console.log('checking answer');
  let playerAnswer = answerInputBox.value;
  console.log("You guessed:", playerAnswer);
  console.log("Correct answer:", currentAnswer);
  // Compare the player's answer with the correct answer.
  //       If it's correct, update the player's score according to the 
  //       value of the question. An incorrect answer results in the player
  //       losing the number of points for the question.
  if (currentQuestionLive === true) {
    if (playerAnswer.toLowerCase() === currentAnswer) {
      currentScore += currentPoints;
    }
    else {
      currentScore -= currentPoints;
    }
    currentQuestionLive = false;
  }
  updateBoard();
  answerInputBox.value = "";
  emptyCard.classList.remove("hidden");
  questionCard.classList.add("hidden");
};
// TODO: Attach checkAnswer() to the submit button via an event listener.

answerInputBox.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    checkAnswer();
  }
});
submitButton.addEventListener('click', checkAnswer);


// TODO: Create a getRandomQuestion() function to obtain a random question
//       from the Trivia Service API.
const getRandomQuestion = async () => {
  console.log('getting a random question');
  const response = await fetch('https://jeopardy.wang-lu.com/api/random');
  const data = await response.json();

  const randomQuestionObject = data[0];
  currentQuestion = randomQuestionObject.question;
  currentPoints = randomQuestionObject.value;
  currentAnswer = randomQuestionObject.answer;
  currentQuestionLive = true;
  updateBoard();
  emptyCard.classList.add("hidden");
  pointCard.classList.remove("hidden");
}
// TODO: Attach getRandomQuestion() to a click event listener for the Random button.
randomButton.addEventListener('click', getRandomQuestion);

// TODO: Create a gethardQuestion() function to obtain a question
//       from the Trivia Service API whose value is 1000.
//       Note that the clues endpoint always returns the same response.
//       So in order to get a new question, you'll need to use any random
//       index other than 0. 
//       Hint: Look at the JS code already written for you to help with this.

// TODO: Attach the getHardQuestion() function to a click event listener for the Hard button.
const getHardQuestion = async () => {
  const response = await fetch("https://jeopardy.wang-lu.com/api/clues?value=1000");
  const data = await response.json();
  const i = getRandomInteger(data.length);
  console.log(data[i]);
  currentQuestion = data[i].question;

  currentPoints = data[i].value;
  currentAnswer = data[i].answer.toLowerCase();
  updateBoard();
  currentQuestionLive = true;
  emptyCard.classList.add("hidden");
  pointCard.classList.remove("hidden");
};
hardButton.addEventListener("click", getHardQuestion);

// getCatQuestion()
const getNewCategory = async () => {
  pointCard.classList.add("hidden")
  category.classList.remove("hidden");

  let url = "https://jeopardy.wang-lu.com/api/clues?category="
  const categoryChoice = document.querySelector("#categoryChoice");
  let choice = categoryChoice.value;
  url += choice;

  const response = await fetch(url);
  const data = await response.json();
  const i = getRandomInteger(data.length);
  console.log(data[i]);
  currentQuestion = data[i].question;
  currentPoints = data[i].value;
  currentAnswer = data[i].answer;
  updateBoard();
};
categoryButton.addEventListener("click", getNewCategory);




pointCard.addEventListener('click', e => {
  questionCard.classList.remove("hidden");
  pointCard.classList.add("hidden");
});