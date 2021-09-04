import "./App.css";
import React, { lazy, Suspense, Fragment } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Index from "./components/Homepage/Index";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import { Provider } from "react-redux";

import store from "./Redux/store";
import { createBrowserHistory } from "history";
import Profile from "./components/Profile/Profile";
import Particles from "react-particles-js";
import MouseParticles from "react-mouse-particles";
import particlesConfig from "./components/assets/particlesConfig";
import Navbar from "./components/Homepage/Navbar";
import RouteSelector from "./components/Routes/RouteSelector";
import BookingList from "./components/Admin/BookingList";
import AdminSidebar from "./components/Admin/AdminSidebar";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import Coupon from "./components/Coupon/Coupon";
import HelmetData from "./components/HelmetData/HelmetData";

const history = createBrowserHistory();
function App() {
  var isLogin = false;
  let token = localStorage.getItem("x-auth-token");
  if (token) {
    isLogin = true;
  }

  return (
    <div className="App">
      <HelmetData
        data={
          "STAR TRAVELE |Happiness Is Travelling. Awaken To A Different World"
        }
        name="google-site-verification"
        content="Icai0FOyTWGVS8w-6-nU9KhdDWDrwLSdEChTPrffk4Y"
      />
      <Provider store={store}>
        <BrowserRouter history={history}>
          <Navbar />

          <Particles
            params={particlesConfig}
            className="App-particles__container"
          />
          <MouseParticles
            g={1}
            color="random"
            cull="MuiSvgIcon-root,MuiButton-root"
            level={6}
          />
          <Suspense fallback={<p>Loading..</p>}>
            <Switch>
              {/* {!isLogin && (
                <Fragment> */}
              <Route path="/" exact render={props => <Index {...props} />} />
              <Route path="/login" render={props => <Login {...props} />} />
              <Route path="/register" render={props => <SignUp {...props} />} />
              <Route
                path="/forgot-password"
                render={props => <ForgotPassword {...props} />}
              />
              <Route
                path="/reset-password/:token"
                render={props => <ResetPassword {...props} />}
              />
              {/* {!isLogin && <Redirect from="*" to="/" />}
                </Fragment>
              )} */}
              {isLogin && (
                <Fragment>
                  <Route
                    path="/routes"
                    render={props => <RouteSelector {...props} />}
                  />
                  <Route
                    path="/profile"
                    exact
                    render={props => <Profile {...props} />}
                  />
                  <Route
                    path="/coupon"
                    exact
                    render={props => <Coupon {...props} />}
                  />
                  <Route
                    path="/sidebar"
                    exact
                    render={props => <AdminSidebar {...props} />}
                  />
                  {/* <Route
                    path="/sidebar/admin"
                    exact
                    render={props => <BookingList {...props} />}
                  /> */}
                </Fragment>
              )}
            </Switch>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
// gggggggggggggggggggggg
