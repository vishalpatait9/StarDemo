import React, { Component } from "react";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
import { ToastContainer, toast } from "react-toastify";
import { withRouter } from "react-router-dom";
class Facebook extends Component {
  state = {};
  responseFacebook = response => {
    console.log(response, "response");
    localStorage.removeItem("x-auth-token");
    const data = {
      accessToken: response.accessToken,
      userID: response.userID
    };
    console.log(response);
    axios
      .post("https://starbakend.herokuapp.com/social/facebookLogin", data)
      .then(response => {
        console.log(response, "response");
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
        throw error;
      });
  };
  render() {
    return (
      <>
        <div className="col-md-6 offset-md-3 text-center mt-3">
          <FacebookLogin
            appId="399618104802158"
            autoLoad={false}
            // fields="name,email,picture"
            // onClick={componentClicked}
            callback={this.responseFacebook}
          />
        </div>
        <ToastContainer autoClose={1500} />
      </>
    );
  }
}

export default withRouter(Facebook);
