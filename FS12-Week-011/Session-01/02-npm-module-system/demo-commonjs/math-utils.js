function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

// CommonJS

// module.exports - exports not export - make sure to spell it correctly

module.exports = {
    add, // don't execute the function (i.e. add()) - NAN
    subtract
}