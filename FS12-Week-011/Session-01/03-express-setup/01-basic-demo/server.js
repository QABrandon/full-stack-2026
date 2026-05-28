// Basic express app

// bring in the express factory function
const express =  require("express");

// create the app object by running the express function
// hence its a factory that just builds us the object

const app = express();

// set up the port
const PORT = 3010;

// route
// app.verb("path/endpoint/route", callBackFunction)
// GET localhost:3010/hello
// app.get("/hello", callBackFunction)

// base url localhost:3010

// what was the home route in react router? "/"

app.get("/", (req, res) => {
  console.log("GET request received at /");
  //This is the response the user will get back when
  // visiting or using postman to do
  // GET on localhost:3010

  res.send(`
        <h1>Hello!</h1>
        <p>This is your first Express.js application.</p>
        <p>Server running on port ${PORT}</p>  
    `);
});


// Practice
// 1. add a second route with your own html


// 2. add a get route that returns json - optional
// find it here or in the coursework - https://expressjs.com/en/

// 3. implement something from the express examples - optional
// https://expressjs.com/en/5x/starter/examples/

//start the server
// this is where express will be looking to receive your
// http request
// endpoint + verb + other data

app.listen(PORT, () => {
  console.log("Hot reload working");
  console.log(`Express server running at http://localhost:${PORT}`);
  console.log(`Visit http://localhost:${PORT} to see the app`);
  console.log("Press Ctrl+C to stop the server");
});
