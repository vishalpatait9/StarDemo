import React, { useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import RouteSelection from "./RouteSelection";
import SeatSelection from "./SeatSelction";
import Payment from "../Payment/Payment";
import * as apiCall from "./routeApifunc";
import BusList from "../BusList/BusList";
import { withRouter } from "react-router-dom";
import Coupon from "../Coupon/Coupon";
import HelmetData from "../HelmetData/HelmetData";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "60% ",
    margin: "auto"
  }
}));

function RouteSelector() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [dataInp, setData] = useState("");
  const [startCity, setStartCity] = useState("");
  const [destination, setDestination] = useState("");
  const [seat, setSeat] = useState("");
  const [displySeat, setDisplySeat] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };
  //..............................................................................................
  const handleToCity = e => {
    e.preventDefault();
    setDestination({ destination: e.target.value });
    localStorage.setItem("destination", e.target.value);
  };
  const renderBusList = dataInp => {
    if (Object.keys(dataInp).length > 0) {
      return <BusList busData={dataInp} />;
    }
  };

  const handleFromCity = e => {
    e.preventDefault();

    setStartCity({ startCity: e.target.value });
    localStorage.setItem("start", e.target.value);
  };
  const handleSeat = e => {
    e.preventDefault();

    setSeat({ seat: e.target.value });
    localStorage.setItem("seat", e.target.value);
  };

  const getRoutes = e => {
    e.preventDefault();

    apiCall
      .getRoutesFromApi(startCity.startCity, destination.destination)
      .then(response => response.data)
      .then(data => {
        console.log(data.bus, "data");

        setData(data.bus);
        setDisplySeat(true);
      });
  };

  const handleDate = e => {
    e.preventDefault();

    localStorage.setItem("date", e.target.value);
  };
  const paymentSucess = localStorage.getItem("paymentSucess"); //to dispay coupon component after payment sucessfull

  return (
    <>
      <HelmetData
        data={
          "STAR TRAVELES |Happiness Is Travelling. Awaken To A Different World"
        }
      />
      {paymentSucess ? (
        <Coupon /> //to dispay coupon component after payment sucessfull
      ) : (
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab
                label="Select Travels"
                href="#selectRoute"
                {...a11yProps(0)}
              />
              <Tab label="Payment" href="#payment" {...a11yProps(1)} />
              {/* <Tab label="Select Seat" href="#seats" {...a11yProps(2)} /> */}
            </Tabs>
          </AppBar>

          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel
              value={value}
              id="selectRoute"
              index={0}
              dir={theme.direction}
            >
              <RouteSelection
                handleToCity={handleToCity}
                renderBusList={renderBusList}
                handleFromCity={handleFromCity}
                getRoutes={getRoutes}
                handleDate={handleDate}
                dataInp={dataInp}
                seat={seat}
                handleSeat={handleSeat}
                displySeat={displySeat}
              />
            </TabPanel>
            <TabPanel
              value={value}
              id="Payment"
              index={1}
              dir={theme.direction}
            >
              <Payment dataInp={dataInp} />
            </TabPanel>
            {/* <TabPanel value={value} id="seats" index={2} dir={theme.direction}>
          <SeatSelection handleSeat={handleSeat} />
        </TabPanel> */}
          </SwipeableViews>
        </div>
      )}
    </>
  );
}
export default withRouter(RouteSelector);
