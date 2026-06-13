// -------------------------------------------------------
// PART 0: Three Stages of Object Creation in JavaScript
// -------------------------------------------------------

// --- STAGE 1: Constructor Function (method inside the body) ---
// This is what we used before. It works, but has a problem.

function CarV1(make, model, year, color) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.color = color;

  // Problem: this function is re-created fresh on every single instance.
  // honda.start and ford.start are two separate copies of the same function.
  this.start = function () {
    console.log("You started your " + this.model);
  };
}

const honda = new CarV1("Honda", "Accord", 2025, "Orange");
const ford = new CarV1("Ford", "Mustang", 2010, "Red");

console.log("--- Stage 1: Constructor Function (method inside body) ---");
honda.start(); // You started your Accord
ford.start(); // You started your Mustang

// Prove they are two separate copies of the function
console.log(honda.start === ford.start); // false - two separate functions in memory

// --- STAGE 2: Constructor Function + Prototype ---
// The fix: move the method onto Car.prototype.
// Now all instances share ONE copy of the function instead of each having their own.

function CarV2(make, model, year, color) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.color = color;
}

// Defined once on the prototype - every instance looks here for the method
CarV2.prototype.start = function () {
  console.log("You started your " + this.model);
};

CarV2.prototype.describe = function () {
  console.log(
    this.year + " " + this.color + " " + this.make + " " + this.model,
  );
};

const honda2 = new CarV2("Honda", "Accord", 2025, "Orange");
const ford2 = new CarV2("Ford", "Mustang", 2010, "Red");

console.log("\n--- Stage 2: Constructor Function + Prototype ---");
honda2.start(); // You started your Accord
ford2.start(); // You started your Mustang
honda2.describe(); // 2025 Orange Honda Accord

// Now they share the same function - problem solved
console.log(honda2.start === ford2.start); // true - one shared function

// instead of 3 different sections of code -> Classes to have one combined definition of our object

// Classes are syntactic sugar on top of v2 - prototypical inheritance

class Car {
  // constructor
  constructor(make, model, year, color) {
    this.make = make;
    this.year = year;
    this.model = model;
    this.color = color;
  }

  // JavaScript automatically places this on Car.prototype behind the scenes
  start() {
    console.log("You started your " + this.model);
  }

  describe() {
    console.log(
      this.year + " " + this.color + " " + this.make + " " + this.model,
    );
  }
}

// instead of

// function CarV2(make, model, year, color) {
//   this.make = make;
//   this.model = model;
//   this.year = year;
//   this.color = color;
// }

// // Defined once on the prototype - every instance looks here for the method
// CarV2.prototype.start = function () {
//   console.log("You started your " + this.model);
// };

// CarV2.prototype.describe = function () {
//   console.log(
//     this.year + " " + this.color + " " + this.make + " " + this.model,
//   );
// };

// in order to build an object with Classes or a specific class

// new Keyword
// Car(param1, param2, param2, param4) <- this points to our constructor
const honda3 = new Car("Honda", "Accord", 2025, "Orange");
const ford3 = new Car("Ford", "Mustang", 2010, "Red");

// this has been "REAL FUN" <heavy sarcasm>
// couldn't I just do this with an object literal with a function on it?
// const ford3 = {
// make: "Ford",
// year: 2010,
// model: "Mustang",
// color: "Red"
//}

// What if I miss one of the properties?
// What if I mispell one of the keys?

// What if you are trying to go through a list and print out all of the colors for 1000 cars and
// you forgot that property on half of them

// -------------------------------------------------------
// PART 1: Basic Class Syntax
// -------------------------------------------------------

// A class is a blueprint for creating objects.
// Every time you call new Character(), you get a brand new object
// built from this blueprint.

class Character {
  // The constructor runs automatically when you write: new Character(...)
  // Its job is to receive arguments and store them on the new instance
  constructor(name, health) {
    this.name = name; // 'this' refers to the specific object being created
    this.health = health;
  }

  // Methods go here, at the class level - NOT inside the constructor
  greet() {
    console.log("I am " + this.name + " with " + this.health + " HP");
  }

  isAlive() {
    return this.health > 0;
  }

  takeDamage(amount) {
    this.health = this.health - amount;
    console.log(
      this.name + " took " + amount + " damage. HP remaining: " + this.health,
    );
  }

  getStatus() {
    let condition = this.isAlive() ? "alive" : "defeated";
    return this.name + " is " + condition + " (" + this.health + " HP)";
  }

  describe() {
    return this.name + " - HP: " + this.health;
  }
}

// Create instances using the new keyword
const hero = new Character("Alice", 100);
const villain = new Character("Morgana", 120);

console.log("--- Part 1: Basic Class ---");
hero.greet(); // I am Alice with 100 HP
villain.greet(); // I am Morgana with 120 HP

// Each instance has its own copy of the data
console.log(hero.name); // "Alice"
console.log(villain.name); // "Morgana"

hero.takeDamage(30);
console.log(hero.getStatus()); // Alice is alive (70 HP)
console.log(villain.getStatus()); // Morgana is alive (120 HP) - unchanged

