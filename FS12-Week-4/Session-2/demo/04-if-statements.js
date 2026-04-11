// used in branching logic - control flow (logic)
// go down one path or the other

//if example

// dont forget to use the snippets as a cheatsheet
// if + tab and you get the snippet below to reference
// if (condition) {

// }

if (true) {
  // run this code if the condition is true
  console.log("Yay!");
}

if (false) {
  // run this code if the condition is true
  console.log("Nay!");
}

// if / else

// if (condition){

//} else {

//}

if (true) {
  //run this if true
  console.log("Yay");
} else {
  // run this code if the condition is false
  console.log("Boo");
}

// what about a more real world example?

let isUserSignedIn = true;
let userName = "Mario";

if (isUserSignedIn) {
  // if true run this code
  console.log(`${userName}, how is the plumbing world?`);
} else {
  // if condition false
  // run this code
  console.log("Please log in");
}

// in our condition

// comparison operators

const value1 = 7;
const value2 = 1;

if (value1 < value2) {
  console.log("Math is broken");
}

// Logical operators
const value3 = 0;
const value4 = 22;
const value5 = 30;

if ((value1 > 8 && value2 < 1 && value3 && value4) || value5 === "Hello") {
  console.log("both are true");
}

const isAHelloText = value5 === "Hello";
const isLargeEnough = value1 > 8;
const isSmallEnough = value2 < 1;
// best practice to make your if statements readable

if ((isLargeEnough && isSmallEnough) || isAHelloText) {
  console.log("both are true");
}


// if else if else

// play around with if  else if statements in the debugger

// if(){

// } else if(){

// } else if(){

// } else {

// }

let temperature = 75;
// Else-if for multiple conditions
if (temperature > 90) {
  console.log("Extremely hot!");
} else if (temperature > 80) {
  console.log("Hot");
} else if (temperature > 60) {
  console.log("Comfortable");
} else {
  console.log("Cold");
}