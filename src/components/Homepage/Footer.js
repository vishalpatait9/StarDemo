import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
        style={{
          background: "linear-gradient(to bottom, #ff66cc 0%, #660066 100%)"
        }}
      >
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            {/* Star travel's */}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
