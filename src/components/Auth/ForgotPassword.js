import React, { Component } from "react";

import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

import { _forgotPassword } from "../../Redux/Actions/user.actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

import "./auth.css";
import HelmetData from "../HelmetData/HelmetData";

class ForgotPassword extends Component {
  state = {
    email: "",
    message: "",
    isSuccess: false,

    defaultType: ""
  };
  hideAlertConfirm = () => {
    this.setState({ isSuccess: false });
  };
  _handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitData = e => {
    e.preventDefault();
    var data = {
      email: this.state.email
    };

    this.props
      ._forgotPassword(data)
      .then(response => {
        console.log(response);

        if (response && response.status == 200) {
          this.setState({
            message: response.data.message,
            isSuccess: true,

            defaultType: "success"
          });
        } else {
          this.setState({
            message: "Something went wrong",
            isSuccess: true,

            defaultType: "danger"
          });
        }
      })
      .catch(function(error) {
        this.setState({
          message: "Something went wrong",
          isSuccess: true,

          defaultType: "danger"
        });
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
        <div class="bg-img">
          <div class="content">
            <header>Forgot Password </header>
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

              <div class="field">
                <input type="submit" value="SUBMIT" />
              </div>
            </form>
            <div class="signup">
              Don't have account?
              {/* <a href="#">Signup Now</a> */}
              <Link to={"/register"}>Signup Now</Link>
            </div>
          </div>
        </div>

        {this.state.isSuccess && (
          <SweetAlert
            type={this.state.defaultType}
            style={{ display: "block", marginTop: "10px", color: "#82abed" }}
            title={this.state.message}
            allowEscape={false}
            onConfirm={() => this.hideAlertConfirm()}
            onCancel={() => this.hideAlertConfirm()}
            confirmBtnBsStyle="info"
          ></SweetAlert>
        )}
      </>
    );
  }
}

export default withRouter(connect(null, { _forgotPassword })(ForgotPassword));
