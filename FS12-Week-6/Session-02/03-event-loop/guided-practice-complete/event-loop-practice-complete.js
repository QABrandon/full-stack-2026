// Module 33e: Event Loop and Call Stack - Guided Practice (Complete Version)
// Stack Tracer


// -------------------------------------------------------
// SECTION 1: Predict the Output Order - Answers
// -------------------------------------------------------

// Snippet A output order: 1, 3, 2
// Reason: console.log("1") and console.log("3") are synchronous - they run immediately.
// The setTimeout callback for "2" goes to the queue and only runs after the stack empties.
console.log("1");
setTimeout(function() { console.log("2"); }, 0);
console.log("3");


// Snippet B output order: third, second, first
// Reason: "third" is synchronous - runs immediately.
// "second" (500ms) fires before "first" (1000ms) because its timer is shorter.
// Both were placed in the queue - shorter timer fires first.
setTimeout(function() { console.log("first"); }, 1000);
setTimeout(function() { console.log("second"); }, 500);
console.log("third");


// Snippet C output order: start, middle, end, timeout one, timeout two
// Reason: All synchronous logs run first (start, middle, end).
// Both setTimeouts go through the queue.
// After the stack empties, the event loop runs them in the order they were queued.
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
// SECTION 2: Read the Stack Trace - Answers
// -------------------------------------------------------

function fetchData() {
  parseResponse();
}

function parseResponse() {
  processItem();
}

function processItem() {
  throw new Error("Invalid item format");
}

// Stack trace output when fetchData() is called:
// Error: Invalid item format
//   at processItem    <-- TOP: where the crash happened
//   at parseResponse
//   at fetchData      <-- BOTTOM: where execution started

// Answers:
// 1. Top of the stack trace: processItem
// 2. Bottom of the stack trace: fetchData
// 3. Function that caused the crash: processItem
// 4. Order functions were called: fetchData -> parseResponse -> processItem


// -------------------------------------------------------
// SECTION 3: Debugger Walkthrough - Expected Observations
// -------------------------------------------------------

function getDiscountedPrice(originalPrice, discountPercent) {
  var discountAmount = calculateDiscount(originalPrice, discountPercent);
  var finalPrice = originalPrice - discountAmount;
  return finalPrice;
}

function calculateDiscount(price, percent) {
  return price * (percent / 100);
}

var salePrice = getDiscountedPrice(80, 25);
console.log("Sale price:", salePrice); // 60

// Expected observations from the debugger:
//
// Call stack when paused at the breakpoint inside getDiscountedPrice:
//   getDiscountedPrice (top)
//   (anonymous / global)
//
// Call stack after stepping INTO calculateDiscount:
//   calculateDiscount (top)
//   getDiscountedPrice
//   (anonymous / global)
//
// Values of price and percent in the Scope panel while inside calculateDiscount:
//   price: 80
//   percent: 25
//
// The Scope panel also shows localPrice and discountPercent in the outer frame
// when you look at getDiscountedPrice's scope.
