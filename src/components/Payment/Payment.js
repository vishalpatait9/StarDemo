import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import Button from "@material-ui/core/Button";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import { _payment } from "../../Redux/Actions/user.actions";
const Payment = props => {
  const pricePerSeat =
    props.dataInp &&
    props.dataInp.map(data => {
      return data.pricePerSeat;
    });
  const [success, setSuccess] = useState(false);
  const [discount, setDiscount] = useState("");

  const [product, setProduct] = useState(pricePerSeat);
  const [usedDiscount, setUsedDiscount] = useState(false);

  const makePayment = token => {
    const data = {
      token,
      product,

      _id: localStorage.getItem("reservationID"),
      transaction: "payed"
    };
    const headers = {
      "Content-Type": "application/json"
    };
    // axios
    //   .post("http://localhost:8080/payment ", data, { headers })
    props
      ._payment(data)
      .then(response => {
        window.location.assign(response.data.receipt_url, "_blank");
        window.open(window.location, "_blank");
        setSuccess(true);
        localStorage.setItem("paymentSucess", success);
      })
      .catch(function(error) {
        console.log(error, "error");
        throw error;
      });
  };
  useEffect(async () => {
    await getUserDiscount();
  }, []);
  const getUserDiscount = async () => {
    const tok = localStorage.getItem("x-auth-token");
    const decoded = jwt_decode(tok);
    console.log(decoded.user.discount, "decoded.user.discount");

    await setDiscount(decoded.user.discount); // get discount value from token
  };

  const setPrice = () => {
    setProduct(pricePerSeat - discount); // get price by minusing discount
    setUsedDiscount(true);
    return product;
  };
  console.log(discount, "discount");

  return (
    <>
      {" "}
      <div className="col-md-6 offset-md-3 text-center">
        {/* { usedDiscount == true ? (
          <h4 style={{ color: "pink" }}>
            You used discount of {discount ? discount : 0}
          </h4>
        ) : (
          <h4 style={{ color: "pink" }}>
            Include Copoun Discount of{" "}
            <Button variant="contained" color="secondary" onClick={setPrice}>
              {discount ? discount : 0}
            </Button>
          </h4>
        )})} */}
        {usedDiscount && discount && (
          <h4 style={{ color: "pink" }}>
            You used discount of {discount ? discount : 0}
          </h4>
        )}
        {discount && (
          <h4 style={{ color: "pink" }}>
            Include Copoun Discount of{" "}
            <Button variant="contained" color="secondary" onClick={setPrice}>
              {discount ? discount : 0}
            </Button>
          </h4>
        )}
        <StripeCheckout
          stripeKey="pk_test_51J8fc7SFCB8usBRp4hdhmDMX0XM0ongTfl4HwX4lO0NGnBByo97LqjagPdeX2Tj6EvnZHnGpMQ09zNyzF3CCladl00dTlLccss"
          token={makePayment}
          name="Star Travels"
          amount={product * 100}
          billingAddress
          shippingAddress
        >
          <Button variant="contained" color="primary">
            Pay Rs: {product}
          </Button>
        </StripeCheckout>
      </div>
    </>
  );
};

export default connect(null, { _payment })(Payment);
