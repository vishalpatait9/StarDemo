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
          <meta
            name={this.props.name ? this.props.name : ""}
            content={this.props.content ? this.props.content : ""}
            data-react-helmet="true"
          />
        </Helmet>
      </>
    );
  }
}

export default HelmetData;
