// National Parks Data Lab - Completed Reference
// U.S. National Park Service Data Analysis Practice
//
// This file shows one correct way to complete all 24 tasks.
// Your code does not have to look exactly like this.
// Focus on whether your output matches and your concepts are correct.
//
// display.js provides three functions:
//   showSection("title")           - adds a section header to the page
//   show("label", value)           - displays any value on the page
//   showTable("label", array)      - displays an array of objects as a table
//
// Loop tasks still use console.log() inside the loop body.
// All show() calls also log to the console automatically.

// ============================================================
// PART 1: ARRAYS
// ============================================================

showSection("Part 1: Arrays");


// ---- Task 1: Create an Array ----
// RUBRIC: Array Creation and Access

// An array is an ordered list. Each item has a numbered position called an index.
// The first item is always at index 0.
const parkNames = [
  "Yellowstone",
  "Yosemite",
  "Grand Canyon",
  "Zion",
  "Great Smoky Mountains",
  "Rocky Mountain",
  "Olympic",
  "Acadia"
];

show("Task 1: Parks Array", parkNames);


// ---- Task 2: Access Elements by Index ----
// RUBRIC: Array Creation and Access

// Bracket notation with a number gives you one item from the array.
const firstPark = parkNames[0];
show("Task 2: First park (index 0)", firstPark);

// The last item is always at index length - 1.
// Length is one more than the last index, so we subtract 1.
const lastIndex = parkNames.length - 1;
const lastPark = parkNames[lastIndex];
show("Task 2: Last park (length - 1)", lastPark);

const middlePark = parkNames[3];
show("Task 2: Middle park (index 3)", middlePark);

// Accessing an index that does not exist returns undefined - not an error.
// The error only shows up later when you try to use the undefined value.
const outOfBounds = parkNames[99];
show("Task 2: Index 99 (does not exist)", outOfBounds);


// ---- Task 3: Loop with a Standard for Loop ----
// RUBRIC: Looping - Standard for loop

showSection("Task 3: Standard for Loop (check console)");

// A standard for loop has three parts: start, condition, increment.
// This visits every index from 0 up to (but not including) the length.
// Each iteration, i holds the current index number.
for (let i = 0; i < parkNames.length; i++) {
  const currentPark = parkNames[i];
  console.log("Park #" + i + ": " + currentPark);
}
// Output (in console):
// Park #0: Yellowstone
// Park #1: Yosemite
// ... and so on


// ---- Task 4: Loop with for...of ----
// RUBRIC: Looping - for...of

showSection("Task 4: for...of Loop (check console)");

// for...of is simpler than a standard for loop when you do not need the index.
// On each pass, the variable 'parkName' is assigned the next value in the array.
for (const parkName of parkNames) {
  console.log(parkName);
}


// ---- Task 5: Loop with forEach ----
// RUBRIC: Looping - forEach

showSection("Task 5: forEach (check console)");

// forEach is an array method that accepts a callback function.
// The callback runs once for each item. The first parameter gets the value.
parkNames.forEach(function(parkName) {
  console.log(parkName);
});

// forEach also provides an optional second parameter for the index.
parkNames.forEach(function(parkName, index) {
  console.log(index + ": " + parkName);
});


// ---- Task 6: Use map() to Transform the Array ----
// RUBRIC: Transformation Methods - map()

// map() creates a NEW array by running a function on every item.
// Whatever you return from the function becomes the item in the new array.
// The original parkNames array is not changed.
const officialNames = parkNames.map(function(parkName) {
  return parkName + " National Park";
});

show("Task 6: Original parkNames (unchanged)", parkNames);
show("Task 6: officialNames from map()", officialNames);


// ---- Task 7: Use filter() to Narrow Down ----
// RUBRIC: Transformation Methods - filter()

// filter() creates a NEW array containing only items where the function returns true.
const longParkNames = parkNames.filter(function(parkName) {
  return parkName.length > 7;
});

show("Task 7: Park names longer than 7 characters", longParkNames);


// ---- Task 8: Use find() to Locate One Item ----
// RUBRIC: Transformation Methods - find()

// find() returns the FIRST item where the function returns true.
// It returns a single value, not an array. Returns undefined if nothing matches.
const firstGPark = parkNames.find(function(parkName) {
  return parkName[0] === "G";
});

