import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { ToastContainer, toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { _googleLogin } from "../../Redux/Actions/user.actions";
import axios from "axios";
class Google extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  responseGoogle = response => {
    console.log(response);
    const data = {
      tokenId: response.tokenId
    };

    localStorage.removeItem("x-auth-token");
    // axios
    //   .post("http://localhost:8080/social/googleLogin", data)
    this.props
      ._googleLogin(data)
      .then(response => {
        console.log(response, "response from api");

        toast.success("Login successful", {
          onClose: () => {
            window.location.href = "/routes";
            // this.props.history.push("/routes");
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
        {/* <ToastContainer autoClose={1500} /> */}
      </>
    );
  }
}

export default connect(null, { _googleLogin })(Google);
