import React, { Component } from "react";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import Cards from "./Cards";
import Footer from "./Footer";
// import MouseParticles from "react-mouse-particles";

class Index extends Component {
  state = {};
  render() {
    return (
      <>
        {/* <Navbar /> */}
        <Carousel />
        <Cards />
        <Footer />
        {/* <MouseParticles
          g={1}
          color="random"
          cull="MuiSvgIcon-root,MuiButton-root"
          level={6}
        /> */}
      </>
    );
  }
}

export default Index;
