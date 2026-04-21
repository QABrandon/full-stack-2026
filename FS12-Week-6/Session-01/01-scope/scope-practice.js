// Scope - Guided Practice
// Scope Map Challenge
//
// Instructions: Work through each section.
// Predict output BEFORE running, then run to check.


// -------------------------------------------------------
// SECTION 1: Predict the Output
// Write your prediction in the comment before running each block.
// -------------------------------------------------------

// Predict 1:
// Your prediction:  "Toronto" will show in the console
var city = "Toronto";

function printCity() {
  console.log(city);
}

printCity();


// Predict 2:
// Your prediction: ___________________
function makeGreeting() {
  var greeting = "Good morning!";
  console.log(greeting);
}

makeGreeting();
// console.log(greeting); // What happens if you uncomment this?


// Predict 3:
// Your prediction: ___________________
var status = "active";

function checkStatus() {
  var status = "pending";
  console.log("Inside function:", status);
}

checkStatus();
console.log("Outside function:", status);


// Predict 4:
// Your prediction: ___________________
if (true) {
  var declaredWithVar = "var value";
  let declaredWithLet = "let value";
}

console.log(declaredWithVar);
// console.log(declaredWithLet); // What happens if you uncomment this?


// Predict 5:
// Your prediction: ___________________
for (var i = 0; i < 3; i++) {
  // just counting
}
console.log("i after loop:", i);


// -------------------------------------------------------
// SECTION 2: Fix the Scope Bugs
// Each function below has a scope-related bug.
// Read the comment describing what it SHOULD do, then fix it.
// -------------------------------------------------------

// Bug 1: This should print the discount amount, but it throws a ReferenceError.
// The problem is that 'discountAmount' is declared inside the if block
// but used outside it. Fix it so discountAmount is accessible after the block.

function applyDiscount(price) {
  if (price > 100) {
    let discountAmount = price * 0.1;
  }
  console.log("Discount: $" + discountAmount); // ReferenceError
}

applyDiscount(150);


// Bug 2: This should log the loop index at each step.
// The var declaration leaks out and causes unexpected behavior.
// Fix it by using the right declaration keyword inside the loop.

function countUp() {
  for (var step = 1; step <= 3; step++) {
    console.log("Step: " + step);
  }
  // After the loop, 'step' should not exist here
  console.log("step after loop:", step); // this line should not run without error
}

countUp();


// Bug 3: This function tries to update the global score,
// but accidentally creates a new local variable instead.
// Fix it so the function actually updates globalHighScore.

var globalHighScore = 0;

function updateHighScore(newScore) {
  if (newScore > globalHighScore) {
    var globalHighScore = newScore; // bug: this creates a local variable, not updating the global
  }
}

updateHighScore(500);
console.log("High score:", globalHighScore); // Should print 500, not 0


// -------------------------------------------------------
// SECTION 3: Write Two Non-Interfering Functions
// Both functions should have a local variable named 'result'.
// Prove they do not interfere with each other.
// -------------------------------------------------------

// TODO: Write a function called 'doubleNumber' that:
// - Takes a number parameter
// - Declares a local variable called 'result' set to number * 2
// - Returns result
// Your function here:


// TODO: Write a function called 'squareNumber' that:
// - Takes a number parameter
// - Declares a local variable called 'result' set to number * number
// - Returns result
// Your function here:


// TODO: Call both functions and log the outputs
// Both should work correctly even though both have a variable called 'result'
// Your calls here:


// -------------------------------------------------------
// SECTION 4: Trace the Scope Chain
// Read the code below. At each marked point (A, B, C),
// list which variables are visible from that location.
// Write your answers in the comments.
// -------------------------------------------------------

var appVersion = "2.0"; // global

function loadUser(userId) {
  var userData = { id: userId, name: "Alex" }; // function scope

  if (userData.id > 0) {
    let isValid = true; // block scope

    // POINT A - inside the if block
    // Which variables are visible here?
    // Your answer: ___________________
    console.log("Point A reached");
  }

  // POINT B - inside the function, outside the if block
  // Which variables are visible here?
  // Your answer: ___________________
  console.log("Point B reached");
}

loadUser(5);

// POINT C - outside the function
// Which variables are visible here?
// Your answer: ___________________
console.log("Point C reached");


// -------------------------------------------------------
// SECTION 5: Fix the var Loop Bug Using let
// The code below uses var in a loop, which causes a bug.
// Rewrite it using let. Then explain in the comment what changed.
// -------------------------------------------------------

// Original (using var - buggy):
function originalLoop() {
  for (var number = 1; number <= 5; number++) {
    console.log("Number: " + number);
  }
  console.log("number leaks out:", number); // var leaks - this runs without error
}

originalLoop();

// TODO: Write a fixed version called 'fixedLoop' using let.
// After the loop, number should NOT be accessible.
// Your fixed function here:


// After writing fixedLoop, explain in this comment:
// What is different about using let vs var in this loop?
// Your explanation: ___________________
