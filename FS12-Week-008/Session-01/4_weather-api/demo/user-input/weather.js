// fetch

// function in JS browser

// this grabs the
/* <form>
      <input type="text" name="city" id="city" />
      <button type="submit">Get Weather</button>
</form> */
// from the dom
const form = document.querySelector("form");

//we add an event listener to the submit
form.addEventListener("submit", (event) => {
  //grab the value from the form
  //call our function

  //prevent default
  event.preventDefault();
  console.log("event object", event);

  const city = event.currentTarget.elements.city.value;

  getCityWeather(city);
});

function getCityWeather(city) {
  // Updated to wttr.in with ?format=j1 for a compatible JSON response
  const url = "https://wttr.in/" + city + "?format=j1";

  fetch(url)
    // wait for the reponse to come back
    .then((response) => response.json())
    // and convert the json to a javascript object
    .then((data) => {
      const h1 = document.createElement("h1");
      // Updated the path to match the new API structure
      h1.textContent = data.current_condition[0].weatherDesc[0].value;
      document.body.appendChild(h1);
    });
}