show("Task 8: First park starting with G", firstGPark);

const firstZPark = parkNames.find(function(parkName) {
  return parkName[0] === "Z";
});
show("Task 8: First park starting with Z", firstZPark);

// No park starts with "X" so find() returns undefined.
const firstXPark = parkNames.find(function(parkName) {
  return parkName[0] === "X";
});
show("Task 8: First park starting with X (none exist)", firstXPark);


// ============================================================
// PART 2: OBJECTS
// ============================================================

showSection("Part 2: Objects");


// ---- Task 9: Create an Empty Object and Add Properties ----
// RUBRIC: Object Creation and Properties

// Start with a completely empty object using {}
// Then add properties one at a time using dot notation.
const myPark = {};

myPark.name = "Yellowstone";
myPark.state = "Wyoming";
myPark.established = 1872;
myPark.entranceFee = 35;
myPark.isWilderness = true;

show("Task 9: myPark (empty object + dynamic properties)", myPark);


// ---- Task 10: Create an Object with Literal Notation ----
// RUBRIC: Object Creation and Properties

// Object literal notation defines all properties at once inside curly braces.
// Properties are key-value pairs separated by colons. Pairs are separated by commas.
const otherPark = {
  name: "Grand Canyon",
  state: "Arizona",
  established: 1919,
  entranceFee: 35,
  // A property name with a space must be wrapped in quotes.
  // Bracket notation is required to access it.
  "managed by": "National Park Service",
  // A property can hold another object (nested object).
  location: {
    region: "Southwest",
    latitude: 36.1
  }
};

show("Task 10: otherPark (object literal)", otherPark);


// ---- Task 11: Dot Notation Access ----
// RUBRIC: Object Creation and Properties

show("Task 11: otherPark.name (dot notation)", otherPark.name);
show("Task 11: otherPark.established (dot notation)", otherPark.established);
show("Task 11: otherPark.entranceFee (dot notation)", otherPark.entranceFee);


// ---- Task 12: Bracket Notation Access ----
// RUBRIC: Object Creation and Properties

// Bracket notation uses a string inside square brackets.
// It does the exact same thing as dot notation.
show("Task 12: otherPark[\"state\"] (bracket notation)", otherPark["state"]);
show("Task 12: otherPark[\"entranceFee\"] (bracket notation)", otherPark["entranceFee"]);

// Bracket notation also works with a variable as the key.
// This is something dot notation cannot do.
const propertyToAccess = "name";
show("Task 12: Access using a variable as the key", otherPark[propertyToAccess]);


// ---- Task 13: Access a Property with a Space in the Name ----
// RUBRIC: Object Creation and Properties

// Dot notation causes a SyntaxError with space-key properties.
// Bracket notation with a string is the only option.
// console.log(otherPark.managed by); // SyntaxError - do not do this

show("Task 13: otherPark[\"managed by\"] (space in key)", otherPark["managed by"]);


// ---- Task 14: Delete a Property ----
// RUBRIC: Object Creation and Properties

show("Task 14: Before delete, otherPark.entranceFee", otherPark.entranceFee);

delete otherPark.entranceFee;

show("Task 14: After delete, otherPark.entranceFee (now undefined)", otherPark.entranceFee);
show("Task 14: Full otherPark object after delete", otherPark);


// ---- Task 15: Access Nested Objects ----
// RUBRIC: Nested Data and Chaining

// Chaining works because each dot access returns a value.
// If that value is an object, you can immediately access one of its properties.

// Longhand - step by step with intermediate variables.
const locationObject = otherPark.location;
show("Task 15 longhand step 1: locationObject", locationObject);
const regionValue = locationObject.region;
show("Task 15 longhand step 2: regionValue", regionValue);

// Shorthand - chained dot notation. Same result, no intermediate variable.
show("Task 15 shorthand: otherPark.location.region", otherPark.location.region);
show("Task 15 shorthand: otherPark.location.latitude", otherPark.location.latitude);

// Bracket notation chaining works the same way.
show("Task 15 bracket chain: otherPark[\"location\"][\"region\"]", otherPark["location"]["region"]);


// ---- Task 16: Add a Method to an Object ----
// RUBRIC: Object Methods

// A method is a function stored as a property on an object.
// You add it just like any other property, but the value is a function.
// Call it using the object name, a dot, the method name, and parentheses.
myPark.getDescription = function() {
  return myPark.name + " was established in " + myPark.established + " in " + myPark.state;
};

