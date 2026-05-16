// non functional example of chaining

function fetchUserData() {
  fetch("http://randomapi.com/api/user/123") //1
    .then((response) => response.json()) //2
    .then((user) => {
      return fetch(`http://randomapi.com//api/posts/${user.id}`); //3
    })
    .then((response) => response.json()) //4
    .then((posts) => {
      console.log("User posts:", posts); //5
    })
    .catch((error) => {
      // error handling
      //6
      console.error("Error:", error);
    });
}

// async await - syntactic sugar - (replaces .then .catch .finally)

// other syntactic sugar
// functions vs arrow function
// i = i + 1 -> i++

async function fetchUserData() {
  //try catch is the error handling mechanism
  // we wrap try/catch around any i/o operations
  try {
    const response = await fetch("http://randomapi.com/api/user/123"); //1
    const user = await response.json(); //2
    const postsResponse = await fetch(
      `http://randomapi.com//api/posts/${user.id}`,
    ); //3
    const post = await postsResponse.json(); //4
    console.log("User posts:", posts); //5
  } catch (error) {
    //6
    console.error("Error:", error);
  }
}
