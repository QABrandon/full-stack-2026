// Car

// methods -> action -> accelerate
// properties -> attributes about the object -> color

// properties
// make, model, year, numberOfWheels, color, horse power, numberOfDoors
// driveTrain, numberOfSeats, fuelType, maxSpeed

const myCar = {}; // create an empty object

myCar.year = 2010; // we access the properties to overwrite them similar to variables
myCar.make = "Honda";
myCar.model = "Accord";
myCar.unleadedFuel = true;

console.log(myCar)

// this above is the same as creating the object with it properties

// initialize the object

// values on properties can be any data type 
// primitives -> null, undefined, string, boolean, number
// non-primitives -> Objects and Arrays
// nest objects and arrays in different forms (multiple layers)
const otherCar = {
  year: 2000,
  make: "Ford",
  model: "F150",
  availableColors: ["blue", "white", "black"],
  "has space in property": "value of property",
  nested: { nestedProperty: "nestedValue"},
}

console.log(otherCar)

// access specific properties using dot or bracket notation

// dot notation

// how do we access year and model using dot notation?
console.log(otherCar.year);
console.log(otherCar.model);

// how about bracket notation?
console.log(otherCar["year"])
console.log(otherCar["model"])

// we are forced to use bracket notation with keys that have spaces
//console.log(otherCar.has space in property)

console.log(otherCar["has space in property"])

// I like to use dot notation when I can
console.log(otherCar["mode"]); //this doesn't exist and I get no error until runtime (undefined)
console.log(otherCar.mode); // mode may not exist on type warning

// Look around your room - find items and recognize their methods/properties

// delete properties
delete otherCar.year; // not used too often
console.log(otherCar);

// nested properties - objects within objects, or arrays within object, objects within arrays, nested a lot
// generally speaking you try to keep your object flat as reasonable/possible (2-3 maybe 4 layers ok - 20 layers deep reconsider the design)
// how can I get "nestValue" to print to the console?

// dot notation for nested properties (objects)
console.log(otherCar.nested.nestedProperty)
// bracket notation for nested properties (objects)
console.log(otherCar["nested"]["nestedProperty"])
// mixed notation
console.log(otherCar["nested"].nestedProperty)
// accessing array values

// common issues - you forget to add the "" around your property
// this will throw "nested is not defined" error
// because JS thinks nested is supposed to be a variable but its not defined
// and cant lookup a undefined string
//console.log(otherCar[nested]);

// this throws undefined because you passed a valid string but not a valid property
// on the object
//console.log(otherCar["nesteded"]);

// accessing values on arrays
console.log(otherCar.availableColors[0])

// Pro tip - try out notation in Chrome Dev Tools
// 1. copy over your object into dev tools with it declaration - tied to a variable
// 2. try out bracket/dot notation until you see what you expect (chrome dev tools previews the values) - no need to hit enter
// 3. Use this for immediate feedback and testing before writing out your code

// How does nesting work?

// this works for array and object method chaining or property chaining
// if we do this longhand it should make more sense
// dot notation

const year = otherCar.year;
// otherCar.year is access the years value and returning it to the right of the =
// const year = 2000;

const nestedObject = otherCar.nested;
console.log(nestedObject);
const nestedPropertyValue = nestedObject.nestedProperty;
console.log(nestedPropertyValue);

//chaining is shorthand for doing the above
console.log(otherCar.nested.nestedProperty);


// so this idea applies to any object i.e. arrays
// longhand
const fruits = ["banana", "kiwi", "strawberry"];
const filteredFruits = fruits.filter((e) => e.length > 5);
// const filteredFruits = fruits.filter((e) => e.length > 5);
// the return statement essentially replaces fruits.filter with the array literal
// const filteredFruits = ["banana", "strawberry"]
const statement = filteredFruits.map((e) => "I like " + e);
console.log(statement);

// dot chaining with arrays
console.log(fruits.filter((e) => e.length > 5).map((e) => "I like " + e));

// to make chained code like this more readable
// const result = fruits
//                     .filter((e) => e.length > 5)
//                     .map((e) => "I like " + e);
// console.log(result);

// where this can be confusing
//longhand
const fruitsTwo = ["banana", "kiwi", "strawberry"];
// fruitsTwo is a array -> we only have array methods
const firstFound = fruitsTwo.find((fruit) => fruit.length > 3);
// firstFound is a string -> we only have string methods
const thirdChar = firstFound.charAt(3);
console.log(thirdChar);

//shorthand
console.log(fruitsTwo.find((fruit) => fruit.length > 3).charAt(3));
// break down
// console.log("banana".charAt(3));
// console.log("a");
console.log("banana".charAt(3));

// for in loops
// loop over objects using key/value pairs

// type forin + tab to get an example below

// for (const key in object) {
//     if (!Object.hasOwn(object, key)) continue;

//     const element = object[key];

// }

for (const key in otherCar) {
  console.log("key:", key);
  // what can we do with this key?

  // the type of each key is a string
  // that means we can use bracket notation to get all of the values

  console.log("value:", otherCar[key]);
}

// hasOwnProperty
// we can check if a object has a property
// error checking to make sure property isn't undefined when accessed
// pretty useful for JS to check if your objects in the right state
// less useful once you use TypeScript
console.log(otherCar.hasOwnProperty("year")); // we deleted year earlier
console.log(otherCar.hasOwnProperty("make"));

// methods (actions/functions)

const bankAccount = {
  accountNumber: "12345-67890",
  owner: "Sarah Johnson",
  balance: 1250.75,
};


// whats a method that could help us get all of the values of the properties?
const accountNumber = "987654321";
const owner = "Joe Whatever";
const balance = 9876.54;


const smartBankAccount = {
  accountNumber: "12345-67890",
  owner: "Sarah Johnson",
  balance: 1250.75,

  //method
  // this refers to scope and will make more sense next lesson
  // referring to the objects accountNumber vs one that is declare outside of the 
  // object
  print: function () {
    console.log(`${this.accountNumber}, ${this.owner}, ${this.balance}`);
  },

  //desposit
  //withdraw
  //getStatement
};

smartBankAccount.print();


// Object Methods

const user = {
  name: "Alex Thompson",
  email: "alex@email.com",
  age: 28,
  skills: ["JavaScript", "React", "Node.js"],
};

// Object methods are off of an object called Object not chained
// off of your object

// extract all of the keys
const keys = Object.keys(user);
console.log(keys);

// extract all of the values
const values = Object.values(user);
console.log(values);

// get both keys/values
const entries = Object.entries(user);
console.log(entries);

console.log(entries[0][0]); //name key
console.log(entries[0][1]); //name value

// - **Missing `this` keyword:** `balance += amount` instead of `this.balance += amount` in methods
// - **Arrow functions in methods:** `deposit: (amount) => { this.balance += amount }` - `this` doesn't work!

// create a car object that is reusable

// this is a blueprint for making objects
function Car(make, model, year, color) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.color = color;

  this.start = function () {
    console.log(`you started your ${this.model}`);
  };
}

const honda = new Car("Honda", "Accord", 2025, "Orange")
const ford = new Car("Ford", "Mustang", 2010, "Red")

console.log(honda)
console.log(ford)

let cars = [honda, ford]

// perform the same action on the car list
for (const car of cars){
  car.start();
}


// Object Oriented Programming
// Classes 