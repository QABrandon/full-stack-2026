import "./App.css";
import ProductCard from "./ProductCard";
import WelcomeMessage from "./WelcomeMessage";
import WelcomeMessageTwo from "./WelcomeMessageTwo";

function App() {
  return (
    <>
      <WelcomeMessage />

      <WelcomeMessageTwo user="Bob" />

      <ProductCard
        title="Laptop"
        price={999}
        image="/laptop.jpg"
        isOnSale={true}
      />
      <ProductCard
        title="Mouse"
        price={25}
        image="/mouse.jpg"
        isOnSale={false}
      />
    </>
  );
}

export default App;
