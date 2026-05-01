// Local Storage - Simple Demo
//
// Open any HTML file in the browser, then open the console (F12 > Console).
// Paste this entire file into the console and run it section by section,
// or just read along and type each line yourself to see what happens.
//
// localStorage is a built-in browser feature that stores key-value pairs.
// Data survives page refreshes and browser restarts.
// All keys and values are stored as strings.


// -------------------------------------------------------
// 1. setItem - Store a value
// -------------------------------------------------------

// localStorage.setItem(key, value) saves a value under a key name
localStorage.setItem("firstName", "Alice");
localStorage.setItem("favoriteColor", "blue");
localStorage.setItem("score", "95");

console.log("Stored 3 items in localStorage.");


// -------------------------------------------------------
// 2. getItem - Read a value back
// -------------------------------------------------------

// localStorage.getItem(key) returns the value, or null if the key does not exist
const name = localStorage.getItem("firstName");
console.log("firstName:", name);
// Output: firstName: Alice

const color = localStorage.getItem("favoriteColor");
console.log("favoriteColor:", color);
// Output: favoriteColor: blue

// If the key does not exist, getItem returns null
const missing = localStorage.getItem("doesNotExist");
console.log("missing key:", missing);
// Output: missing key: null


// -------------------------------------------------------
// 3. Everything is a string
// -------------------------------------------------------

// Even though we stored "95", it comes back as a string, not a number
const score = localStorage.getItem("score");
console.log("score:", score);
console.log("type of score:", typeof score);
// Output: type of score: string

// To use it as a number, convert it with parseInt or Number
const scoreAsNumber = parseInt(score);
console.log("scoreAsNumber:", scoreAsNumber);
console.log("type now:", typeof scoreAsNumber);
// Output: type now: number


// -------------------------------------------------------
// 4. removeItem - Delete one item
// -------------------------------------------------------

// localStorage.removeItem(key) deletes a single key-value pair
localStorage.removeItem("score");

const afterRemove = localStorage.getItem("score");
console.log("score after remove:", afterRemove);
// Output: score after remove: null


// -------------------------------------------------------
// 5. Storing objects with JSON.stringify
// -------------------------------------------------------

// You cannot store an object directly - it becomes "[object Object]"
const user = { name: "Alice", age: 25, hobby: "painting" };

// WRONG way - do not do this
localStorage.setItem("user-wrong", user);
console.log("Wrong way:", localStorage.getItem("user-wrong"));
// Output: Wrong way: [object Object]   <-- useless!

// RIGHT way - convert the object to a JSON string first
const userAsString = JSON.stringify(user);
console.log("JSON string:", userAsString);
// Output: JSON string: {"name":"Alice","age":25,"hobby":"painting"}

localStorage.setItem("user", userAsString);
console.log("Stored the user object as a JSON string.");


// -------------------------------------------------------
// 6. Reading objects back with JSON.parse
// -------------------------------------------------------

// getItem returns a string, so we need to convert it back to an object
const savedString = localStorage.getItem("user");
console.log("Raw string from storage:", savedString);

const savedUser = JSON.parse(savedString);
console.log("Parsed object:", savedUser);
console.log("Name:", savedUser.name);
console.log("Age:", savedUser.age);
console.log("Hobby:", savedUser.hobby);


// -------------------------------------------------------
// 7. Storing arrays with JSON.stringify
// -------------------------------------------------------

// Arrays work the same way - stringify to save, parse to read
const shoppingList = ["bread", "milk", "eggs", "cheese"];

localStorage.setItem("shoppingList", JSON.stringify(shoppingList));

const savedList = JSON.parse(localStorage.getItem("shoppingList"));
console.log("Shopping list:", savedList);
console.log("First item:", savedList[0]);
console.log("Number of items:", savedList.length);


// -------------------------------------------------------
// 8. Updating stored data
// -------------------------------------------------------

// There is no "update" method. Read it, change it, save it again.

// Step 1: Read the current list
const currentList = JSON.parse(localStorage.getItem("shoppingList"));

// Step 2: Change it
currentList.push("butter");

// Step 3: Save it back
localStorage.setItem("shoppingList", JSON.stringify(currentList));

const updatedList = JSON.parse(localStorage.getItem("shoppingList"));
console.log("Updated list:", updatedList);
// Output: Updated list: ["bread", "milk", "eggs", "cheese", "butter"]


// -------------------------------------------------------
// 9. Checking if a key exists
// -------------------------------------------------------

// getItem returns null when the key is not found
// Use an if statement to check before using the value
const savedTheme = localStorage.getItem("theme");

if (savedTheme === null) {
  console.log("No theme saved. Using default.");
} else {
  console.log("Found saved theme:", savedTheme);
}


// -------------------------------------------------------
// 10. clear - Delete everything
// -------------------------------------------------------

// localStorage.clear() removes ALL key-value pairs at once
// Be careful - this deletes everything, not just your items

console.log("Before clear - firstName:", localStorage.getItem("firstName"));

localStorage.clear();

console.log("After clear - firstName:", localStorage.getItem("firstName"));
// Output: After clear - firstName: null

console.log("localStorage is now empty.");


// -------------------------------------------------------
// Quick Reference
// -------------------------------------------------------
//
// localStorage.setItem("key", "value")   - Save a string
// localStorage.getItem("key")            - Read a string (or null)
// localStorage.removeItem("key")         - Delete one item
// localStorage.clear()                   - Delete everything
//
// JSON.stringify(object)                 - Object/array -> string
// JSON.parse(string)                     - String -> object/array
//
// Common pattern for objects:
//   Save: localStorage.setItem("key", JSON.stringify(myObject))
//   Load: JSON.parse(localStorage.getItem("key"))
