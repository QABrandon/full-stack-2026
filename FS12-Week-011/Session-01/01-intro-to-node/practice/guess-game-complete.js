// Command-Line Number Guessing Game
// Learn how to use process.argv to accept command-line arguments

const fs = require("fs");

// Step 1: Get command-line arguments
const args = process.argv;

// Step 2: Display the arguments to understand what we're working with
console.log("All arguments:", args);
console.log(""); // Empty line for readability

// Step 3: Extract the player's name and guess from command-line arguments
const playerName = args[2];
const playerGuess = args[3];

// Step 4: Validate that we have the required arguments
if (!playerName || !playerGuess) {
  console.log("Oops! You need to provide your name and a guess.");
  console.log("Usage: node guess-game-complete.js <your-name> <your-guess>");
  console.log("Example: node guess-game-complete.js Alice 7");
  console.log("Guess a number between 1 and 10!");
  return;
}

// Step 5: Convert the guess to a number
const guessNumber = parseInt(playerGuess);

// Check if the guess is a valid number
if (isNaN(guessNumber)) {
  console.log("That's not a valid number! Please enter a number between 1 and 10.");
  return;
}

// Bonus validation: Check if guess is between 1 and 10
if (guessNumber < 1 || guessNumber > 10) {
  console.log("Please guess a number between 1 and 10!");
  return;
}

// Step 6: Generate a random secret number between 1 and 10
const secretNumber = Math.floor(Math.random() * 10) + 1;

// Step 7: Compare the guess to the secret number
let resultMessage = "";
let didWin = false;

if (guessNumber === secretNumber) {
  console.log(`Congratulations ${playerName}! You guessed it!`);
  console.log(`The secret number was ${secretNumber}`);
  resultMessage = "WON";
  didWin = true;
} else {
  console.log(`Sorry ${playerName}, that's not correct.`);
  console.log(`You guessed ${guessNumber}, but the secret number was ${secretNumber}`);
  console.log("Try again!");
  resultMessage = "LOST";
}

// Step 8: Create a result message to save
const gameResult = `Player: ${playerName} | Guess: ${guessNumber} | Secret: ${secretNumber} | Result: ${resultMessage}\n`;

// Step 9: Write the result to a file called game-history.txt
fs.appendFile("game-history.txt", gameResult, (err) => {
  // Step 10: Handle any errors when writing to the file
  if (err) {
    console.error("Error saving game result:", err.message);
    return;
  }
  console.log("");
  console.log("Your game result has been saved to game-history.txt");
});

// Show encouraging message
console.log("");
console.log("Thanks for playing! Run the game again to try your luck!");
