import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../UserCard/UserCard";

import {
  MdOutlineRadioButtonUnchecked,
  MdOutlineRadioButtonChecked,
} from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ReportPopup from "../ReportPopup/ReportPopup";
import "./MainContent.css";
import Cartpop from "../CartPopUp/Cartpop";
import ProductCard from "../ProductCard/ProductCard";
import { CartState } from "../../context";

const MainContent = () => {
  const { cart, setCart, clock, setClock } = CartState();
  const [click, setClick] = useState(false);
  const [product, setProduct] = useState([]);
  const [global, setGlobal] = useState([]);
  const [users, setUsers] = useState([]);
  const [create, setCreate] = useState(false);
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const apiLoad = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `https://fakestoreapi.com/products`,
        config
      );

      // console.log(data);
      setProduct(data);
    } catch (error) {
      alert(error);
    }
  };
  const pageLoad = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/users/getAllUser`,
        config
      );
      setUsers(data.data.users);
      // console.log(data.data.users);
    } catch (error) {
      alert(error);
    }
  };
  const handleSend = async () => {
    if (global.length < 1) {
      alert("Please select some User");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = await axios.post(
        `http://localhost:5000/api/v1/users/getData`,
        { data: JSON.stringify(global) },
        config
      );
      // console.log(data);
      alert("data sent");
    } catch (error) {}
  };
  const handleOnDrag = (e, widgetType) => {
    console.log(widgetType);
    e.dataTransfer.setData("widgetType", widgetType);
  };
  const handleOnDrop = (e) => {
    const widgetType = e.dataTransfer.getData("widgetType");
    console.log("widgetType", widgetType);
    let obj = {};
    for (let i = 0; i < 20; i++) {
      if (widgetType == product[i]) {
        obj = product[i];
      }
    }
    setCart([...cart, obj]);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    pageLoad();
    apiLoad();
  }, [click]);
  return (
    <div>
      <div className="header">
        <h2>Choose any item</h2>
        <div
          className="cart-cursor"
          onClick={() => {
            setOpenCart(!openCart);
          }}
        >
          <AiOutlineShoppingCart />
        </div>
      </div>

      <table>
        <div className="content-card">
          {product.length > 0
            ? product.map((product, i) => (
                <div className="total">
                  <div className="ind">{/* <h3>{i + 1}</h3> */}</div>
                  <div
                    className="card"
                    key={product.id}
                    draggable
                    onDragStart={(e) => handleOnDrag(e, product.id)}
                  >
                    <ProductCard
                      user={product}
                      setClick={setClick}
                      click={click}
                      draggable
                      onDragStart={(e) => handleOnDrag(e, product.id)}
                      product={product}
                    />
                  </div>
                </div>
              ))
            : "No User Found"}
        </div>
      </table>
      {openCart ? (
        <Cartpop
          setOpenCart={setOpenCart}
          openCart={openCart}
          click={click}
          setClick={setClick}
          product={product}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default MainContent;
