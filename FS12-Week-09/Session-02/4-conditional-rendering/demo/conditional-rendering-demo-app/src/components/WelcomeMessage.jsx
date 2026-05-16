import { useState } from "react";

export default function WelcomeMessage() {
  // setup user Logged in state
  // usually this is not going to be hard coded

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {/* If both true, render out the welcome back */}
      {!isLoggedIn && <h1>Please Log In</h1>}
      {isLoggedIn && <h1>Welcome back!</h1>}
      {/* the above is kind of like the following */}
      {/* if isLoggedIn is true then run displayWelcomeMessage() */}
      {/* isLoggedIn <-- if that is true then && will run whatever is immediately to the right of it */}
      {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND */}

      {/*  another way to think about it is  */}
      {/* if isLoggedIn is true then just inject the jsx below*/}
      {/* <h1>Welcome back!</h1> */}

      {/* the short had of this below  */}
      {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please Log In</h1>}
      {/* https://react.dev/learn/conditional-rendering */}

      {/* add an onclick to flip the value and see the changes */}
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? "Log Out" : "Log In"}
      </button>
    </div>
  );
}
