// define the function
// here is what your function does
// use action words for function name
function openDoor(){
    //your code goes in here
    return "You opened the door";
}


// call, invoke, execute, run
console.log(openDoor())

openDoor // this doesn't do anything we can see

// whats the difference - not counting console.log() - between lines 10 and 12


// What happens here?
// 1. goes to the first line in the curly braces of opendoor
// 2. execute each line of code until:
// - return is stated
// - the closing curly brace comes up
// 3. if return is used it returns the value to where it was called from

// function openDoor() {
//   (1.) (2.)return (3.)"You have opened the door";
// }

//
// openDoor();
// for (3.) openDoor() turns into "You have opened the door"



// Parameters in functions

function add(x, y){
    return x + y;
}

console.log(add(1, 2))
console.log(add(10, 10))

// how return works with add

let sum = add(15, 20);

// 1. when add function is called go to line 36
// 2. x is set to ???
// 3. x is set to 15
// 4. y is set to 20
// 5. x + y ran
// 6. x + y became 35
// 7. return 35
// 8. let sum = 35

//add(15,20)
// function add() {
//   let x = 15; // similar to doing this
//   let y = 20;
//   return x + y;
// }
