import React, { useEffect, useState } from "react";
import "./UserCard.css";
import {
  MdOutlineRadioButtonUnchecked,
  MdOutlineRadioButtonChecked,
} from "react-icons/md";

import axios from "axios";
import ReportPopup from "../ReportPopup/ReportPopup";
import { CartState } from "../../context";

const UserCard = ({ user, click, setClick, global, setGlobal }) => {
  const { cart, setCart } = CartState();
  const [report, setReport] = useState(false);
  const [del, setDel] = useState(false);

  const [check, setCheck] = useState(false);
  // console.log(item.slug);
  const [open, setOpen] = useState(false);

  const openPopup = () => {
    setOpen(!open);
  };
  const handleDelete = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = await axios.get(
        `http://localhost:5000/api/v1/users/deleteUser/${user._id}`,
        {},
        config
      );
      setClick(!click);
      // console.log(data);
    } catch (error) {
      alert(error);
    }
  };
  const handleCheck = async () => {
    setCheck(!check);
    setGlobal([...global, user]);

    // console.log([...global, user]);
  };
  const handleUnCheck = async () => {
    setCheck(!check);
    const data = global.filter(function (item) {
      return item !== user;
    });
    // const data = global.remove(user);
    // console.log(data);
    setGlobal(data);
  };
  const handleAddToCart = async () => {
    const dat = cart.includes(user);
    if (!dat) setCart([...cart, user]);
    else {
      const data = cart.filter(function (item) {
        return item !== user;
      });
      setCart(data);
    }
  };

  return (
    <div className="discussion-card">
      {/* {console.log(item)} */}
      {check ? (
        <MdOutlineRadioButtonChecked onClick={() => handleUnCheck()} />
      ) : (
        <MdOutlineRadioButtonUnchecked onClick={() => handleCheck()} />
      )}

      {open ? (
        <ReportPopup
          user={user}
          setOpen={setOpen}
          open={open}
          click={click}
          setClick={setClick}
        />
      ) : (
        ""
      )}
      <button className="btn-cta-green" onClick={handleAddToCart}>
        Add to cart
      </button>
      <div className="discussion-card-content">
        <div className="discussion-card-ques">
          <p>Name:{user.name}</p>
          <p className="discussion-card-question">Email:{user.email}</p>
        </div>

        <p className="b">Phone:{user.phoneNumber}</p>
        <p className="b">
          Hobbies:
          {user.hobbies}
        </p>
        <div className="butr">
          <button
            className="btn"
            onClick={() => {
              setOpen(!open);
            }}
          >
            Update
          </button>
          {del ? (
            ""
          ) : (
            <button
              className="btn"
              onClick={() => {
                setDel(!del);
              }}
            >
              Delete
            </button>
          )}

          {del ? (
            <div>
              <button className="btn" onClick={handleDelete}>
                Confirm
              </button>
              <button
                className="btn"
                onClick={() => {
                  setDel(!del);
                }}
              >
                Not Confirm
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
