import HelloWorld from "./HelloWorld";

function App(){
 return (
   <div>
     <HelloWorld name="Alice" />
     <HelloWorld name="Bob" />

     {/* this is a comment in JSX */}
     {/* dont forget to use emmet to help you 
       for example if I type p.read-the-docs tab
       i will get
     */}
     <p className="read-the-docs"></p>
   </div>
 );ß
}

export default App;