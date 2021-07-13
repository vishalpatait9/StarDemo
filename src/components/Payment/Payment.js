// import React from "react";

// import StripeCheckout from "react-stripe-checkout";
// import axios from "axios";
// import { toast } from "react-toastify";

// import "react-toastify/dist/ReactToastify.css";
// import "./Payment.css";

// toast.configure();

// function Payment() {
//   const [product] = React.useState({
//     name: "Star Travels",
//     price: "Price  999",
//     description: "Happy journey"
//   });

//   async function handleToken(token, addresses) {
//     const response = await axios.post(
//       "https://ry7v05l6on.sse.codesandbox.io/checkout",
//       { token, product }
//     );
//     const { status } = response.data;
//     console.log("Response:", response.data);
//     if (status === "success") {
//       toast("Success! Check email for details", { type: "success" });
//     } else {
//       toast("Something went wrong", { type: "error" });
//     }
//   }

//   return (
//     <div className="container">
//       <div className="product">
//         <h1>{product.name}</h1>
//         <h3>{product.price}</h3>
//       </div>
//       <StripeCheckout
//         stripeKey="pk_test_4TbuO6qAW2XPuce1Q6ywrGP200NrDZ2233"
//         token={handleToken}
//         amount={product.price * 10}
//         name="Star Travels"
//         billingAddress
//         shippingAddress
//       />
//     </div>
//   );
// }

// export default Payment;

import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import Button from "@material-ui/core/Button";
const Payment = props => {
  const pricePerSeat =
    props.dataInp &&
    props.dataInp.map(data => {
      return data.pricePerSeat;
    });

  console.log(pricePerSeat, "pricePerSeat");
  const [product, setProduct] = useState({
    name: "react",
    price: pricePerSeat ? pricePerSeat : 0,
    productBy: "facebook"
  });
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
    axios
      .post("https://starbakend.herokuapp.com/payment ", data, { headers })
      .then(response => {
        console.log(response.data.receipt_url, "response");
        window.location.assign(response.data.receipt_url, "_blank");
        window.open(window.location, "_blank");
      })
      .catch(function(error) {
        console.log(error, "error");
        throw error;
      });
  };

  return (
    <>
      {" "}
      <div className="col-md-6 offset-md-3 text-center">
        <StripeCheckout
          stripeKey="pk_test_51J8fc7SFCB8usBRp4hdhmDMX0XM0ongTfl4HwX4lO0NGnBByo97LqjagPdeX2Tj6EvnZHnGpMQ09zNyzF3CCladl00dTlLccss"
          token={makePayment}
          name="Star Travels"
          amount={product.price * 100}
          billingAddress
          shippingAddress
        >
          <Button variant="contained" color="primary">
            Pay Rs: {product.price}
          </Button>
        </StripeCheckout>
      </div>
    </>
  );
};

export default Payment;
