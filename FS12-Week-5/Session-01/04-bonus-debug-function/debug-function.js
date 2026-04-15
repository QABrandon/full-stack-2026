function add(x, y) {
  let total = x + y;
  return total;
}

add; // point to the function in memory
let sum = add(15, 20); // executes our function
console.log(sum);
