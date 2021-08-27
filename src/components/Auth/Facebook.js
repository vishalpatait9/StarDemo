import React, { Component } from "react";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
import { ToastContainer, toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { _facebookLogin } from "../../Redux/Actions/user.actions";
import HelmetData from "../HelmetData/HelmetData";
class Facebook extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  responseFacebook = response => {
    console.log(response, "response");
    localStorage.removeItem("x-auth-token");
    const data = {
      accessToken: response.accessToken,
      userID: response.userID
    };
    // console.log(response);
    // axios
    //   .post("http://localhost:8080/social/facebookLogin", data)
    this.props
      ._facebookLogin(data)
      .then(response => {
        console.log(response, "response from api");
        // localStorage.setItem(
        //   "x-auth-token",
        //   JSON.stringify(response.data.token)
        // );
        toast.success("Login successful", {
          onClose: () => {
            window.location.href = "/routes";
            // this.props.history.push("/routes");
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
        <HelmetData
          data={
            "STAR TRAVELES |Happiness Is Travelling. Awaken To A Different World"
          }
        />
        <div className="col-md-6 offset-md-3 text-center mt-3">
          <FacebookLogin
            appId="399618104802158"
            autoLoad={false}
            // fields="name,email,picture"
            // onClick={componentClicked}
            callback={this.responseFacebook}
          />
        </div>
        {/* <ToastContainer autoClose={1500} /> */}
      </>
    );
  }
}

export default connect(null, { _facebookLogin })(Facebook);
