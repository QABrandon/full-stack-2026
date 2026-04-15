// Normal function definition
function isNumberZero(element) {
  return element === 0;
}

console.log(isNumberZero(1));

// Function Expressions

// These two are exactly the same
// simplest arrow function -> shortest / least characters
const isNumberZero = (element) => element === 0;
console.log(isNumberZero(1));

// most complex arrow function -> just remember this one
const isNumberZero = (element) => {
  return element === 0;
};

// ignore this part for myArray as we haven't covered it yet
let myArray = [1, 2, 3, 0];

// find a higher order function
myArray.find(isNumberZero);


// All 6 of these are exactly the same 
// 6 ways to make anonymous functions 

// anonymous function does not have a name -> like a literal 5, true, "hello"

myArray.find(element => element === 0); // anonymous arrow function (out of scope anywhere else)
// smallest example myArray.find(e => e === 0)

myArray.find((element) => element === 0 ); // anonymous arrow function (out of scope anywhere else)

myArray.find((element) => {return element === 0; }); // anonymous arrow function (out of scope anywhere else)   

myArray.find(element => {return element === 0; }); // anonymous arrow function (out of scope anywhere else)    

myArray.find(function (element) {return element === 0}); // anonymous standard function syntax (out of scope anywhere else)  
    
myArray.find(function namedForTesting(element) {return element === 0}); // named (out of scope anywhere else)    
   
