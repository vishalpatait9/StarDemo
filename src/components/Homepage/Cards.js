import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";
import logo from "../assets/c.jpg";
import logo2 from "../assets/a.jpg";
import logo1 from "../assets/b.jpg";
import logo4 from "../assets/e.jpg";
// import Particles from "react-particles-js";
// import particlesConfig from "../assets/particlesConfig";
import { Container, Col, Row } from "react-bootstrap";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

export default function Cards() {
  const classes = useStyles();

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={logo1}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Mhaswad
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  This impressive paella is a perfect party dish and a fun meal
                  to cook together with your guests.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Col>
        <Col>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={logo}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Maan
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  This impressive paella is a perfect party dish and a fun meal
                  to cook together with your guests.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Col>{" "}
        <Col>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={logo2}
                // image={require("../assets/a.jpg")}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Khataav
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  This impressive paella is a perfect party dish and a fun meal
                  to cook together with your guests.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Col>
      </Row>
      {/* .......................................banner image........................... */}
      <img src={logo4} class="d-block w-100" alt="..." />
      {/* .............................................................................................. */}
      {/* <Particles
        params={particlesConfig}
        className="App-particles__container"
      /> */}
      <Row>
        <Col>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={logo1}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Aatpadi
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  This impressive paella is a perfect party dish and a fun meal
                  to cook together with your guests.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Col>
        <Col>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={logo}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Dahivadi
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  This impressive paella is a perfect party dish and a fun meal
                  to cook together with your guests.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Col>{" "}
        <Col>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={logo2}
                // image={require("../assets/a.jpg")}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Virkarvadi
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  This impressive paella is a perfect party dish and a fun meal
                  to cook together with your guests.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Col>
      </Row>
    </Container>

    // .......................................................................
  );
}
