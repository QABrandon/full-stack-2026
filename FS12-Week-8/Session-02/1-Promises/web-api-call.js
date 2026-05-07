const url = "https://goweather.xyz/weather/Berlin";

// Once anything in your code chain is async

// The rest of your code has to be treated as async

// lines 10 to 39 is our API call - see line 41 for attempting to do something after

fetch(url) // by default this does a GET Method on the url
  // wait for the response to come back (async)
  .then((response) => response.json())
  // and convert the json to a javascript object
  .then((data) => {
    // data is the object from the response body we got
    // go to Inspect > Network tab > Filter by All
    // we can can see the data from https://goweather.xyz/weather/Berlin
    // go on the response tab to see the JSON response
    // this then becomes the data object
    console.log("break");
    // going to Dev Tools > Sources > weather.js
    // > click to add breakpoint to left of line 17
    // > refresh
    console.log("response body now js object", data);

    // how can I access temperature and log it out?
    console.log("temperature", data.temperature);

    // how do I access the 2nd item on forecast and then grab the wind value?
    // hint: use the breakpoint and play with data in the console to get the syntax

    console.log("2nd forecast wind value", data.forecast[1].wind);

    // how do we display the berlin data on the page?

    const h1 = document.createElement("h1");
    h1.textContent = data.description;
    document.body.appendChild(h1);
  });

console.log("Fetch is done"); // this doesn't work - JS didn't wait for you

// so the right way to do it is to .chain off of
/*
...
  const h1 = document.createElement("h1");
    h1.textContent = data.description;
    document.body.appendChild(h1);
  }).then(r => console.log("Now its really done"));
*/
