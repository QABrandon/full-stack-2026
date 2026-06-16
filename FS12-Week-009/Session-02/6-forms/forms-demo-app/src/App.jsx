import { useState } from "react";
import "./App.css";
import SignUpForm from "./components/SignUpForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <SignUpForm />
    </>
  );
}

export default App;
