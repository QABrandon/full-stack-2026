// primitives can not be changed - immutable

// objects and arrays can be changed - mutable

let myNumber = 5;
// created a named container with a special memory address
// myNumber points to that specific address of that container

let myCopy = myNumber;
// myCopy is also pointing to that same address of that original container

myNumber = 20;

console.log(myCopy);
console.log(myNumber);

// What happens to myOtherCopy and myNumber when we do the following?
let myOtherCopy = myNumber;
myNumber++;

console.log(myOtherCopy);
console.log(myNumber);

// What about arrays/Objects

// const means no reassigning -> doesn't make objects/arrays immutable

const myObject = { value: 50 };

const myObjectCopy = myObject;

myObject.value = 100;

console.log(myObject);

// what does myObjectCopy.value contain?

console.log("myObject", myObject);
console.log("myObjectCopy", myObjectCopy);

// Why not just work like primitives?
// theres a compute cost for copying values
// there is a data cost for copying values

// we want to save memory -> not copying objects 


// what happens if I update the value with the copy to 200?
// myObjectCopy.value = 200
myObjectCopy.value = 200;

console.log("myObject", myObject);
console.log("myObjectCopy", myObjectCopy);

// if I update one I update the other because they are tied to the same address/reference


// We can force JS to make new containers/copies for us with Arrays/Objects

// we can do this by using spread

/// this time I don't want to point to the named container of myObject
// const myThirdObject = myObject

// instead I want to create a new container

const myThirdObject =  {...myObject};

console.log("My Third Object", myThirdObject)

myThirdObject.value = 1000;

// now what will the other two variables have for their values?

console.log("myObject", myObject);
console.log("myObjectCopy", myObjectCopy);

console.log(myThirdObject)