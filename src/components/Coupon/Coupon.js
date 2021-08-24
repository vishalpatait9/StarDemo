import React, { useEffect, useState } from "react";

import ScratchCard from "react-scratchcard";
import card from "./card.jpg";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { connect } from "react-redux";
import { _postDiscount } from "../../Redux/Actions/user.actions";
const Coupon = props => {
  const [scratchedText, setScratchedText] = useState("");
  const [token, setToken] = useState("");
  const [discount, setDiscount] = useState("");

  const handleScratchComplete = () => {
    setScratchedText(`Congratulations! You WON ! Rs: ${discount} discount`);
    setTimeout(function() {
      localStorage.removeItem("paymentSucess");
    }, 5000);
    handleSubmit();
  };

  const settings = {
    width: 300,
    height: 300,
    image: card,
    finishPercent: 50,
    onComplete: () => handleScratchComplete()
  };

  const postDiscount = () => {
    setDiscount(Math.floor(Math.random() * 10));
  };

  const getToken = () => {
    const tok = localStorage.getItem("x-auth-token");
    const decoded = jwt_decode(tok);

    setToken(decoded.user._id);
  };
  const handleSubmit = () => {
    const data = {
      _id: token,
      discount: discount
    };

    // axios
    //   .post("http://localhost:8080/users/myDiscount", data)

    props
      ._postDiscount(data)
      .then(response => {
        console.log(response, "response");
      })
      .catch(function(error) {
        console.log(error, "error");
        throw error;
      });
  };
  useEffect(() => {
    getToken();
    postDiscount();
  }, []);

  return (
    <div className="col-md-10 offset-md-3 text-center mt-5">
      <ScratchCard {...settings}>
        <div style={{ textAlign: "center", marginLeft: "200px" }}>
          {scratchedText}
        </div>
      </ScratchCard>
    </div>
  );
};
export default connect(null, { _postDiscount })(Coupon);
