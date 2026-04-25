// Module 33d: ES6 Classes and Inheritance - Guided Practice (Complete Version)
// Animal Shelter Registry


// -------------------------------------------------------
// STEP 1 + 2 + 5: Base Animal Class
// (Steps combined here since methods are added to the same class)
// -------------------------------------------------------

class Animal {
  constructor(name, species, age) {
    this.name = name;
    this.species = species;
    this.age = age;
  }

  // Step 2: behavior method
  describe() {
    console.log("Name: " + this.name + " | Species: " + this.species + " | Age: " + this.age);
  }

  // Step 2: behavior method
  makeSound(sound) {
    console.log(this.name + " says: " + sound);
  }

  // Step 2: behavior method
  birthday() {
    this.age = this.age + 1;
    console.log("Happy birthday " + this.name + "! Now " + this.age + " years old.");
  }

  // Step 5: static method - belongs to the Animal class, not to any instance
  static adoptionFee() {
    return 150;
  }
}


// -------------------------------------------------------
// STEP 3 + 4: Dog Child Class
// -------------------------------------------------------

class Dog extends Animal {
  constructor(name, age, breed) {
    // super() calls the Animal constructor
    // We pass "Dog" as the species since all Dogs are dogs
    super(name, "Dog", age);
    this.breed = breed;
  }

  // Step 3: Dog-specific method
  fetch(item) {
    console.log(this.name + " fetches the " + item + " and brings it back!");
  }

  // Step 4: Override describe() to include breed info
  describe() {
    super.describe(); // prints the base Animal line
    console.log("Breed: " + this.breed); // adds the Dog-specific line
  }
}


// -------------------------------------------------------
// Tests
// -------------------------------------------------------

console.log("--- Animal ---");
const cat = new Animal("Whiskers", "Cat", 3);
cat.describe();        // Name: Whiskers | Species: Cat | Age: 3
cat.makeSound("Meow"); // Whiskers says: Meow
cat.birthday();        // Happy birthday Whiskers! Now 4 years old.
cat.describe();        // Name: Whiskers | Species: Cat | Age: 4

console.log("\n--- Dog ---");
const rex = new Dog("Rex", 2, "Labrador");
rex.describe();        // Name: Rex | Species: Dog | Age: 2
                       // Breed: Labrador
rex.makeSound("Woof"); // Rex says: Woof  (inherited from Animal)
rex.fetch("ball");     // Rex fetches the ball and brings it back!
rex.birthday();        // Happy birthday Rex! Now 3 years old.
console.log(rex.breed); // "Labrador"

console.log("\n--- Static Method ---");
console.log(Animal.adoptionFee()); // 150
console.log("Adoption fee: $" + Animal.adoptionFee()); // Adoption fee: $150
// cat.adoptionFee(); // TypeError: cat.adoptionFee is not a function


// -------------------------------------------------------
// Final Check: Three animals, multiple method calls
// -------------------------------------------------------

console.log("\n--- Final Check ---");

const rabbit = new Animal("Bun Bun", "Rabbit", 1);
const scout = new Dog("Scout", 5, "Border Collie");
const luna = new Dog("Luna", 3, "Husky");

rabbit.describe();
rabbit.makeSound("...");

scout.describe();
scout.fetch("frisbee");
scout.birthday();

luna.describe();
luna.makeSound("Awoooo");
luna.fetch("stick");

console.log("\nAll adoption fees are: $" + Animal.adoptionFee());
