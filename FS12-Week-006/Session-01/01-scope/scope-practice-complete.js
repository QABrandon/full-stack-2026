// Module 33c: Scope - Guided Practice (Complete Version)
// Scope Map Challenge


// -------------------------------------------------------
// SECTION 1: Predict the Output
// -------------------------------------------------------

// Predict 1: "Toronto"
// Reason: city is global - the function can read it from anywhere
var city = "Toronto";

function printCity() {
  console.log(city); // "Toronto"
}

printCity();


// Predict 2: "Good morning!" then ReferenceError if uncommented
// Reason: greeting is function-scoped - it only exists inside makeGreeting
function makeGreeting() {
  var greeting = "Good morning!";
  console.log(greeting); // "Good morning!"
}

makeGreeting();
// console.log(greeting); // ReferenceError: greeting is not defined


// Predict 3: "Inside function: pending" then "Outside function: active"
// Reason: The function's status variable shadows the global one
// The global status is never changed
var status = "active";

function checkStatus() {
  var status = "pending"; // separate variable - shadows the outer one
  console.log("Inside function:", status); // "pending"
}

checkStatus();
console.log("Outside function:", status); // "active" - unchanged


// Predict 4: "var value" then ReferenceError for let
// Reason: var leaks out of the if block, let does not
if (true) {
  var declaredWithVar = "var value";
  let declaredWithLet = "let value";
}

console.log(declaredWithVar); // "var value" - var leaked out
// console.log(declaredWithLet); // ReferenceError: not defined


// Predict 5: "i after loop: 3"
// Reason: var i is not block-scoped, so it exists after the for loop ends
for (var i = 0; i < 3; i++) {
  // just counting
}
console.log("i after loop:", i); // 3


// -------------------------------------------------------
// SECTION 2: Fix the Scope Bugs
// -------------------------------------------------------

// Fix 1: Declare discountAmount outside (before) the if block
// so it is accessible after the block closes

function applyDiscount(price) {
  let discountAmount = 0; // declare here so it exists in function scope

  if (price > 100) {
    discountAmount = price * 0.1; // assign inside the block
  }

  console.log("Discount: $" + discountAmount); // works now
}

applyDiscount(150); // Discount: $15


// Fix 2: Change var to let inside the for loop
// let step will be block-scoped to the loop and not leak out

function countUp() {
  for (let step = 1; step <= 3; step++) {
    console.log("Step: " + step);
  }
  // 'step' no longer exists here - let kept it inside the loop
  // console.log("step after loop:", step); // ReferenceError if uncommented
}

countUp();


// Fix 3: Remove the var keyword inside the if block
// Using var inside a function creates a new local variable
// To update the global, just assign without declaring a new variable

var globalHighScore = 0;

function updateHighScore(newScore) {
  if (newScore > globalHighScore) {
    globalHighScore = newScore; // no var/let/const - this updates the global
  }
}

updateHighScore(500);
console.log("High score:", globalHighScore); // 500


// -------------------------------------------------------
// SECTION 3: Write Two Non-Interfering Functions
// -------------------------------------------------------

function doubleNumber(number) {
  var result = number * 2; // this result only exists inside doubleNumber
  return result;
}

function squareNumber(number) {
  var result = number * number; // this result only exists inside squareNumber
  return result;
}

console.log(doubleNumber(5));  // 10
console.log(squareNumber(5));  // 25
// Each function has its own separate 'result' - they do not interfere


// -------------------------------------------------------
// SECTION 4: Trace the Scope Chain
// -------------------------------------------------------

var appVersion = "2.0"; // global

function loadUser(userId) {
  var userData = { id: userId, name: "Alex" }; // function scope

  if (userData.id > 0) {
    let isValid = true; // block scope

    // POINT A: appVersion (global), userData (function), userId (function), isValid (block)
    console.log("Point A reached");
    console.log("Point A sees:", appVersion, userData, userId, isValid);
  }

  // POINT B: appVersion (global), userData (function), userId (function)
  // isValid is gone - it was block-scoped to the if statement
  console.log("Point B reached");
  console.log("Point B sees:", appVersion, userData, userId);
}

loadUser(5);

// POINT C: appVersion (global) only
// userData, userId, isValid are all gone - they were inside the function
console.log("Point C reached");
console.log("Point C sees:", appVersion);


// -------------------------------------------------------
// SECTION 5: Fix the var Loop Bug Using let
// -------------------------------------------------------

// Original with var (buggy - leaks out):
function originalLoop() {
  for (var number = 1; number <= 5; number++) {
    console.log("Number: " + number);
  }
  console.log("number leaks out:", number); // 6 - var leaked out of the loop
}

originalLoop();


// Fixed with let (correct - stays inside):
function fixedLoop() {
  for (let number = 1; number <= 5; number++) {
    console.log("Number: " + number);
  }
  // number no longer exists here
  // console.log("number after loop:", number); // ReferenceError if uncommented
}

fixedLoop();

// What changed:
// With var, the loop variable exists in the function scope and leaks out after the loop.
// With let, the loop variable is block-scoped to the for loop only.
// After the loop finishes, let 'number' is gone.
// This prevents accidental use of 'number' after the loop ends.
