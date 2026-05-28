import "./App.css";
import StaticProductList from "./components/StaticProductList";
import ProductList from "./components/ProductList";
import PizzaMenu from "./components/PizzaMenu";
import PizzaMenuUseState from "./components/PizzaMenuUseState";

function App() {
  return (
    <>
      {/* <StaticProductList /> */}
      <ProductList />
      <PizzaMenu />
      <PizzaMenuUseState />
    </>
  );
}

export default App;
