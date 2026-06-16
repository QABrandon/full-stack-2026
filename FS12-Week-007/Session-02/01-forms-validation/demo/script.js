// Prevent Default allows us to override what we say in - demo-starter

// How do we select the form
const jobApplicationForm = document.querySelector("#job-application");

// we need to attach an event listener to the form to override its
// default submission action

jobApplicationForm.addEventListener("submit", function (event) {
  //Prevent the tradition form submission / page refresh
  event.preventDefault();

  /*
    Typically here you would take all of the form data
    and send it off in an API request to a server
    and that data would then be stored for later retrieval in a database
    we will learn how to do this soon
  */

  console.log("currentTarget", event.currentTarget);

  // the form "currentTarget" has an elements object on it

  console.log("form elements", event.currentTarget.elements);

  // lets log out the experience input

  console.log("experience input", event.currentTarget.elements.experience);

  // to make it a little easier while we code we can collapse the . chaining down
  // into a single
  const formElements = event.currentTarget.elements;
  const experienceInput = formElements.experience;

  console.log("experience input value", experienceInput.value);

  // Practice - 1 - Get the value from the "position" option/drop down

  // Practice - 2 - Get the value from the "availability" checkbox

  if (!hasValidExperience(experienceInput.value)) {
    alert("Your experience is invalid but thanks for applying");
  } else {
    alert("From Submitted");
  }
});

// Validation

function hasValidExperience(text){
    // does this have a particular value in it?
    if (text.toLowerCase().includes("windows")) {
        return false;
    }
    return true;
}

// https://developer.mozilla.org/en-US/docs/Web/API/FormData