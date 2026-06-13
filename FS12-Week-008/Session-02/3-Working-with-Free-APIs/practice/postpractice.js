console.log("It's Allive");

async function addNewPost() {
  //POST https://jsonplaceholder.typicode.com/posts add a new post
  // put the url in a variable
  const url = "https://jsonplaceholder.typicode.com/posts";

  // try

  try {
    // fetch the data
    //await to wait for the data to come back
    const response = await fetch(url, {
      method: "POST",
      //with the body (reference from postman)
      body: JSON.stringify({
        title: "foo",
        body: "bar",
        userId: 1,
      }),
    });

    console.log("Response Object", response);
    //await to wait for the data to come back
    // convert it from json to an object
    const data = await response.json();

    // log out the data
    console.log("body", data);
    console.log("id", data.id);

    // call another function with response data
    // example(data);
  } catch (error) {
    console.error("addNewPost threw", error);
  } finally {
    console.log("done with try and catch");
  }
}

//call addNewPost
// doesn't need await here
//addNewPost();

async function main() {
  await addNewPost();
  console.log("done makinge new post call");
}

main();
