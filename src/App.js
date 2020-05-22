import React, { useState } from "react";
import { BrowserRouter as Route } from "react-router-dom";
import Nav from "./the_components/Nav";
import OrderForm from "./the_components/OrderForm";
import Cart from "./the_components/Cart";
import Home from "./the_components/Home";

const App = () => {
  const [order, setOrder] = useState([]);
  console.log("App -> order", order)

  // const tempOrder = [{
  //   customer: "Tiffany",
  //   toppingsChecked: [{ name: 'Grilled Chicken', id: 'grilled-chicken', isChecked: false },
  //   { name: 'Onions', id: 'onions', isChecked: false },
  //   { name: 'Green Pepper', id: 'green-pepper', isChecked: false }],
  //   size: "Medium",
  // }]
  return (
    <>
      <Nav />
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/pizza">
        <OrderForm order={order} setOrder={setOrder} />
      </Route>
      {/* <Route exact path="/cart">
        <Cart order={order} />
      </Route> */}
    </>
  );
};
export default App;