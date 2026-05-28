# Number Guessing Game - Practice

## Overview

Build a command-line number guessing game that accepts arguments and saves game history to a file.

## What You'll Learn

- How to use `process.argv` to read command-line arguments
- How to validate user input
- How to use `fs.appendFile()` to write to files
- How to work with basic Node.js built-in modules

## Instructions

Complete the TODOs in `guess-game-start.js` step by step. Each step builds on the previous one.

### How to Run Your Game

```bash
node guess-game-start.js YourName YourGuess
```

**Example:**
```bash
node guess-game-start.js Alice 7
```

This will:
1. Use "Alice" as the player name
2. Use 7 as the guess
3. Generate a random number between 1-10
4. Check if the guess matches
5. Save the result to `game-history.txt`

## Step-by-Step Guide

### Step 1: Understanding process.argv

When you run: `node guess-game-start.js Alice 7`

The `process.argv` array contains:
- `args[0]` - Path to Node.js
- `args[1]` - Path to your script file
- `args[2]` - "Alice" (first argument you provided)
- `args[3]` - "7" (second argument you provided)

### Step 2-4: Getting and Validating Arguments

Extract the player name and guess from the arguments array. Make sure they exist before continuing.

### Step 5: Converting Strings to Numbers

Command-line arguments always come in as strings. You'll need to convert the guess to a number.

### Step 6: Generating Random Numbers

Use `Math.random()` to generate the secret number:
- `Math.random()` gives you a decimal between 0 and 0.999...
- Multiply by 10 to get 0 to 9.999...
- Use `Math.floor()` to round down
- Add 1 to get a range of 1 to 10

### Step 7: Comparing Values

Create an if-else statement to check if the guess matches the secret number.

### Step 8-10: Saving to a File

Use `fs.appendFile()` to add each game result to a file. This creates the file if it doesn't exist, or adds to it if it does.

## Testing Your Game

Try these different scenarios:

```bash
# Normal game
node guess-game-start.js Alice 5

# Missing arguments
node guess-game-start.js

# Invalid number
node guess-game-start.js Bob abc

# Play multiple times to build history
node guess-game-start.js Charlie 3
node guess-game-start.js Diana 8
node guess-game-start.js Eve 1
```

## Viewing Your Game History

After playing a few rounds, check your game history:

```bash
cat game-history.txt
```

## Expected Output

### When you win:
```
All arguments: [ '/path/to/node', '/path/to/guess-game-start.js', 'Alice', '7' ]

Congratulations Alice! You guessed it!
The secret number was 7

Your game result has been saved to game-history.txt
Thanks for playing! Run the game again to try your luck!
```

### When you lose:
```
All arguments: [ '/path/to/node', '/path/to/guess-game-start.js', 'Bob', '3' ]

Sorry Bob, that's not correct.
You guessed 3, but the secret number was 8
Try again!

Your game result has been saved to game-history.txt
Thanks for playing! Run the game again to try your luck!
```

## Bonus Challenges

Once you complete all the steps, try these enhancements:

1. Add validation to ensure the guess is between 1 and 10
2. Give hints like "Too high!" or "Too low!"
3. Add difficulty levels (easy: 1-10, medium: 1-50, hard: 1-100)
4. Create a function to read the game history and calculate win percentage
5. Allow multiple guesses in one game session

## Common Errors and Solutions

### Error: Cannot find module
**Problem:** You might see this if you try to require a module that doesn't exist.
**Solution:** Make sure you're only using built-in Node modules like `fs`.

### Error: File not created
**Problem:** The game-history.txt file isn't being created.
**Solution:** Check that your `fs.appendFile()` callback is handling errors correctly.

### Guess not working
**Problem:** The guess is always wrong even when it seems right.
**Solution:** Remember that `process.argv` values are strings. Convert to a number using `parseInt()`.

## Resources

- [Node.js fs module documentation](https://nodejs.org/api/fs.html)
- [Node.js process.argv documentation](https://nodejs.org/api/process.html#processargv)
- [Math.random() documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
