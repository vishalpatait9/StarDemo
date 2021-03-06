import React, { Suspense } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";
import ListItemText from "@material-ui/core/ListItemText";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import { Router, Route, Link, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import BookingList from "./BookingList";
import TravelsIndex from "./TravelsIndex";
import UsersIndex from "./UsersIndex";
import { withRouter } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HelmetData from "../HelmetData/HelmetData";
const drawerWidth = 240;
const history = createBrowserHistory();

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(5) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

function AdminSidebar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const logOut = e => {
    localStorage.clear();
    global.token = "";
    global.UserName = "";
    props.history.push("/");
  };
  return (
    <>
      <HelmetData
        data={
          "STAR TRAVELES |Happiness Is Travelling. Awaken To A Different World"
        }
      />{" "}
      <Router history={history}>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open
                })}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Star Travels
              </Typography>
            </Toolbar>
          </AppBar>

          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open
              })
            }}
            style={
              {
                //   background:
                //     "linear-gradient(to top left, #66ffff 0%, #cc00cc 100%)"
              }
            }
          >
            <div className={classes.toolbar}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem button component={Link} to="/sidebar/reservation">
                <AssignmentTurnedInIcon />

                <ListItemText>Reservation</ListItemText>
              </ListItem>
              <ListItem button component={Link} to="/sidebar/travels">
                <DirectionsBusIcon />
                <ListItemText>Travels</ListItemText>
              </ListItem>
              <ListItem button component={Link} to="/sidebar/users">
                <PersonAddIcon />
                <ListItemText>Users</ListItemText>
              </ListItem>
              <ListItem button onClick={logOut}>
                <ExitToAppIcon />
                <ListItemText>logOut</ListItemText>
              </ListItem>
            </List>
          </Drawer>
        </div>
        <div>
          <Suspense fallback={<p>Loading....</p>}>
            <Switch>
              <Route path="/sidebar/reservation" exact>
                <BookingList />
              </Route>
              <Route path="/sidebar/travels" exact>
                <TravelsIndex />
              </Route>
              <Route path="/sidebar/users" exact>
                <UsersIndex />
              </Route>
            </Switch>
          </Suspense>
        </div>
      </Router>
    </>
  );
}
export default withRouter(AdminSidebar);
