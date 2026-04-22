// Module 33b: Hoisting - Guided Practice (Complete Version)
// JavaScript Hoisting Detective


// -------------------------------------------------------
// SECTION 1: Predict the Output
// -------------------------------------------------------

// Prediction 1: undefined, then "blue"
// Explanation: var color is hoisted (declared but not assigned),
// so the first log prints undefined. After assignment, it prints "blue".
console.log(color);     // undefined
var color = "blue";
console.log(color);     // "blue"


// Prediction 2: undefined, then "Hi there!"
// Explanation: var message is hoisted inside the function scope.
// The first log is undefined because the assignment has not run yet.
function sayHello() {
  console.log(message);       // undefined
  var message = "Hi there!";
  console.log(message);       // "Hi there!"
}
sayHello();


// Prediction 3: 15
// Explanation: Both var declarations are assigned before addUp is called.
// The function only reads them at call time, so it sees the correct values.
var firstNumber = 5;
var secondNumber = 10;

function addUp() {
  console.log(firstNumber + secondNumber); // 15
}

addUp();


// -------------------------------------------------------
// SECTION 2: Fix the Broken Code
// -------------------------------------------------------

// Fix 1: Move the function expression ABOVE the call that uses it.
// A function expression is not hoisted like a declaration.
// The var is hoisted but holds undefined until the assignment runs.

var calculateTotal = function(price, taxRate) {
  return price + (price * taxRate / 100);
};

var total = calculateTotal(50, 8.5);
console.log("Total:", total); // Total: 54.25


// Fix 2: Declare and assign the variable BEFORE using it.
// var hoisting gives us undefined, not the actual value.

var username = "Dana";
console.log("Welcome, " + username + "!"); // Welcome, Dana!


// Fix 3: Declare the variable BEFORE using it.
// let is in the Temporal Dead Zone until the declaration line,
// so accessing it before that line always throws a ReferenceError.

let finalScore = 95;
console.log("Your score is: " + finalScore); // Your score is: 95


// -------------------------------------------------------
// SECTION 3: var vs let Comparison
// -------------------------------------------------------

// Version using var - logs undefined before assignment
console.log("var version:", languageVar); // undefined - no error, just undefined
var languageVar = "JavaScript";
console.log("var version:", languageVar); // "JavaScript"

// Version using let - throws ReferenceError before assignment
try {
  console.log("let version:", languageLet); // ReferenceError
} catch (error) {
  console.log("let version caught an error:", error.message);
  // Output: Cannot access 'languageLet' before initialization
}

let languageLet = "JavaScript";
console.log("let version:", languageLet); // "JavaScript"


// -------------------------------------------------------
// SECTION 4: Declaration vs Expression
// -------------------------------------------------------

// Calling a function DECLARATION before its definition - this works
greetPerson("Maria"); // Hello, Maria!

function greetPerson(name) {
  console.log("Hello, " + name + "!");
}

greetPerson("James"); // Hello, James!


// Calling a function EXPRESSION before its definition - this throws an error
try {
  farewellPerson("Maria"); // TypeError: farewellPerson is not a function
} catch (error) {
  console.log("farewellPerson error:", error.message);
  // Output: farewellPerson is not a function
  // Reason: var farewellPerson is hoisted as undefined, not as a function
}

var farewellPerson = function(name) {
  console.log("Goodbye, " + name + "!");
};

farewellPerson("James"); // Goodbye, James!


// -------------------------------------------------------
// SECTION 5: Best Practices Refactor
// -------------------------------------------------------

// Declare all variables first, before using them
var itemName = "Laptop";
var itemPrice = 999;
var startMessage = "Processing your order...";

// Log the start message after it is defined
console.log(startMessage); // Processing your order...

// Define the function before calling it
function processOrder(name, price) {
  var taxRate = 0.08;
  var taxAmount = price * taxRate;
  console.log("Item: " + name);
  console.log("Price: $" + price);
  console.log("Tax: $" + taxAmount);
  console.log("Total: $" + (price + taxAmount));
}

// Call the function after everything is declared and defined
processOrder(itemName, itemPrice);
// Item: Laptop
// Price: $999
// Tax: $79.92
// Total: $1078.92
