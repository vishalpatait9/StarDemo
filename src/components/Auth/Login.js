import React, { Component } from "react";

import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { _login } from "../../Redux/Actions/user.actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./auth.css";
import Google from "./Google";
import Facebook from "./Facebook";
import HelmetData from "../HelmetData/HelmetData";
class Login extends Component {
  state = {
    email: "",

    password: ""
  };
  _handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitData = e => {
    e.preventDefault();
    var data = {
      email: this.state.email,

      password: this.state.password
    };
    localStorage.removeItem("x-auth-token");
    this.props
      ._login(data)
      .then(response => {
        if (response && response.status == 200) {
          if (response.data && response.data.user.role == "admin") {
            toast.success("Login successful", {
              onClose: () => {
                // this.props.history.push("/sidebar");
                window.location.href = "/sidebar";
              }
            });
          } else {
            toast.success("Login successful", {
              onClose: () => {
                window.location.href = "/routes";
                // this.props.history.push("/routes");
              }
            });
          }
        } else {
          toast.error("Invalid credentials");
        }
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
          name={"description"}
          content={"STAR TRAVELES | Login"}
        />
        <div class="bg-img">
          <div class="content">
            <header>Login </header>
            <form onSubmit={e => this.submitData(e)}>
              <div class="field">
                <span class="fa fa-user">
                  <MailOutlineIcon />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter Email"
                  name="email"
                  value={this.state.email}
                  onChange={evt => this._handleChange(evt)}
                />
              </div>
              {/* <div class="field space"> */}

              <div class="field space">
                <span class="fa fa-lock">
                  <VisibilityIcon />
                </span>
                <input
                  type="password"
                  class="pass-key"
                  required
                  placeholder="Enter Password"
                  onChange={evt => this._handleChange(evt)}
                  name="password"
                  value={this.state.password}
                />
              </div>

              <div class="field">
                <input type="submit" value="LOGIN" />
              </div>
            </form>
            <div class="signup">
              Don't have account?
              {/* <a href="#">Signup Now</a> */}
              <Link to={"/register"}>Signup Now</Link>
              Forgot password?
              {/* <a href="#">Signup Now</a> */}
              <Link to={"/forgot-password"}>Forgot password</Link>
            </div>
            <Google />
            <Facebook />{" "}
          </div>
        </div>

        <ToastContainer autoClose={1500} />
      </>
    );
  }
}

export default withRouter(connect(null, { _login })(Login));
