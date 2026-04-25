// Module 33d: ES6 Classes and Inheritance - Guided Practice
// Animal Shelter Registry
//
// Build a class system to track animals at a shelter.
// Work through each step in order - each one builds on the last.

// -------------------------------------------------------
// STEP 1: Build the Base Class
// -------------------------------------------------------

// TODO: Create a class called Animal
// The constructor should accept three parameters: name, species, age
// Store each parameter on the instance using this
// Add a method called describe() that logs:
// "Name: [name] | Species: [species] | Age: [age]"

// Your class here:

class Animal {
  constructor(name, species, age) {
    this.name = name;
    this.species = species;
    this.age = age;
  }

  describe() {
    console.log(
      `Name: ${this.name} | Species: ${this.species} | Age: ${this.age}`,
    );
  }
}

// Test Step 1 (uncomment when ready):
 const cat = new Animal("Whiskers", "Cat", 3);
 cat.describe(); // Name: Whiskers | Species: Cat | Age: 3

// -------------------------------------------------------
// STEP 2: Add Behavior Methods
// -------------------------------------------------------

// TODO: Add these two methods to your Animal class:
//
// makeSound(sound)
//   - logs: "[name] says: [sound]"
//
// birthday()
//   - increases this.age by 1
//   - logs: "Happy birthday [name]! Now [age] years old."

// Add the methods to your Animal class above, then test:

// Test Step 2 (uncomment when ready):
// cat.makeSound("Meow"); // Whiskers says: Meow
// cat.birthday();        // Happy birthday Whiskers! Now 4 years old.
// cat.describe();        // Name: Whiskers | Species: Cat | Age: 4

// -------------------------------------------------------
// STEP 3: Create a Child Class
// -------------------------------------------------------

// TODO: Create a class called Dog that extends Animal
// The constructor should accept: name, age, breed
// Call super() with the correct arguments (name, species, age)
//   - use "Dog" as the species string since all Dogs are dogs
// Store breed on the instance using this
//
// Add a method called fetch(item) that logs:
// "[name] fetches the [item] and brings it back!"

// Your Dog class here:

// Test Step 3 (uncomment when ready):
// const rex = new Dog("Rex", 2, "Labrador");
// rex.describe();        // Name: Rex | Species: Dog | Age: 2
// rex.makeSound("Woof"); // Rex says: Woof  (inherited from Animal)
// rex.fetch("ball");     // Rex fetches the ball and brings it back!
// console.log(rex.breed); // "Labrador"

// -------------------------------------------------------
// STEP 4: Override describe() in Dog
// -------------------------------------------------------

// TODO: In your Dog class, override the describe() method
// It should call super.describe() to print the base Animal info,
// then also log: "Breed: [breed]"

// Update your Dog class above with the overridden method, then test:

// Test Step 4 (uncomment when ready):
// rex.describe();
// Expected output (two lines):
// Name: Rex | Species: Dog | Age: 2
// Breed: Labrador

// -------------------------------------------------------
// STEP 5: Add a Static Method
// -------------------------------------------------------

// TODO: Add a static method called adoptionFee() to the Animal class
// It should return the number 150
// Remember: static methods are called on the CLASS NAME, not on an instance

// Add the static method to your Animal class above, then test:

// Test Step 5 (uncomment when ready):
// console.log(Animal.adoptionFee()); // 150
// console.log("Adoption fee: $" + Animal.adoptionFee()); // Adoption fee: $150

// This should NOT work (it is on the class, not the instance):
// console.log(cat.adoptionFee()); // TypeError: cat.adoptionFee is not a function

// -------------------------------------------------------
// FINAL CHECK: Put it all together
// -------------------------------------------------------

// TODO: Create three animals: one Animal, one Dog, one more Dog
// Call at least 3 different methods on each
// Make sure everything works as expected

// Your test code here:
