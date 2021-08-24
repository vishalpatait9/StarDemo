import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import logo from "../assets/d.jpg";
import jwt_decode from "jwt-decode";

const styles = muiBaseTheme => ({
  card: {
    position: "relative",
    top: 60,
    maxWidth: 500,
    margin: "auto",

    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  media: {
    paddingTop: "40.25%"
  },
  content: {
    textAlign: "center",
    padding: muiBaseTheme.spacing.unit * 1
  },
  divider: {
    margin: `${muiBaseTheme.spacing.unit * 1}px 0`
  },
  heading: {
    fontWeight: "bold"
  },
  subheading: {
    lineHeight: 1.8
  },
  avatar: {
    display: "inline-block",
    height: 90,
    width: 90,
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: -muiBaseTheme.spacing.unit
    }
  }
});
class Profile extends Component {
  state = {
    token: ""
  };
  componentDidMount() {
    const tok = localStorage.getItem("x-auth-token");
    const decoded = jwt_decode(tok);
    console.log(decoded);

    this.setState({ token: decoded.user });
  }
  faces = [
    "http://i.pravatar.cc/300?img=2"
    // "http://i.pravatar.cc/300?img=3",
    // "http://i.pravatar.cc/300?img=4"
  ];
  render() {
    const { classes } = this.props;
    const { token } = this.state;
    console.log(token);

    return (
      <>
        <Card className={classes.card}>
          <CardMedia className={classes.media} image={logo} />
          <CardContent className={classes.content}>
            <Divider className={classes.divider} light />
            {this.faces.map(face => (
              <Avatar className={classes.avatar} key={face} src={face} />
            ))}
            <Typography
              className={"MuiTypography--heading"}
              variant={"h6"}
              gutterBottom
            >
              Name: {token.name}
            </Typography>
            <Typography
              className={"MuiTypography--heading"}
              variant={"h6"}
              gutterBottom
            >
              Email: {token.email}
            </Typography>
          </CardContent>
        </Card>
      </>
    );
  }
}
export default withStyles(styles)(Profile);