show("Task 16: myPark.getDescription()", myPark.getDescription());


// ---- Task 17: Use 'this' Inside a Method ----
// RUBRIC: Object Methods

// Inside a method, 'this' refers to the object the method belongs to.
// Using 'this' is better than referencing the variable name directly because
// the method still works correctly even if the variable is renamed.
//
// Important: use the 'function' keyword for object methods that use 'this'.
// Arrow functions do not have their own 'this' - they inherit it from the
// outer scope, which gives the wrong result.

const featuredPark = {
  name: "Yosemite",
  state: "California",
  established: 1890,
  annualVisitors: 3300000,

  // 'this' refers to featuredPark when the method runs.
  getLabel: function() {
    return this.name + " National Park (" + this.state + ")";
  },

  getAge: function() {
    const currentYear = 2026;
    return currentYear - this.established;
  }
};

show("Task 17: featuredPark.getLabel()", featuredPark.getLabel());
show("Task 17: featuredPark.getAge()", featuredPark.getAge());

// What happens with an arrow function instead?
// Arrow functions do not have their own 'this'.
const brokenPark = {
  name: "Glacier",
  // Do not do this - arrow functions and 'this' do not mix for object methods.
  describeWrong: () => {
    return this.name; // 'this' is NOT brokenPark here
  }
};
show("Task 17: Arrow function 'this' is wrong (undefined)", brokenPark.describeWrong());

// What happens if you forget 'this' and just use the property name directly?
// If there is no variable called 'balance' in the outer scope, you get a ReferenceError.
const savingsAccount = {
  balance: 1000,

  // Wrong - 'balance' by itself is not a variable in this scope
  depositWrong: function(amount) {
    // balance += amount; // ReferenceError: balance is not defined
    // Uncomment the line above to see the error in your console.
  },

  // Right - 'this.balance' reaches the property on the object
  deposit: function(amount) {
    this.balance += amount;
  },

  getBalance: function() {
    return this.balance;
  }
};

savingsAccount.deposit(500);
show("Task 17: Correct 'this.balance' after deposit", savingsAccount.getBalance());


// ============================================================
// PART 3: ARRAYS OF OBJECTS
// ============================================================

showSection("Part 3: Arrays of Objects");


// ---- Task 18: Create an Array of Park Objects ----
// RUBRIC: Arrays of Objects (Combined)

// An array can contain objects as its items.
// Each object in the array represents one park in our dataset.
// Notice every park object has the same set of properties - this is important
// because it makes looping and filtering predictable.
const parks = [
  { name: "Yellowstone",           state: "Wyoming",     established: 1872, areaSqMiles: 3468, annualVisitors: 4900000, entranceFee: 35 },
  { name: "Yosemite",              state: "California",  established: 1890, areaSqMiles: 1169, annualVisitors: 3300000, entranceFee: 35 },
  { name: "Grand Canyon",          state: "Arizona",     established: 1919, areaSqMiles: 1904, annualVisitors: 4700000, entranceFee: 35 },
  { name: "Zion",                  state: "Utah",        established: 1919, areaSqMiles: 229,  annualVisitors: 4700000, entranceFee: 35 },
  { name: "Great Smoky Mountains", state: "Tennessee",   established: 1934, areaSqMiles: 816,  annualVisitors: 12100000, entranceFee: 0 },
  { name: "Rocky Mountain",        state: "Colorado",    established: 1915, areaSqMiles: 415,  annualVisitors: 4400000, entranceFee: 35 },
  { name: "Olympic",               state: "Washington",  established: 1938, areaSqMiles: 1442, annualVisitors: 2700000, entranceFee: 35 },
  { name: "Acadia",                state: "Maine",       established: 1919, areaSqMiles: 76,   annualVisitors: 3900000, entranceFee: 35 }
];

showTable("Task 18: Parks Inventory", parks);

// Accessing one park then a property on it - same chaining idea from nested objects.
const firstParkObject = parks[0];
const firstParkName = firstParkObject.name;
show("Task 18: First park name (longhand)", firstParkName);

// Shorthand - same result.
show("Task 18: First park name (chained)", parks[0].name);


// ---- Task 19: Loop Through the Array of Objects ----
// RUBRIC: Arrays of Objects (Combined)

