import React, { Component } from "react";
import { Helmet } from "react-helmet";

class HelmetData extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Helmet>
          <title>{this.props.data}</title>
        </Helmet>
      </>
    );
  }
}

export default HelmetData;
