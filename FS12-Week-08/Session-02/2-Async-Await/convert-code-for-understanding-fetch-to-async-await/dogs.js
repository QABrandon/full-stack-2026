// endpoints on APIS

// Go weather

const url = "https://dogapi.dog/api/v1/facts?number=1";

// common errors
// go to a resource that doesn't exist

// gives us back a 404 - not found
const typoUrl = "https://dogapi.dog/api/v1/facts?number=1";

// fetch(url) // does a GET request
//   // wait for the reponse to come back
//   .then((response) => {
//     // check just the clientside responses
//     if (response.status >= 400 && response.status < 500) {
//       const errorMessage = handleClientErrors(response);
//       // throw key word that throws an error programatically
//       throw new Error(errorMessage);
//     }

//     return response.json();
//   })
//   .then((data) => {
//     console.log("break");

//     const h1 = document.createElement("h1");
//     h1.textContent = data.facts[0];
//     document.body.appendChild(h1);

//     // how can you add the temperature to the
//     // dom and the page?
//   })
//   .catch((error) => {
//     console.log("caught error", error);
//     document.querySelector("#user-error").innerHTML = `
//       <div class="error-message">
//         <h3>Oops! ${error.message}</h3>
//       </div>
//     `;
//   });


// 1. create a function called fetchData
// 2. set it up async with the async keyword
// 3. go line by line through the fetch example above and convert the .then syntax to async await
// 4. use /Users/codecademy/git/FS12-Bootcamp-Cohort/FS12-Week-8/Session-02/2-Async-Await/promise-chain-vs-async-await.js as your guide
// 5. once the function is filled, you can call it like so
// fetchData() <--- when we are at the root of files, we don't put await in front of them

// later on when we get to modules in react/node you would call this with "await fetchData()"

function handleClientErrors(response) {
  switch (response.status) {
    case 400:
      return "Bad Request - Check your data format";
    case 401:
      return "Unauthorized - You need to log in first";
    case 403:
      return "Forbidden - You don't have permission for this";
    case 404:
      return "Not Found - This item doesn't exist";
    case 422:
      return "Invalid Data - Check your input fields";
    default:
      return `Client Error ${response.status} - Check your request`;
  }
}
