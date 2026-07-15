// create a function reverse that reverses a string
// constraints - you cannot use built in or 3rd party libraries

// the => eht
// add => dda

// clarify
// reverse("abc") => "cba"
// reverse(93456)

// Working out the problem
// loop through "the"
// start at the end
// create a variable to hold the result value
// exit loop and return the result

// 1. the => result => e
// 2. th => resule => eh
// 3. t => result => eht

// Pseudocode

// create the output variable
// loop through the input string starting at the end
   // add character to result
// return the output   


// Code the solution

function reverse(str){
  // create the output variable
  let result = ""
  // loop through the input string starting at the end
  // end of index length - 1
  // i--  2 => 1 => 0
  for( let i = str.length - 1; i >= 0; i-- ){
    // add character to result
    result += str[i];
  }
  // return the output
  return result
}

// test solution with examples

// "a" => "a"
// "qwerty" => "ytrewq"

// run the test cases

console.log("the => ", reverse("the"));
console.log("add => ", reverse("add"));
