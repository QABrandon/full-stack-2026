// If you get the following:
// "Error: Cannot find module 'math-utils'"
// means the module doesn't exist (math-utils.js isn't there)
// or you have incorrect syntax for importing the file
// i.e (const mathUtils = require("math-utils"); will throw that error

const mathUtils = require("./math-utils")
//alternatively
//const { add, subtract } = require("./math-utils");

console.log(mathUtils.add(4,3))
