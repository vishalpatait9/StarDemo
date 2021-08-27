import React, { Component } from "react";

import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { _resetPassword } from "../../Redux/Actions/user.actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

import "./auth.css";
import HelmetData from "../HelmetData/HelmetData";

class ResetPassword extends Component {
  state = {
    resetPasswordLink: this.props.match.params.token,
    newPassword: "",
    message: "",
    isSuccess: false,

    defaultType: ""
  };
  hideAlertConfirm = () => {
    this.setState({ isSuccess: false });
    this.props.history.push("/login");
  };
  _handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitData = e => {
    e.preventDefault();
    var data = {
      resetPasswordLink: this.state.resetPasswordLink,
      newPassword: this.state.newPassword
    };
    console.log(data);

    this.props
      ._resetPassword(data)
      .then(response => {
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
          name={"description"}
          content={"STAR TRAVELES |FACEBOOK reset password"}
        />
        <div class="bg-img">
          <div class="content">
            <header>Reset Password </header>
            <form onSubmit={e => this.submitData(e)}>
              <div class="field">
                <span class="fa fa-user">
                  <VisibilityIcon />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter New Password"
                  name="newPassword"
                  value={this.state.newPassword}
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

export default withRouter(connect(null, { _resetPassword })(ResetPassword));
