// mini-tests

// using console.log() to give us expectations we can see

function add(x, y) {
  return x - y; // i made a mistake used the wrong operator
}

// make a guess as to what will happen prior to running the code

console.log("I expect 4 and 5 to equal 9: I got:", add(4, 5));

// an alternative

console.log(`I expect 4 and 5 to equal [9 : ${add(4, 5)}] was result`);
