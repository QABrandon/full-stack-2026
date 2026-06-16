import './App.css'
import ExampleComponent from './ExampleComponent'
function App() {

  return (
    <>
      {/* we are essentially calling ExampleComponent like this
      this is JavaScript code
        ExampleComponent({
            title: "My Amazing Adventure",
            weather: "great"
       })    

    */}
      {/* This is how you do it in JSX */}
      <ExampleComponent title={"My Amazing Adventure"} weather={"great"} />

      <ExampleComponent title={"My Not So Great day"} weather={"raining"} />
    </>
  );
}

export default App
