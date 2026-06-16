const numbers = [2, 4, 6, 8]; // array of numbers
const strings = ["abc", "def", "hij"]; // array of strings
const fruits = ["banana", "kiwi", "cherry", "apple", "strawberry"];

// how do we grab "strawberry" using array index?

// which variable are we referencing?

// which index are we reference?

console.log(fruits[4])

// I want to grab six the the number list

// 0-> 2, 1 -> 4, 2 -> 6

console.log(numbers[6])


// last element in an array

console.log(numbers[numbers.length - 1])


// for (let index = 0; index < array.length; index++) {
//     const element = array[index];
    
// }
// i++ is the same as i = i + 1;
for(let i = 0; i < fruits.length; i++){
    const element = fruits[i];
    console.log(element)
}

//for (const element of object) {
    
// }

for(const fruit of fruits){
    console.log(fruit)
}

const myArray = []; // create an empty array with an open/close square brackets

console.log(myArray);

