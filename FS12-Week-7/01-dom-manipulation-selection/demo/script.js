//test that we have script.js connect correctly
console.log("Hello World")

// Lets change the H!
// "Welcome to My Website"


// Baby steps with Dom manipulation
// step 1 - open chrome dev tools console
// step 2 - document.querySelector("h1")
// step 3 - apply it to a variable and then put the variable into the console
//          const h1Element = document.querySelector("h1");
//          h1Element 
//          you will see the h1 selected in the viewport
// step 4 - copy that one line for the variable to your script.js
// step 5-  test this line h1Element.textContent = "It's Alive!!!!";
// step 6 - if change worked copy line back to script.js
const h1Element = document.querySelector("h1");
h1Element.textContent = "It's Alive!!!!";

// Element, NodeList, HTMLCollection

// NodeLists are returned from querySelectorAll
// Array.from(NodeList) - to use map, filter, etc
const h2NodeList = document.querySelectorAll("h2");
const h2Array = Array.from(h2NodeList);
h2Array[0].textContent = "I Updated the index 0 text content";

// InnerHtml property - to update the internals (content) of an element
const aside = document.querySelector("aside");
aside.innerHTML = "<h2>Did this work?</h2>";

// create an element that isn't attached in the dom
const divElement = document.createElement("div");
divElement.textContent = "this is our div";

// how do we attach this to something?
//appendChild  - prepend

aside.prepend(divElement)

// insertBefore(2 params)
// removeChild()
// remove()

//setAttribute / getAttribute - https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
//manipulating a class list - https://developer.mozilla.org/en-US/docs/Web/API/Element/classList\
//classList.toggle()
// modifying styles

// create elements using template literals
// shorthand way of setting up your elements
const name = "Sally";
const title = "CEO";

const container = document.createElement("div");
container.innerHTML = `
    <h2 class="Name">${name}</h2>
    <h3 id="title">${title}</h3>
`;

document.body.appendChild(container)