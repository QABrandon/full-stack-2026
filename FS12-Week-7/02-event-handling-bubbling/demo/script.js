console.log("hello world");

// Click EVENT START of Code

// goal
// alert the user with a "hello"
// when they click on the hello button

// select the hello button
const helloBtn = document.querySelector("#hello");

// addEventListener - needs the type of event and the
// callback function

function handleHelloClick(event) {
  console.log("Hello handler was called");
  console.log("event", event);
  alert("Hey, how are you doing?!?!?");
}

helloBtn.addEventListener("click", handleHelloClick)