// the => eht
// add => dda

function reverse(str) {
  //create the output variable
  let result = "";
  // loop through the input string starting at the end
  for (let i = str.length - 1; i >= 0; i--) {
    // add character to result
    result += str[i];
  }
  // return the output
  return result;
}

console.log("the => ", reverse("the"));
console.log("add => ", reverse("add"));
