// Module 33b: Hoisting - Guided Practice
// JavaScript Hoisting Detective
//
// Instructions: Work through each section below.
// Predict the output BEFORE running the code, then run it to check.

// -------------------------------------------------------
// SECTION 1: Predict the Output
// Read each block and write your prediction in the comment
// before running the code. Then run it and compare.
// -------------------------------------------------------

// Prediction 1:
// What will this print?
// Your prediction: undefined /n blue
console.log(color);
var color = "blue";
console.log(color);

// Prediction 2:
// What will this print?
// Your prediction: ___________________
function sayHello() {
  console.log(message);
  var message = "Hi there!";
  console.log(message);
}
sayHello();

// Prediction 3:
// What will this print?
// Your prediction: ___________________
var firstNumber = 5;
var secondNumber = 10;

function addUp() {
  console.log(firstNumber + secondNumber);
}

addUp();

// -------------------------------------------------------
// SECTION 2: Fix the Broken Code
// Each block below has a hoisting-related bug.
// Identify the problem and fix it.
// -------------------------------------------------------

// Bug 1: This code throws a TypeError. Fix it.
// Hint: What kind of function is being used here?

var total = calculateTotal(50, 8.5);
console.log("Total:", total);

var calculateTotal = function (price, taxRate) {
  return price + (price * taxRate) / 100;
};

// Bug 2: This code logs undefined instead of the user's name.
// Restructure the code so it logs the correct name.

console.log("Welcome, " + username + "!");
var username = "Dana";

// Bug 3: This code throws a ReferenceError. Fix it.
// Hint: Think about what type of variable declaration to use.

console.log("Your score is: " + finalScore);
let finalScore = 95;

// -------------------------------------------------------
// SECTION 3: var vs let Comparison
// Write the same logic twice - once with var and once with let.
// Observe how the behavior differs BEFORE the assignment line.
// -------------------------------------------------------

// TODO: Write a version using var
// Steps:
// 1. console.log the variable before declaring it
// 2. declare the variable with var and assign it the value "JavaScript"
// 3. console.log the variable after declaring it
// Your code here:

// TODO: Write the same using let
// Steps:
// 1. Try to console.log the variable before declaring it (wrap in try/catch)
// 2. declare the variable with let and assign it the value "JavaScript"
// 3. console.log the variable after declaring it
// Your code here:

// -------------------------------------------------------
// SECTION 4: Declaration vs Expression
// Write two versions of the same function.
// Test calling each before AND after its definition.
// -------------------------------------------------------

// TODO: Write a function DECLARATION called greetPerson
// that takes a name parameter and logs "Hello, [name]!"
// Then call it BEFORE and AFTER the declaration to see what happens.
// Your code here:

// TODO: Write a function EXPRESSION called farewellPerson
// assigned to a var, that takes a name parameter and logs "Goodbye, [name]!"
// Try calling it BEFORE the assignment (wrap in try/catch to avoid crashing).
// Then call it AFTER the assignment.
// Your code here:

// -------------------------------------------------------
// SECTION 5: Best Practices Refactor
// The code below works, but relies on hoisting in confusing ways.
// Refactor it so that all declarations come before their first use.
// -------------------------------------------------------

// Original code (do not delete - just rewrite it below)
/*
console.log(startMessage);
processOrder(itemName, itemPrice);
var itemName = "Laptop";
var itemPrice = 999;
var startMessage = "Processing your order...";

function processOrder(name, price) {
  var taxRate = 0.08;
  var taxAmount = price * taxRate;
  console.log("Item: " + name);
  console.log("Price: $" + price);
  console.log("Tax: $" + taxAmount);
  console.log("Total: $" + (price + taxAmount));
}
*/

// TODO: Refactor the code above here so nothing is used before it is declared:
