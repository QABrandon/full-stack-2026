// ============================================
// DOT CHAINING PRACTICE
// ============================================
// The big idea: when you access a property or call a method,
// the result REPLACES that expression. You can then chain
// another dot onto that result.

// ============================================
// PART 1: Object Dot Chaining
// ============================================

const student = {
  name: "Alice",
  gpa: 3.8,
  school: {
    name: "NYU",
    city: "New York",
  },
};

// LONGHAND — two steps:
// const school = student.school;   // returns the school object
// const city = school.city;        // returns "New York"

// TODO 1: Access student.school.city in ONE line using dot chaining
// Store it in a variable called `city` and log it (should print "New York")

// ============================================
// PART 2: Array Method Chaining
// ============================================

const menu = ["ramen", "tacos", "bibimbap", "sushi", "pad thai", "burger"];

// LONGHAND — two steps:
// Step 1: filter returns a NEW array      → ["ramen", "tacos", "sushi", "burger"]
// Step 2: map returns ANOTHER new array   → ["RAMEN", "TACOS", "SUSHI", "BURGER"]

// const quickBites = menu.filter((item) => item.length <= 6);
// const shoutMenu = quickBites.map((item) => item.toUpperCase());

// TODO 2: Combine the filter and map above into ONE chained line
// Store the result in `shoutMenu` and log it

// ============================================
// PART 3: The Return Type Changes!
// ============================================
// This is the tricky part — each dot gives you a DIFFERENT type.
// You can only use methods that belong to THAT type.

const playlist = ["Blinding Lights", "Levitating", "Stay", "Bad Guy"];

// LONGHAND — notice the types change at each step:
// const song = playlist.find((s) => s.includes("Light"));  // song is a STRING
// const lower = song.toLowerCase();                        // lower is a STRING

// TODO 3: Chain .find() and .toLowerCase() in ONE line
// Find the first song with "Light" in it, then lowercase it
// Store in `result` and log it (should print "blinding lights")

// ============================================
// PART 4: Reading Chained Code
// ============================================
// When you see a chain, read it LEFT to RIGHT and ask:
// "What does this part return? What type is it?"

const prices = [4.5, 12, 8, 25, 3];

// TODO 4: What does this print? Write your answer in a comment, then uncomment to check.
// Hint: break it down step by step
//   prices.filter(...)   → returns an array of prices under 10
//   .map(...)            → returns an array of strings
//   .join(" | ")         → returns a single string

// console.log(prices.filter((p) => p < 10).map((p) => "$" + p).join(" | "));
// Answer:

// ============================================
// PART 5: Write Your Own Chain
// ============================================

const courses = [
  "Intro to CS",
  "Calculus",
  "Data Structures",
  "Art",
  "Algorithms",
];

// TODO 5: In ONE chained line:
//   1. Filter to courses longer than 5 characters
//   2. Map each course to uppercase
//   3. Join them with " + "
// Expected: "INTRO TO CS + CALCULUS + DATA STRUCTURES + ALGORITHMS"
