import React, { Component } from "react";
import "./Routeselector.css";
import "./SeatSelection.scss";
import axios from "axios";
import { connect } from "react-redux";
import { _getAllTravels } from "../../Redux/Actions/user.actions";
class Routeselector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Travels: []
    };
  }
  getTravels = () => {
    this.props
      ._getAllTravels()
      .then(response => {
        this.setState({ Travels: response.data });
      })
      .catch(err => {
        console.log("err:", err);
      });
  };
  componentDidMount() {
    this.getTravels();
  }

  render() {
    const startCity = this.state.Travels.map(data => (
      <option value={data.startCity} key={data._id}>
        {data.startCity}
      </option>
    ));
    const destination = this.state.Travels.map(data => (
      <option value={data.destination} key={data._id}>
        {data.destination}
      </option>
    ));
    return (
      <>
        <div className="rdc">
          <div className="form-group inline"></div>
          <div className="main-container">
            <form
              className="form-inline"
              onSubmit={e => this.props.getRoutes(e)}
            >
              <select
                name="ad_account_selected"
                data-style="btn-new"
                class="selectpicker"
                onChange={e => {
                  this.props.handleFromCity(e);
                }}
              >
                <option>FROM</option>
                {startCity}
                {/* <option>Nashik</option>

                <option>Mumbai</option> */}
              </select>
              &nbsp;&nbsp;&nbsp;
              <select
                name="ad_account_selected"
                data-style="btn-new"
                class="selectpicker"
                onChange={e => {
                  this.props.handleToCity(e);
                }}
              >
                <option>TO</option>
                {destination}
                {/* <option>Solapur</option>
                <option>Pune</option> */}
              </select>
              <input
                onChange={e => {
                  this.props.handleDate(e);
                }}
                type="date"
              ></input>
              <input
                type="submit"
                className=" btn btn-primary btn-md getRoute"
              />
            </form>

            <div>{this.props.renderBusList(this.props.dataInp)}</div>
          </div>
          {this.props.displySeat && (
            <div class="plane">
              {/* <div class="cockpit">
    <h1>Please select a seat</h1>
  </div> */}
              <div class="exit exit--front fuselage"></div>

              <ol class="cabin fuselage">
                <li class="row row--1">
                  <ol class="seats " type="A">
                    <li class="seat ">
                      <input
                        type="checkbox"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="1A"
                        id="1A"
                      />
                      <label for="1A">1A</label>
                    </li>
                    <li class="seat">
                      <input
                        type="checkbox"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="1B"
                        id="1B"
                      />
                      <label for="1B">1B</label>
                    </li>
                    <li class="seat">
                      <input
                        type="checkbox"
                        id="1C"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="1C"
                      />
                      <label for="1C">1C</label>
                    </li>
                    <li class="seat">
                      <input type="checkbox" disabled id="1D" />
                      <label for="1D">Occupied</label>
                    </li>
                    <li class="seat">
                      <input
                        type="checkbox"
                        id="1E"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="1E"
                      />
                      <label for="1E">1E</label>
                    </li>
                    <li class="seat">
                      <input
                        type="checkbox"
                        id="1F"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="1F"
                      />
                      <label for="1F">1F</label>
                    </li>
                  </ol>
                </li>
                <li class="row row--2">
                  <ol class="seats" type="A">
                    <li class="seat">
                      <input
                        type="checkbox"
                        id="2A"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="2A"
                      />
                      <label for="2A">2A</label>
                    </li>
                    <li class="seat">
                      <input
                        type="checkbox"
                        id="2B"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="2B"
                      />
                      <label for="2B">2B</label>
                    </li>
                    <li class="seat">
                      <input
                        type="checkbox"
                        id="2C"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="2C"
                      />
                      <label for="2C">2C</label>
                    </li>
                    <li class="seat">
                      <input
                        type="checkbox"
                        id="2D"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="2D"
                      />
                      <label for="2D">2D</label>
                    </li>
                    <li class="seat">
                      <input
                        type="checkbox"
                        id="2E"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="2E"
                      />
                      <label for="2E">2E</label>
                    </li>
                    <li class="seat">
                      <input
                        type="checkbox"
                        id="2F"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="2F"
                      />
                      <label for="2F">2F</label>
                    </li>
                  </ol>
                </li>
                <li class="row row--3">
                  <ol class="seats" type="A">
                    <li class="seat">
                      <input
                        type="checkbox"
                        id="3A"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="3A"
                      />
                      <label for="3A">3A</label>
                    </li>
                    <li class="seat">
                      <input
                        type="checkbox"
                        id="3B"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="3B"
                      />
                      <label for="3B">3B</label>
                    </li>
                    <li class="seat">
                      <input
                        type="checkbox"
                        id="3C"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="3C"
                      />
                      <label for="3C">3C</label>
                    </li>
                    <li class="seat">
                      <input
                        type="checkbox"
                        id="3D"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="3D"
                      />
                      <label for="3D">3D</label>
                    </li>
                    <li class="seat">
                      <input
                        type="checkbox"
                        id="3E"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="3E"
                      />
                      <label for="3E">3E</label>
                    </li>
                    <li class="seat">
                      <input
                        type="checkbox"
                        id="3F"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="3F"
                      />
                      <label for="3F">3F</label>
                    </li>
                  </ol>
                </li>
                <li class="row row--4">
                  <ol class="seats" type="A">
                    <li class="seat">
                      <input
                        type="checkbox"
                        id="4A"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="4A"
                      />
                      <label for="4A">4A</label>
                    </li>
                    <li class="seat">
                      <input
                        type="checkbox"
                        id="4B"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="4B"
                      />
                      <label for="4B">4B</label>
                    </li>
                    <li class="seat">
                      <input
                        type="checkbox"
                        id="4C"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="4C"
                      />
                      <label for="4C">4C</label>
                    </li>
                    <li class="seat">
                      <input
                        type="checkbox"
                        id="4D"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="4D"
                      />
                      <label for="4D">4D</label>
                    </li>
                    <li class="seat">
                      <input
                        type="checkbox"
                        id="4E"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="4E"
                      />
                      <label for="4E">4E</label>
                    </li>
                    <li class="seat">
                      <input
                        type="checkbox"
                        id="4F"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="4F"
                      />
                      <label for="4F">4F</label>
                    </li>
                  </ol>
                </li>
                <li class="row row--5">
                  <ol class="seats" type="A">
                    <li class="seat">
                      <input type="checkbox" id="5A"  onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="5A"/>
                      <label for="5A">5A</label>
                    </li>
                    <li class="seat">
                      <input type="checkbox" id="5B"  onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="5B"/>
                      <label for="5B">5B</label>
                    </li>
                    <li class="seat">
                      <input type="checkbox" id="5C"  onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="5C"/>
                      <label for="5C">5C</label>
                    </li>
                    <li class="seat">
                      <input type="checkbox" id="5D"  onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="5D"/>
                      <label for="5D">5D</label>
                    </li>
                    <li class="seat">
                      <input type="checkbox" id="5E"  onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="5E"/>
                      <label for="5E">5E</label>
                    </li>
                    <li class="seat">
                      <input type="checkbox" id="5F"  onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="5F"/>
                      <label for="5F">5F</label>
                    </li>
                  </ol>
                </li>
                <li class="row row--6">
                  <ol class="seats" type="A">
                    <li class="seat">
                      <input type="checkbox" id="6A"  onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="6A" />
                      <label for="6A">6A</label>
                    </li>
                    <li class="seat">
                      <input type="checkbox" id="6B"  onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="6B"/>
                      <label for="6B">6B</label>
                    </li>
                    <li class="seat">
                      <input type="checkbox" id="6C"  onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="6C"/>
                      <label for="6C">6C</label>
                    </li>
                    <li class="seat">
                      <input type="checkbox" id="6D"  onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="6D"/>
                      <label for="6D">6D</label>
                    </li>
                    <li class="seat">
                      <input type="checkbox" id="6E"  onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="6E"/>
                      <label for="6E">6E</label>
                    </li>
                    <li class="seat">
                      <input type="checkbox" id="6F"  onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="6F"/>
                      <label for="6F">6F</label>
                    </li>
                  </ol>
                </li>
                <li class="row row--7">
                  <ol class="seats" type="A">
                    <li class="seat">
                      <input type="checkbox" id="7A"  onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="7A"/>
                      <label for="7A">7A</label>
                    </li>
                    <li class="seat">
                      <input type="checkbox" id="7B"  onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="7B"/>
                      <label for="7B">7B</label>
                    </li>
                    <li class="seat">
                      <input type="checkbox" id="7C" onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="7C" />
                      <label for="7C">7C</label>
                    </li>
                    <li class="seat">
                      <input type="checkbox" id="7D"  onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="7D"/>
                      <label for="7D">7D</label>
                    </li>
                    <li class="seat">
                      <input type="checkbox" id="7E"  onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="7E"/>
                      <label for="7E">7E</label>
                    </li>
                    <li class="seat">
                      <input type="checkbox" id="7F"  onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="7F"/>
                      <label for="7F">7F</label>
                    </li>
                  </ol>
                </li>
                <li class="row row--8">
                  <ol class="seats" type="A">
                    <li class="seat">
                      <input type="checkbox" id="8A"  onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="8A"/>
                      <label for="8A">8A</label>
                    </li>
                    <li class="seat">
                      <input type="checkbox" id="8B" onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="8B" />
                      <label for="8B">8B</label>
                    </li>
                    <li class="seat">
                      <input type="checkbox" id="8C"  onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="8C"/>
                      <label for="8C">8C</label>
                    </li>
                    <li class="seat">
                      <input type="checkbox" id="8D"  onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="8D"/>
                      <label for="8D">8D</label>
                    </li>
                    <li class="seat">
                      <input type="checkbox" id="8E"  onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="8E"/>
                      <label for="8E">8E</label>
                    </li>
                    <li class="seat">
                      <input type="checkbox" id="8F"  onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="8F"/>
                      <label for="8F">8F</label>
                    </li>
                  </ol>
                </li>
                <li class="row row--9">
                  <ol class="seats" type="A">
                    <li class="seat">
                      <input type="checkbox" id="9A"  onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="9A"/>
                      <label for="9A">9A</label>
                    </li>
                    <li class="seat">
                      <input type="checkbox" id="9B"  onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="9B"/>
                      <label for="9B">9B</label>
                    </li>
                    <li class="seat">
                      <input type="checkbox" id="9C"  onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="9C"/>
                      <label for="9C">9C</label>
                    </li>
                    <li class="seat">
                      <input type="checkbox" id="9D"  onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="9D"/>
                      <label for="9D">9D</label>
                    </li>
                    <li class="seat">
                      <input type="checkbox" id="9E"  onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="9E"/>
                      <label for="9E">9E</label>
                    </li>
                    <li class="seat">
                      <input type="checkbox" id="9F"  onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="9F"/>
                      <label for="9F">9F</label>
                    </li>
                  </ol>
                </li>
                <li class="row row--10">
                  <ol class="seats" type="A">
                    <li class="seat">
                      <input
                        type="checkbox"
                        id="10A"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="10A"
                      />
                      <label for="10A">10A</label>
                    </li>
                    <li class="seat">
                      <input
                        type="checkbox"
                        id="10B"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="10B"
                      />
                      <label for="10B">10B</label>
                    </li>
                    <li class="seat">
                      <input
                        type="checkbox"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="10C"
                        id="10C"
                      />
                      <label for="10C">10C</label>
                    </li>
                    <li class="seat">
                      <input
                        type="checkbox"
                        id="10D"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="10D"
                        id="10D"
                      />
                      <label for="10D">10D</label>
                    </li>
                    <li class="seat">
                      <input
                        type="checkbox"
                        id="10E"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="10E"
                        id="10E"
                      />
                      <label for="10E">10E</label>
                    </li>
                    <li class="seat">
                      <input
                        type="checkbox"
                        onChange={evt => this.props.handleSeat(evt)}
                        name="seat"
                        value="10F"
                        id="10F"
                      />
                      <label for="10F">10F</label>
                    </li>
                  </ol>
                </li>
              </ol>
              <div class="exit exit--back fuselage"></div>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default connect(null, { _getAllTravels })(Routeselector);
