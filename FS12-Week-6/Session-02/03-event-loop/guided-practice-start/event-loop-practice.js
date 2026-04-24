// Module 33e: Event Loop and Call Stack - Guided Practice
// Stack Tracer
//
// Work through each section. Predict first, then run to check.


// -------------------------------------------------------
// SECTION 1: Predict the Output Order
// Write the letters in the order you think they will print.
// Then run the code and compare.
// -------------------------------------------------------

// Snippet A:
// Your predicted order: ___________________
console.log("1");
setTimeout(function() { console.log("2"); }, 0);
console.log("3");


// Snippet B:
// Your predicted order: ___________________
setTimeout(function() { console.log("first"); }, 1000);
setTimeout(function() { console.log("second"); }, 500);
console.log("third");


// Snippet C:
// Your predicted order: ___________________
console.log("start");

setTimeout(function() {
  console.log("timeout one");
}, 0);

console.log("middle");

setTimeout(function() {
  console.log("timeout two");
}, 0);

console.log("end");


// -------------------------------------------------------
// SECTION 2: Read the Stack Trace
// Run this code, read the error in the console,
// then answer the questions in the comments below.
// -------------------------------------------------------

function fetchData() {
  parseResponse(); // calls parseResponse
}

function parseResponse() {
  processItem(); // calls processItem
}

function processItem() {
  throw new Error("Invalid item format"); // crash happens here
}

// Uncomment to run and see the stack trace:
// fetchData();

// After running, answer these in the comments:
// 1. Which function is at the TOP of the stack trace? ___________________
// 2. Which function is at the BOTTOM? ___________________
// 3. Which function caused the crash? ___________________
// 4. In what order were the functions called? ___________________


// -------------------------------------------------------
// SECTION 3: Debugger Walkthrough
// Open this file in a browser via index.html
// Set a breakpoint and step through using DevTools
// -------------------------------------------------------

// Load index.html in a browser.
// Open DevTools > Sources tab.
// Find this file in the file tree.

function getDiscountedPrice(originalPrice, discountPercent) {
  var discountAmount = calculateDiscount(originalPrice, discountPercent);
  var finalPrice = originalPrice - discountAmount;
  return finalPrice;
}

function calculateDiscount(price, percent) {
  return price * (percent / 100);
}

// TODO: Set a breakpoint on the line below in DevTools, then refresh
var salePrice = getDiscountedPrice(80, 25);
console.log("Sale price:", salePrice); // should be 60

// While paused at the breakpoint:
// - Look at the Call Stack panel. What function is listed?
// - Use Step Into (F11) to enter calculateDiscount. What is now on the stack?
// - Look at the Scope panel. What are the current values of price and percent?
// Write your observations here as comments:
// Call stack when paused: ___________________
// Call stack after stepping into: ___________________
// Values of price and percent: ___________________
