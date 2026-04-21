// ============================================
// DOT CHAINING PRACTICE — COMPLETED
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
const city = student.school.city;
console.log(city); // "New York"

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
const shoutMenu = menu
  .filter((item) => item.length <= 6)
  .map((item) => item.toUpperCase());
console.log(shoutMenu); // ["RAMEN", "TACOS", "SUSHI", "BURGER"]

// ============================================
// PART 3: The Return Type Changes!
// ============================================

const playlist = ["Blinding Lights", "Levitating", "Stay", "Bad Guy"];

// LONGHAND — notice the types change at each step:
// const song = playlist.find((s) => s.includes("Light"));  // song is a STRING
// const lower = song.toLowerCase();                        // lower is a STRING

// TODO 3: Chain .find() and .toLowerCase() in ONE line
const result = playlist.find((s) => s.includes("Light")).toLowerCase();
console.log(result); // "blinding lights"

// ============================================
// PART 4: Reading Chained Code
// ============================================

const prices = [4.5, 12, 8, 25, 3];

// TODO 4: What does this print?
console.log(
  prices
    .filter((p) => p < 10)
    .map((p) => "$" + p)
    .join(" | "),
);
// Answer: "$4.5 | $8 | $3"
//   prices.filter((p) => p < 10)  → [4.5, 8, 3]              (array)
//   .map((p) => "$" + p)          → ["$4.5", "$8", "$3"]      (array)
//   .join(" | ")                  → "$4.5 | $8 | $3"          (string)

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

// TODO 5: Filter > 5 chars, uppercase, join with " + "
const schedule = courses
  .filter((c) => c.length > 5)
  .map((c) => c.toUpperCase())
  .join(" + ");
console.log(schedule); // "INTRO TO CS + CALCULUS + DATA STRUCTURES + ALGORITHMS"
