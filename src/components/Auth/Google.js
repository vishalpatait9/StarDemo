import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { ToastContainer, toast } from "react-toastify";
import { withRouter } from "react-router-dom";

import axios from "axios";
class Google extends Component {
  state = {};
  responseGoogle = response => {
    // console.log(response);
    const data = {
      tokenId: response.tokenId
    };

    localStorage.removeItem("x-auth-token");
    axios
      .post("https://starbakend.herokuapp.com/social/googleLogin", data)
      .then(response => {
        localStorage.setItem(
          "x-auth-token",
          JSON.stringify(response.data.token)
        );
        toast.success("Login successful", {
          onClose: () => {
            // window.location.href = "/routes";
            this.props.history.push("/routes");
          }
        });
      })
      .catch(function(error) {
        toast.error("Invalid credentials");
        console.log(error, "error");
        throw error;
      });
  };
  render() {
    return (
      <>
        {" "}
        <div className="col-md-6 offset-md-3 text-center">
          <GoogleLogin
            clientId="602605419209-tej859cufm074qo5jpk48uknb8ctntkf.apps.googleusercontent.com"
            buttonText="Login with google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <ToastContainer autoClose={1500} />
      </>
    );
  }
}

export default withRouter(Google);
