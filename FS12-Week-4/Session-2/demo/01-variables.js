// Data Types -> Primitive Types

// Number is our first primitive
// integer

let myNum = 5;

console.log(myNum);

myNum = 10; // reassigning the value of myNum - dont use let again

console.log(myNum);

//float - numbers with fraction/decimals

const pi = 3.14;

console.log(pi);

//pi = 5 reassignment error

// Boolean - true / false (boolean logic) -> helps you make decisions in your code

let isSunny = false;

// later that day

isSunny = true;

// Strings

// any amount of text

// 1 character to LOTs and LOTs -> paragraphs, up to a books

// "a" => "lorem ipsum" => "insert book here"

// surrounded by " or ' quotes

const letter = "a";

const paragraph =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa suscipit deleniti quibusdam maiores atque pariatur repellat vero ullam dolorem repellendus placeat quasi iusto soluta perspiciatis praesentium quod tenetur, fugiat nisi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa suscipit deleniti quibusdam maiores atque pariatur repellat vero ullam dolorem repellendus placeat quasi iusto soluta perspiciatis praesentium quod tenetur, fugiat nisi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa suscipit deleniti quibusdam maiores atque pariatur repellat vero ullam dolorem repellendus placeat quasi iusto soluta perspiciatis praesentium quod tenetur, fugiat nisi!";

console.log(paragraph);

// null and undefined

// null is specifically setting an empty value on a variable
// Null -> specifically set a value to nothing - Object
const myHouse = null;

console.log(myHouse);

// What is different between null/true/false vs strings
// double quotes...


// undefined -> we forgot to set a value or none exists

let declaredVariable;

console.log(declaredVariable)

declaredVariable = 5;

console.log(declaredVariable)


// in JavaScript - we can switch data types on variables


//variables can also change datatypes in Javascript

declaredVariable = "This is a string now"
console.log(declaredVariable)