// -------------------------------------------------------
// PART 2: Child Class with extends and super
// -------------------------------------------------------

// A child class inherits everything from the parent class.
// Use 'extends' to set the parent.
// Use 'super()' inside the constructor to call the parent's constructor.

class Warrior extends Character {
  constructor(name, health, weaponType) {
    // super() MUST be called before using 'this' in a child constructor
    // It runs the Character constructor to set up this.name and this.health
    super(name, health); // equivalent to Character(name, health)

    // Now we can add Warrior-specific properties
    this.weaponType = weaponType;
    this.armor = 25;
  }

  // Method unique to Warrior - parent class does not have this
  shieldBlock() {
    console.log(
      this.name + " raised their shield and blocked " + this.armor + " damage!",
    );
  }

  heavyAttack(targetName) {
    var damage = 40;
    console.log(
      this.name +
        " swings " +
        this.weaponType +
        " at " +
        targetName +
        " for " +
        damage +
        " damage!",
    );
  }
}

class Mage extends Character {
  constructor(name, health, spellPower) {
    super(name, health);
    this.spellPower = spellPower;
    this.mana = 100;
  }

  castSpell(targetName) {
    if (this.mana < 20) {
      console.log(this.name + " does not have enough mana!");
      return;
    }
    this.mana = this.mana - 20;
    console.log(
      this.name +
        " blasts " +
        targetName +
        " for " +
        this.spellPower +
        " magic damage! Mana left: " +
        this.mana,
    );
  }
}

console.log("\n--- Part 2: Child Classes ---");

const thor = new Warrior("Thor", 150, "waraxe");
const merlin = new Mage("Merlin", 80, 75);

// Inherited methods work on child instances
thor.greet();         // I am Thor with 150 HP
thor.takeDamage(40);  // Thor took 40 damage. HP remaining: 110

// Child-specific methods
thor.shieldBlock();           // Thor raised their shield...
thor.heavyAttack("Morgana");  // Thor swings war axe at Morgana for 40 damage!

merlin.greet();               // I am Merlin with 80 HP
merlin.castSpell("Morgana");  // Merlin blasts Morgana for 75 magic damage!
merlin.castSpell("Morgana");  // Merlin blasts Morgana for 75 magic damage!

// Child-specific properties
console.log(thor.weaponType); // "war axe"
console.log(thor.armor);      // 25
console.log(merlin.mana);     // 60 (after two casts)



// -------------------------------------------------------
// PART 3: Method Overriding and super.methodName()
// -------------------------------------------------------

// A child class can override a parent method by defining
// a method with the same name.
// To reuse the parent's version, call super.methodName()

class Paladin extends Character {
  constructor(name, health, holyPower) {
    super(name, health);
    this.holyPower = holyPower;
  }

  // Override the parent's describe() method
  describe() {
    // Call the parent version first to get the base description
    var baseInfo = super.describe(); // "Paladin - HP: 120"
    // Then add Paladin-specific info
    return baseInfo + " | Holy Power: " + this.holyPower;
  }

  // Override greet() completely without calling super
  greet() {
    console.log("For the light! I am " + this.name + "!");
  }
}

console.log("\n--- Part 3: Method Overriding ---");

const paladin = new Paladin("Uther", 120, 90);

paladin.greet();              // For the light! I am Uther!
console.log(paladin.describe()); // Uther - HP: 120 | Holy Power: 90

// The parent Character still has its original describe()
const basicCharacter = new Character("Grunt", 50);
console.log(basicCharacter.describe()); // Grunt - HP: 50


// -------------------------------------------------------
// PART 4: Static Methods
// -------------------------------------------------------

// A static method belongs to the CLASS itself, not to any instance.
// You call it on the class name: Character.getInfo()
// You CANNOT call it on an instance: hero.getInfo() - TypeError

class CharacterWithStatic extends Character {
  constructor(name, health, role) {
    super(name, health);
    this.role = role;
  }

  // Static method - called as CharacterWithStatic.getAvailableRoles()
  static getAvailableRoles() {
    return ["Warrior", "Mage", "Paladin", "Rogue", "Archer"];
  }

  // Static method to validate character creation input
  static isValidHealth(healthValue) {
    return healthValue > 0 && healthValue <= 999;
  }
}

console.log("\n--- Part 4: Static Methods ---");

// Call static methods on the CLASS NAME - not on an instance
console.log(CharacterWithStatic.getAvailableRoles());
// ["Warrior", "Mage", "Paladin", "Rogue", "Archer"]

console.log(CharacterWithStatic.isValidHealth(100)); // true
console.log(CharacterWithStatic.isValidHealth(-5));  // false
console.log(CharacterWithStatic.isValidHealth(1000)); // false

// Instances inherit normal methods but NOT static methods
const rogue = new CharacterWithStatic("Shadow", 90, "Rogue");
rogue.greet(); // works - inherited instance method
// rogue.getAvailableRoles(); // TypeError - static methods are on the class, not the instance