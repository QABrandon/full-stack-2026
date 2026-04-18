// array methods are just functions associated with the array data type

const fruits = ["banana", "kiwi", "cherry", "apple", "strawberry"];

// type in "fruits." in VSCODE
// take a look at all of the methods available to you
// if you were to guess, what do they do?

//fruits.

// for any array method

// what are the inputs (sometimes there are many different ways to call a method)
// could take in 1 parameter, or it could take in 3
// does it modify the array?

// whats the expected output

console.log(fruits.push("grapes")); // what does this return? its a number

// if we hover over "push", it says that we get the new length of the array

// so if thats true, fruits.length should be 6

console.log(fruits.length);

// double check that the "grapes" got added
console.log(fruits);

// pop - removes a element from the end of the array and return it
// to where it was called from

console.log(fruits.pop());

console.log(fruits); // back to how it was before

// shift and unshift - look them up on mdn first - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop

fruits.unshift("grapes");
console.log(fruits);

console.log(fruits.shift());
console.log(fruits);

//  map, find, includes, filter, reduce, some, every, splice, slice

function moreThanSixCharacters(str) {
  if (str.length > 6) {
    return true;
  }

  return false;
  //shorthand would be
  // return str.length > 6
}

console.log(fruits.filter(moreThanSixCharacters));

console.log(fruits);

const filteredIn = fruits.filter((str) => {
  return str.length > 6;
});

console.log(filteredIn);
