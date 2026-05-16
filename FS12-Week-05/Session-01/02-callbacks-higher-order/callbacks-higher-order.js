// callback 1
function sayHello(name) {
  console.log(`Hello, ${name}`);
}

// callback 2
function sayGday(name) {
  console.log("G'day, " + name + "!");
}

// higher order function
function greetUser(name, callbackFunction){
    console.log("Processing Greeting");

    //determines when to call the callbackFunction is ran
    callbackFunction(name);

    console.log("greeting complete")
}


// as a developer when we use a function with a callback
// we can decide what the the function does (but there is a contract sometimes)
// but it might expect. sayHello to return a specific value

// one of these IS wrong

// Version A - is the wrong one
greetUser("Bob", sayHello())

// greetUser("Bob", sayHello())
// greetUser("Bob", undefined)

// functions without returns return back undefined

// Version B
greetUser("Bob", sayHello)


//greetUser("Bob", sayHello()); //don't execute your callback function
greetUser("Bob", sayHello);
greetUser("Alice", sayGday);