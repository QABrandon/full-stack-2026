// Command-Line Number Guessing Game
// Learn how to use process.argv to accept command-line arguments

const fs = require("fs");

// Step 1: Get command-line arguments
// When you run: node guess-game-start.js Alice 7
// Node creates an array called process.argv that contains:
// - process.argv[0] = path to Node.js
// - process.argv[1] = path to this file
// - process.argv[2] = "Alice"
// - process.argv[3] = "7"

// TODO: Store process.argv in a variable called args
// Example: const args = process.argv;


// Step 2: Display the arguments to understand what we're working with
// This helps you see what Node.js received from the command line

// TODO: Console log the args array to see what it contains
// Example: console.log("All arguments:", args);

// TODO: Add an empty line for readability
// Example: console.log("");


// Step 3: Extract the player's name and guess from command-line arguments
// We want to get the values the user typed (not the Node paths)

// TODO: Get the player's name from args[2] and store it in a variable called playerName
// Example: const playerName = args[?];

// TODO: Get the player's guess from args[3] and store it in a variable called playerGuess
// Example: const playerGuess = args[?];


// Step 4: Validate that we have the required arguments
// If the user forgets to provide a name or guess, we should help them

// TODO: Check if playerName and playerGuess exist
// Use an if statement to check: if (!playerName || !playerGuess)

// TODO: If either is missing, display these helpful messages:
// console.log("Oops! You need to provide your name and a guess.");
// console.log("Usage: node guess-game-start.js <your-name> <your-guess>");
// console.log("Example: node guess-game-start.js Alice 7");
// console.log("Guess a number between 1 and 10!");

// TODO: Exit the program if arguments are missing
// Use: return;


// Step 5: Convert the guess to a number
// Command-line arguments are always strings, but we need a number for comparison

// TODO: Convert playerGuess from a string to a number using parseInt()
// Example: const guessNumber = parseInt(playerGuess);

// TODO: Check if the conversion worked (check if it's not a number)
// Use isNaN() to check if the result is "Not a Number"
// If it is NaN, show this message and return:
// console.log("That's not a valid number! Please enter a number between 1 and 10.");

// BONUS TODO: Add validation to check if guess is between 1 and 10
// Check: if (guessNumber < 1 || guessNumber > 10)
// If true, show: console.log("Please guess a number between 1 and 10!");
// Then return to exit


// Step 6: Generate a random secret number between 1 and 10
// We need a random number for the player to guess

// TODO: Create a variable called secretNumber with a random number from 1 to 10
// Math.random() gives you 0 to 0.999
// Math.random() * 10 gives you 0 to 9.999
// Math.floor(Math.random() * 10) gives you 0 to 9
// Math.floor(Math.random() * 10) + 1 gives you 1 to 10
// Example: const secretNumber = Math.floor(Math.random() * 10) + 1;


// Step 7: Compare the guess to the secret number
// Check if the player guessed correctly

// TODO: Create a variable to store the result message
// Example: let resultMessage = "";

// TODO: Create an if statement to check if guessNumber equals secretNumber
// If they match:
//   - Show: console.log(`Congratulations ${playerName}! You guessed it!`);
//   - Show: console.log(`The secret number was ${secretNumber}`);
//   - Set resultMessage to "WON"

// TODO: Add an else block for when the guess is wrong
// If they don't match:
//   - Show: console.log(`Sorry ${playerName}, that's not correct.`);
//   - Show: console.log(`You guessed ${guessNumber}, but the secret number was ${secretNumber}`);
//   - Show: console.log("Try again!");
//   - Set resultMessage to "LOST"


// Step 8: Create a result message to save
// Build a string that contains all the game information

// TODO: Create a string variable called gameResult that includes:
// - The player's name
// - Their guess
// - The secret number
// - Whether they won or lost
// - A newline character at the end (\n)
// Example format: "Player: Alice | Guess: 7 | Secret: 5 | Result: LOST\n"
// Use template literals: `Player: ${playerName} | Guess: ${guessNumber} | Secret: ${secretNumber} | Result: ${resultMessage}\n`


// Step 9: Write the result to a file called game-history.txt
// Use fs.appendFile() to add this result to a file
// appendFile creates the file if it doesn't exist, or adds to it if it does

// TODO: Call fs.appendFile() with three parameters:
// 1. The filename: "game-history.txt"
// 2. The content to write: gameResult
// 3. A callback function to handle the result: (err) => { }

// Example structure:
// fs.appendFile("game-history.txt", gameResult, (err) => {
//   // Step 10 code goes here
// });


// Step 10: Handle any errors when writing to the file
// Inside the fs.appendFile callback, check if there was an error

// TODO: Check if err exists
// If err exists:
//   - Show: console.error("Error saving game result:", err.message);
//   - Exit the callback with: return;

// TODO: If no error, let the player know the result was saved
// Show: console.log("");
// Show: console.log("Your game result has been saved to game-history.txt");


// TODO: Add a final encouraging message (outside the fs.appendFile)
// Show: console.log("");
// Show: console.log("Thanks for playing! Run the game again to try your luck!");
