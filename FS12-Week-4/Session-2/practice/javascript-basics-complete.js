// JavaScript Basics Practice - Complete Version
// Run this file in Quokka.js or JavaScript REPL for real-time feedback

console.log("=== JavaScript Basics Practice - Complete ===");

// Exercise 1: Variable Declarations vs Initializations
// Learn the difference between declaring and initializing variables

let userName; // declared but not initialized
console.log("userName after declaration:", userName); // undefined

userName = "Alex"; // now initialized
console.log("userName after initialization:", userName);

// const PI; // This would cause an error - const must be initialized
const PI = 3.14159; // declared and initialized together
console.log("PI:", PI);

console.log("Exercise 1 completed!");

// Exercise 2: Primitive Data Types
// Work with different data types and explore their typeof

let age = 25;
let firstName = "Sarah";
let isStudent = true;
let phoneNumber; // declared but not initialized (undefined)
let middleName = null; // explicitly set to null

console.log("age:", age, "- type:", typeof age);
console.log("firstName:", firstName, "- type:", typeof firstName);
console.log("isStudent:", isStudent, "- type:", typeof isStudent);
console.log("phoneNumber:", phoneNumber, "- type:", typeof phoneNumber);
console.log("middleName:", middleName, "- type:", typeof middleName);

console.log("Exercise 2 completed!");

// Exercise 3: String Operations
// Practice string concatenation and template literals

let first = "John";
let last = "Doe";

let fullNameConcat = first + " " + last;
console.log("Using + operator:", fullNameConcat);

let greeting = `Hello, my name is ${first} ${last}!`;
console.log("Using template literals:", greeting);

console.log("Length of full name:", fullNameConcat.length);
console.log("First name uppercase:", first.toUpperCase());
console.log("Last name lowercase:", last.toLowerCase());

console.log("Exercise 3 completed!");

// Exercise 4: Variable Assignment and Reassignment
// Practice changing variable values

let score = 0;
console.log("Initial score:", score);

score = 100;
console.log("Updated score:", score);

const maxScore = 100;
console.log("Max score:", maxScore);

// maxScore = 200; // This would cause an error - const cannot be reassigned

console.log("Exercise 4 completed!");

// Exercise 5: Variable Assignment Creates New Containers
// Understand how variables are independent containers

let originalScore = 85;
console.log("originalScore:", originalScore);

let copiedScore = originalScore; // copying the VALUE, not the container
console.log("copiedScore after copying:", copiedScore);
console.log("Both have same value - originalScore:", originalScore, "copiedScore:", copiedScore);

copiedScore = 95; // changing only copiedScore's container
console.log("After changing copiedScore:");
console.log("originalScore stays the same:", originalScore);
console.log("copiedScore changed:", copiedScore);
console.log("Each variable is its own independent container!");

console.log("Exercise 5 completed!");
console.log("All exercises completed! 🎉");