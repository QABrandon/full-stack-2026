// fetch

// function in JS browser

const url = "https://wttr.in/Berlin?format=j1";

fetch(url) // by default this does a GET Method on the url
  // wait for the response to come back (async)
  .then((response) => response.json())
  // and convert the json to a javascript object
  .then((data) => {
    // data is the object from the response body we got
    console.log("break");
    console.log("response body now js object", data);

    // how can I access temperature and log it out?
    // Accessing current_condition -> first object -> temp_C
    console.log("temperature", data.current_condition[0].temp_C + "°C");

    // how do I access the 2nd item on forecast and then grab the wind value?
    // Accessing weather (forecast) -> index 1 (day 2) -> avgwindspeedKmph
    console.log(
      "2nd forecast wind value",
      data.weather[1].avgwindspeedKmph + " km/h",
    );

    // how do we display the berlin data on the page?
    const h1 = document.createElement("h1");
    h1.textContent = data.current_condition[0].weatherDesc[0].value;
    document.body.appendChild(h1);
  });

// It essentially works like this (Updated for wttr.in JSON structure)

// const url = "https://wttr.in/Berlin?format=j1";
// const response = fetch(url)

// fetch (url) -> doing what our browser does
// go to https://wttr.in/Berlin?format=j1
// this returns JSON:
// {
//   "current_condition": [
//     {
//       "temp_C": "12",
//       "weatherDesc": [
//         { "value": "Partly cloudy" }
//       ]
//     }
//   ],
//   "weather": [
//     {
//       "date": "2026-05-05",
//       "avgwindspeedKmph": "10"
//     },
//     {
//       "date": "2026-05-06",
//       "avgwindspeedKmph": "15"
//     },
//     {
//       "date": "2026-05-07",
//       "avgwindspeedKmph": "12"
//     }
//   ]
// }

// const data = response.json()
