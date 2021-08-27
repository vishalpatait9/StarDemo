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
          <meta name={this.props.name} content={this.props.content} />
        </Helmet>
      </>
    );
  }
}

export default HelmetData;
