import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import EventIcon from "@material-ui/icons/Event";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { _register } from "../../Redux/Actions/user.actions";
import { connect } from "react-redux";
import "./auth.css";
import HelmetData from "../HelmetData/HelmetData";
class SignUp extends Component {
  state = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    gender: "",
    dob: ""
  };

  _handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitData = e => {
    e.preventDefault();
    var data = {
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile,
      password: this.state.password,
      gender: this.state.gender,
      dob: this.state.dob
    };
    this.props
      ._register(data)
      .then(response => {
        if (response.status == 201) {
          toast.success("SignUp successfully");
          window.location.href = "/login";
        } else {
          toast.error("Something wents wrong");
        }
      })
      .catch(function(error) {
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
          content={"STAR TRAVELES |Signup"}
        />
        <div class="bg-img">
          <div class="content">
            <header>SignUp</header>
            <form onSubmit={e => this.submitData(e)}>
              <div class="field space">
                <span class="fa fa-user">
                  <PermIdentityIcon />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter Name"
                  name="name"
                  value={this.state.name}
                  onChange={evt => this._handleChange(evt)}
                />
              </div>
              <div class="field space">
                <span class="fa fa-user">
                  <PhoneAndroidIcon />
                </span>
                <input
                  type="mobile"
                  required
                  placeholder="Enter mobile"
                  name="mobile"
                  value={this.state.mobile}
                  onChange={evt => this._handleChange(evt)}
                />
              </div>
              <div class="field space">
                <span class="fa fa-user">
                  <MailOutlineIcon />
                </span>
                <input
                  type="email"
                  required
                  placeholder="Enter Email"
                  name="email"
                  value={this.state.email}
                  onChange={evt => this._handleChange(evt)}
                />
              </div>

              <div class="field space">
                <span class="fa fa-user">
                  <EventIcon />
                </span>
                <input
                  type="date"
                  required
                  onChange={evt => this._handleChange(evt)}
                  name="dob"
                  value={this.state.dob}
                />
              </div>
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
              <div class="form-check" controlId="gender">
                <input
                  class="form-check-input"
                  type="radio"
                  onChange={evt => this._handleChange(evt)}
                  name="gender"
                  value="male"
                />
                <label class="form-check-label">Male</label>
              </div>
              <div class="form-check" controlId="gender">
                <label class="form-check-label">Female</label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={evt => this._handleChange(evt)}
                />
              </div>
              <div class="field">
                <input type="submit" value="SIGN UP" />
              </div>
            </form>

            <div class="signup">
              Already have a account?
              <Link to={"/login"}>Sign in </Link>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={1500} />
      </>
    );
  }
}

export default connect(null, { _register })(SignUp);
