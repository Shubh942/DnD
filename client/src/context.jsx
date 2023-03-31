import { createContext, useContext, useState } from "react";

const Cart = createContext();

const Context = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [clock, setClock] = useState(false);
  // const court = useRef([]);

  return (
    <Cart.Provider value={{ cart, clock, setClock, setCart }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
