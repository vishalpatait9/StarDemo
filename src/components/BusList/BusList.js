import React, { Component } from "react";
import { _reservation } from "../../Redux/Actions/user.actions";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import SweetAlert from "react-bootstrap-sweetalert";
class BusList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obj: "",
      reset: false,
      clas: false,
      arrowDown: false,
      token: "",
      alert: "",
      isSuccess: false,
      Message: "",
      defaultType: ""
    };
  }

  _addBooking = evt => {
    console.log("yyyyyyyyy");

    this.setState({
      alert: (
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "10px", color: "#82abed" }}
          title=" Are you sure ?"
          onConfirm={() => this._handleSubmit(evt)}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="info"
          cancelBtnBsStyle="danger"
          cancelBtnText="Cancel"
          confirmBtnText={"Confirm"}
          reverseButtons={true}
          showCancel
        >
          {/* Are you sure? */}
        </SweetAlert>
      )
    });
  };
  hideAlert = () => {
    this.setState({ alert: "", isSuccess: false });
  };
  hideAlertConfirm = () => {
    this.setState({ isSuccess: false });
  };
  _handleSubmit = async e => {
    e.preventDefault();
    var cmpnyName = this.refs.company.innerHTML;
    var startCity = this.refs.startCity.innerHTML;
    var destination = this.refs.destination.innerHTML;
    var pricePerSeat = this.refs.pricePerSeat.innerHTML;
    var bus = this.refs.bus.innerHTML;
    var busNumber = this.refs.busNumber.innerHTML;
    var token = this.state.token;
    const seat = localStorage.getItem("seat");
    const date = localStorage.getItem("date");

    const data = {
      companyName: cmpnyName,
      startCity: startCity,
      destination: destination,
      pricePerSeat: pricePerSeat,
      user: token,
      reservedSeat: seat,
      journeyDate: date,
      bus: bus,
      busNumber: busNumber
    };
    await this.props
      ._reservation(data)

      .then(response => {
        console.log(response.data._id);
        localStorage.setItem("reservationID", response.data._id);

        this.setState({
          alert: "",
          isSuccess: true,
          Message: "Reservation Successful ,complete Payment to comfirm",
          defaultType: "success"
        });
      })
      .catch(
        function(error) {
          this.setState({
            alert: "",
            isSuccess: true,
            Message: "this seat is reserved",
            defaultType: "danger"
          });
          throw error;
        }.bind(this)
      );
  };

  componentDidMount() {
    const tok = localStorage.getItem("x-auth-token");
    const decoded = jwt_decode(tok);
    // this.setState({ obj: this.props.busData, token: decoded.user._id });
    this.setState({ token: decoded.user._id });
  }

  handleSubmit = bId => {
    localStorage.setItem("selectedBusId", bId);
    this.setState({ clas: true, arrowDown: true });
  };

  handleReset = e => {
    if (this.state.clas === false) {
      this.setState({ clas: true, arrowDown: false, reset: true });
    }
    localStorage.removeItem("selectedBusId");
  };
  getData = () => {};
  render() {
    return (
      <>
        {this.state.alert}
        {this.props.busData.map((bus, idx) => {
          return (
            <div
              key={idx}
              className="card mt-5 buslist"
              style={{ backgroundColor: "rgba(240, 248, 255, 0.548)" }}
            >
              <div class="row ml-3">
                <div class="col-6 col-sm-3 mt-2 font-weight-bold ">Brand</div>

                <div class="col-6 col-sm-3 mt-2 font-weight-bold ">From</div>
                <div class="col-6 col-sm-3 mt-2 font-weight-bold ">To</div>
                <div class="col-6 col-sm-3 mt-2 font-weight-bold ">Price</div>

                <div class="w-100 d-none d-md-block"></div>
                <span className="d-none" ref="bus">
                  {bus._id}
                </span>
                <span className="d-none" ref="busNumber">
                  {bus.busNumber}
                </span>
                <div class="col-6 col-sm-3 mb-4" ref="company">
                  {bus.companyName}
                </div>
                <div class="col-6 col-sm-3 mb-4" ref="startCity">
                  {bus.startCity}
                </div>
                <div class="col-6 col-sm-3 mb-4" ref="destination">
                  {bus.destination}
                </div>
                <div class="col-6 col-sm-3 mb-4" ref="pricePerSeat">
                  {bus.pricePerSeat}
                </div>
                <div class="col-6 col-sm-4 mb-2 ml-0">
                  <button
                    className="btn btn-primary"
                    onClick={e => {
                      this._addBooking(e);
                    }}
                  >
                    Book Now
                  </button>
                </div>
                <div class="col-6 col-sm-4 mb-2 ml-0">
                  <span
                    className={
                      this.state.reset ? "badge badge-danger ml-5" : "disabled"
                    }
                    onClick={e => this.handleReset(e)}
                  >
                    Reset
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        {this.state.isSuccess && (
          <SweetAlert
            type={this.state.defaultType}
            style={{ display: "block", marginTop: "10px", color: "#82abed" }}
            title={this.state.Message}
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

export default connect(null, { _reservation })(BusList);