showSection("Task 19: Loop through Parks (check console)");

// When you loop through an array of objects, the loop variable is one complete
// object on each pass. Access its properties with dot notation.
parks.forEach(function(park) {
  const parkInfo = park.name + " (" + park.state + ") - Est. " + park.established;
  console.log(parkInfo);
});


// ---- Task 20: Filter the Parks Array ----
// RUBRIC: Arrays of Objects (Combined)

// Filter works the same way on objects as on strings.
// The loop variable is the full object, so use dot notation to check the property.

// Find all parks with free admission.
const freeParks = parks.filter(function(park) {
  return park.entranceFee === 0;
});
showTable("Task 20: Free parks (entranceFee === 0)", freeParks);

// Find the most visited parks (over 4 million visitors per year).
const busyParks = parks.filter(function(park) {
  return park.annualVisitors > 4000000;
});
showTable("Task 20: Busy parks (over 4 million visitors)", busyParks);


// ---- Task 21: Map the Parks Array to Labels ----
// RUBRIC: Arrays of Objects (Combined)

// map() transforms each park object into a simple string label.
// The new array contains strings even though the original contained objects.
const parkLabels = parks.map(function(park) {
  return park.name + " - " + park.state + " (" + park.established + ")";
});

show("Task 21: Park labels from map()", parkLabels);


// ============================================================
// PART 4: OBJECT MANIPULATION
// ============================================================

showSection("Part 4: Object Manipulation");


// ---- Task 22: Copy an Object with Object.assign() ----
// RUBRIC: Object Manipulation - Copy objects using Object.assign()

// Object.assign() copies all properties from one or more source objects
// into a target object. Passing {} as the target creates a brand new object
// rather than modifying an existing one.
// Syntax: Object.assign(target, source)

const basePark = {
  name: "Yosemite",
  state: "California",
  established: 1890,
  entranceFee: 35
};

// The {} is an empty target - all properties from basePark get copied into it.
const updatedPark = Object.assign({}, basePark);

// Change one property on the copy.
updatedPark.entranceFee = 0;

show("Task 22: Original basePark (unchanged)", basePark);
show("Task 22: Updated copy with new entranceFee", updatedPark);

// Object.assign() can merge two objects into one.
// Properties in later arguments overwrite properties in earlier ones.
const extraData = { areaSqMiles: 1169, annualVisitors: 3300000 };
const fullRecord = Object.assign({}, basePark, extraData);
show("Task 22: Merged object (basePark + extraData)", fullRecord);


// ---- Task 23: Reference vs Value ----
// RUBRIC: Object Manipulation - Reference vs value

// JavaScript has two categories of data types:
//
// PRIMITIVE types (number, string, boolean, null, undefined):
//   - Stored directly as a value.
//   - Assigning to a new variable creates an independent copy.
//   - Changing the copy does not affect the original.
//
// REFERENCE types (objects and arrays):
//   - Stored as a reference (a pointer to a location in memory).
//   - Assigning to a new variable gives BOTH variables the same pointer.
//   - Changing the object through either variable affects both.

// --- Part A: Primitives copy by VALUE ---

let originalFee = 35;
let saleFee = originalFee; // saleFee gets an independent copy of 35

saleFee = 0; // changing saleFee does NOT touch originalFee

show("Task 23 Part A: originalFee after changing saleFee", originalFee); // 35
show("Task 23 Part A: saleFee", saleFee);                                 // 0

// --- Part B: Objects copy by REFERENCE ---

const parkA = { name: "Glacier", entranceFee: 35 };
const parkB = parkA; // parkB does NOT get a copy - both point to the SAME object

parkB.entranceFee = 0; // changing through parkB also changes parkA

show("Task 23 Part B: parkA.entranceFee after changing through parkB", parkA.entranceFee); // 0
show("Task 23 Part B: parkB.entranceFee", parkB.entranceFee);                              // 0
// parkA and parkB are the same object in memory. There is only one object.

// --- Part C: Object equality checks the reference, not the contents ---

const park1 = { name: "Arches", state: "Utah" };
const park2 = { name: "Arches", state: "Utah" };

// Even though park1 and park2 look identical, they are two separate objects in memory.
// === checks if they point to the same location in memory, not if contents match.
show("Task 23 Part C: park1 === park2 (same contents, different objects)", park1 === park2); // false

