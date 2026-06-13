// Create an array and its CONST

// we cannot reassign the variable
// to another value

const numbers = [1,5,10];

numbers.push(20)

console.log(numbers)

// making copies of LARGE data structures is expensive

// Array and Objects can be really big - MBs of information

// its take computer cycles to copy
// it takes extra ram to store the copy

const copyOfNumbers = numbers; 
// is this a reference to numbers now or does copyOfNumbers 
// have a new memory address with a copy

console.log(copyOfNumbers)

// now I will update numbers

numbers.push(50)

// what does numbers and copyOfNumbers look like now?

console.log(numbers)

console.log(copyOfNumbers)