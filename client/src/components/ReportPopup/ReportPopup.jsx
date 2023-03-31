import React, { useEffect, useState } from "react";
import "./ReportPopup.css";
import { BeatLoader } from "react-spinners";

import axios from "axios";

const ReportPopup = ({ setOpen, click, setClick, open, user }) => {
  // console.log(item);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [phoneNumber, setPhoneNumber] = useState(user ? user.phoneNumber : "");
  const [hobbies, setHobbies] = useState(user ? user.hobbies : "");
  const handleClick = async () => {
    setLoading(!loading);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (!user) {
        const { data } = await axios.post(
          `http://localhost:5000/api/v1/users/createUser`,
          { name, email, hobbies, phoneNumber },
          config
        );
        // console.log(data);
        setEmail("");
        setName("");
        setPhoneNumber("");
        setLoading(!loading);
        setHobbies("");
        setOpen(!open);
        setClick(!click);
      } else {
        // console.log(hobbies);

        // console.log(go);
        const { data } = await axios.post(
          `http://localhost:5000/api/v1/users/UpdateUser/${user._id}`,
          { name, email, hobbies, phoneNumber, _id: user._id },
          config
        );
        // console.log(data);
        setEmail("");
        setName("");
        setPhoneNumber("");
        setHobbies("");
        setOpen(!open);
        setClick(!click);
      }
    } catch (error) {
      alert("Duplicate is not allowed");
    }
  };
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return (
    <div className="reportpopup">
      <h3>Enter New Entry</h3>
      <div className="report-bg">
        <input
          id="filled-basic"
          label="Write your query"
          variant="outlined"
          multiline
          value={name}
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="discussion-question-input"
        />
        <input
          id="filled-basic"
          label="Write your query"
          variant="outlined"
          multiline
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="discussion-question-input"
        />
        <input
          id="filled-basic"
          label="Write your query"
          variant="outlined"
          multiline
          value={phoneNumber}
          placeholder="1234567890"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
          className="discussion-question-input"
        />
        <input
          id="filled-basic"
          label="Write your query"
          variant="outlined"
          multiline
          value={hobbies}
          placeholder="writing playing"
          onChange={(e) => {
            setHobbies(e.target.value);
          }}
          className="discussion-question-input"
        />
      </div>

      <div className="reportpopup-buttons">
        <div className="btn-cta-orange" onClick={handleClick}>
          {loading ? <BeatLoader color="#fff" /> : "submit"}
        </div>
        <div
          className="btn-cta-light"
          onClick={() => {
            setOpen(!open);
          }}
        >
          Close
        </div>
      </div>
    </div>
  );
};

export default ReportPopup;