const park3 = park1; // park3 and park1 point to the SAME object
show("Task 23 Part C: park1 === park3 (same reference)", park1 === park3); // true

// To compare contents, compare each property individually or use JSON.stringify().
show("Task 23 Part C: Contents equal via JSON.stringify", JSON.stringify(park1) === JSON.stringify(park2)); // true


// ---- Task 24: const with Objects and Arrays ----
// RUBRIC: Object Manipulation - const with reference types

// const prevents REASSIGNMENT - you cannot make the variable point to a different value.
// const does NOT prevent MUTATION - changing the contents of an object or array is fine.
// This surprises many beginners who assume const means the value is completely frozen.

// --- Part A: Mutating a const object IS allowed ---

const myFavoritePark = { name: "Yellowstone", state: "Wyoming" };

myFavoritePark.name = "Grand Teton"; // This works - mutation of a property

show("Task 24 Part A: myFavoritePark after mutating .name", myFavoritePark);

// --- Part B: Reassigning a const variable is NOT allowed ---

// The line below would throw: TypeError: Assignment to constant variable
// Uncomment it to see the error in your console.
// myFavoritePark = { name: "Zion" };

// Why? The = tries to make myFavoritePark point to a brand new object.
// const does not allow the variable binding to change.
// Fix: change individual properties instead, or use let if reassignment is needed.
show("Task 24 Part B: Reassignment attempt is commented out to prevent TypeError", "see script.js line above");

// --- Part C: Mutating a const array IS allowed ---

const parkList = ["Yellowstone", "Yosemite"];

parkList.push("Grand Canyon"); // This works - push mutates the array contents

show("Task 24 Part C: parkList after .push()", parkList);

// The line below would throw: TypeError: Assignment to constant variable
// Uncomment it to see the error.
// parkList = ["Zion"];

// Rule of thumb: use const by default.
// Switch to let only when you genuinely need to reassign the variable itself.


// ============================================================
// BONUS: Additional Concepts
// ============================================================

showSection("Bonus: Additional Concepts");


// ---- Bonus A: Object.keys(), Object.values(), Object.entries() ----

const samplePark = {
  name: "Acadia",
  state: "Maine",
  established: 1919,
  entranceFee: 35
};

// Object.keys() returns an array of all property names.
const propertyNames = Object.keys(samplePark);
show("Bonus A: Object.keys()", propertyNames);

// Object.values() returns an array of all property values.
const propertyValues = Object.values(samplePark);
show("Bonus A: Object.values()", propertyValues);

// Object.entries() returns an array of [key, value] pairs.
const propertyPairs = Object.entries(samplePark);
show("Bonus A: Object.entries()", propertyPairs);

// Accessing a specific entry by index - entries returns an array of arrays.
show("Bonus A: entries[0] (first key-value pair)", propertyPairs[0]);
show("Bonus A: entries[0][0] (first key)", propertyPairs[0][0]);
show("Bonus A: entries[0][1] (first value)", propertyPairs[0][1]);

// Object.entries() is useful for looping through all properties.
console.log("--- Bonus A: Looping with Object.entries() ---");
Object.entries(samplePark).forEach(function(entry) {
  const key = entry[0];
  const value = entry[1];
  console.log(key + ": " + value);
});


// ---- Bonus B: Chaining Array Methods ----

// Each array method returns a new array, so you can immediately call
// another method on the result.

// Longhand - store each step.
const historicParks = parks.filter(function(park) {
  return park.established < 1920;
});
const historicParkLabels = historicParks.map(function(park) {
  return park.name + " (" + park.established + ")";
});
show("Bonus B: Historic parks - longhand", historicParkLabels);

// Shorthand - chained. Same result.
const chainedResult = parks
  .filter(function(park) {
    return park.established < 1920;
  })
  .map(function(park) {
    return park.name + " (" + park.established + ")";
  });
show("Bonus B: Historic parks - chained (same result)", chainedResult);


// ---- Bonus C: Spread Operator to Copy ----

const originalPark = { name: "Zion", state: "Utah", established: 1919, entranceFee: 35 };

// The spread operator copies all properties into a new object.
const discountedPark = { ...originalPark, entranceFee: 0 };

show("Bonus C: Original park (unchanged)", originalPark);
show("Bonus C: Discounted copy", discountedPark);
