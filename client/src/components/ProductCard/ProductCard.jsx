import React, { useState } from "react";
import { CartState } from "../../context";
import axios from "axios";
import { BeatLoader } from "react-spinners";
// import codeforces from "../../assets/codeforces.png";
// import leetcode from "../../assets/leetcode.png";
// import utkarsh from "../../assets/utkarsh.jpg";
import "./ProductCard.css";

const ProductCard = ({ user }) => {
  //   console.log(user);
  const { cart, setCart, clock, setClock } = CartState();
  const [loading, setLoading] = useState(false);
  const handleAddToCart = async () => {
    let datq = true;
    for (let i = 0; i < cart.length; i++) {
      if (user.id === cart[i].id) {
        datq = false;
        break;
      }
    }

    // console.log(datq);
    if (datq) {
      setLoading(true);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const { data } = await axios.post(
          `http://localhost:5000/api/v1/users/createUser`,
          { user },
          config
        );
        // console.log(data);
        setLoading(false);
        setClock(!clock);
      } catch (error) {
        setLoading(false);
        return alert(error);
      }
      setCart([...cart, user]);
    } else {
      try {
        setLoading(true);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        let obj = {};
        for (let i = 0; i < cart.length; i++) {
          //   console.log(cart[i]);
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
        // console.log(data);
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
    }
  };

  return (
    <div className="socialcard">
      <div className="socialcard-image">
        <img src={user.image} alt="user-image" />
      </div>

      <div className="socialcard-details">
        <div className="socialcard-user">{user.category}</div>
        <button className="btn-cta-green" onClick={handleAddToCart}>
          {loading ? <BeatLoader color="#fff" /> : " Add to cart"}
        </button>
        <h4>price:{user.price}</h4>
        <h6>Title:{user.title}</h6>
        <div className="socialcard-user-rating">
          <h5>Discription:{user.description.substring(0, 100)}</h5>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
