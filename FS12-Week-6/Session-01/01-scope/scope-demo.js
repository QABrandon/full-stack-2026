// Global Scope

let companyName = "Codecademy"

// example of using global scope
function printName(){
    console.log(companyName);
}

printName();


//Function scope

function doStuff(){
    let functionScoped = "this is not available outside of the function"
}

// what will happen if I try to console.log out functionScoped

// can't access outside of function
// console.log(functionScoped)
// throws ReferenceError: functionScoped is not defined

// Block

// this is a weird example but it also happens in
// if
// for
// switch
// else
//

{
  let blockScoped = "only in the curly braces";
}

// can't access outside of those curly braces
//console.log(blockScoped)
// throws ReferenceError: blockScoped is not defined

if (true) {
  let blockScopedIf = "scoped to if";
  let newString = blockScopedIf + "!";
}

//console.log(blockScopedIf) // not defined error again


let globalScope = 5;
{
   let blockScope2 = 20;
   {
    let nestedBlockScope = 100;
    // can I access blockScope2 here?
    blockScope2
   }
}

// can I access nestedBlockScope here?