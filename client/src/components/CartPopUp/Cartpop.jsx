import React, { useEffect, useState } from "react";
import "./Cartpop.css";
import { BeatLoader } from "react-spinners";
import { GrFormClose } from "react-icons/gr";
import axios from "axios";
import { CartState } from "../../context";

const Cartpop = ({ setOpenCart, click, setClick, openCart, product }) => {
  // console.log(item);
  const { cart, setCart, clock, setClock } = CartState();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRemove = async (user) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let obj = {};
      for (let i = 0; i < cart.length; i++) {
        // console.log(cart[i]);
        if (user.id === cart[i].id) {
          obj = cart[i];
          break;
        }
      }
      const data = await axios.get(
        `http://localhost:5000/api/v1/users/deleteUser/${obj._id}`,
        {},
        config
      );
      //   console.log(data);
      setLoading(false);
      const dat = cart.filter(function (item) {
        return item !== user;
      });
      setCart(dat);
      setClock(!clock);
      // console.log(data);
    } catch (error) {
      alert(error);
      setLoading(false);
      setClock(!clock);
      // return;
    }
    const data = cart.filter(function (item) {
      return item !== user;
    });
    setCart(data);
  };
  const handleOnDrop = async (e) => {
    e.preventDefault();
    // console.log(" bbbbbbbbbbbbbbbbbb");
    const widgetType = e.dataTransfer.getData("widgetType");
    // console.log("new ", widgetType);
    // console.log("widgetType", widgetType);
    let obj = {};
    // console.log(product);
    for (let i = 0; i < 20; i++) {
      if (widgetType == product[i].id) {
        obj = product[i];
      }
    }
    setLoading(true);
    console.log(obj);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `http://localhost:5000/api/v1/users/createUser`,
        { user: obj },
        config
      );
      console.log(data);
      setLoading(false);
      setClock(!clock);
    } catch (error) {
      setLoading(false);
      return alert(error);
    }
    setCart([...cart, obj]);
  };
  const handleDragOver = (e) => {
    // console.log("dragging");
    e.preventDefault();
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
      setCart(data.data.users);

      //   console.log(data.data.users);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    pageLoad();
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, [clock]);

  return (
    <div className="reportpopup-2">
      <div
        className="reportpopup-scroll"
        onDrop={handleOnDrop}
        onDragOver={handleDragOver}
      >
        {cart?.length > 0
          ? cart.map((user) => (
              <div className="card-item">
                <div className="cart-items">
                  <p>Title:{user.title}</p>
                  {/* <p>Catogary:{user.category}</p> */}
                  <h3>Price:{user.price}</h3>
                  <div
                    className="btn-cta-orange"
                    onClick={() => handleRemove(user)}
                  >
                    {loading ? <BeatLoader color="#fff" /> : "Remove Item"}
                  </div>
                </div>
              </div>
            ))
          : "No item present in the cart"}
      </div>
      <div className="reportpopup-buttons-2">
        <div
          className="btn-cta-light"
          onClick={() => {
            setOpenCart(!openCart);
          }}
        >
          Close
        </div>
      </div>
    </div>
  );
};

export default Cartpop;
