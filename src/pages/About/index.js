import Box from "@material-ui/core/Box";
import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Map from "./Map";
import Button from "../../components/Button";
import top from "../../assets/top.png";
import DeatailImages from "../../components/detailedImages";
import Updataabout from "../../components/Updataabout/index.js";
import Cardabout from "../../components/Cardabout";
import Layout from "../../components/layout/index";
const About = () => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.aboutpage}>
        <Layout>
          <Box container className={classes.Container}>
            <Box item className={classes.aboutContainer}>
              <img src={top} className={classes.aboutimg} />
              <Box>
                <Map className={classes.aboutmap} />
              </Box>
            </Box>
          </Box>
        </Layout>

        <Box className={classes.aboutcard}>
          <DeatailImages />
        </Box>
        <Box>
          <Updataabout />
        </Box>

        <Box className={classes.cardContainer}>
          <Typography variant="h1">Explore</Typography>
        </Box>
        <Box className={classes.container}>
          <Layout>
            <Cardabout />
          </Layout>
        </Box>
      </Box>
    </>
  );
};

export default About;

const useStyles = makeStyles((theme) => ({
  aboutpage: {
    background: theme.palette.background.default,
  },

  Container: {
    display: "flex",
  },
  aboutContainer: {
    display: "flex",
    gap: 10,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  aboutimg: {
    width: "580px",
    height: "721px",
    paddingTop: "10px",

    [theme.breakpoints.down("xs")]: {
      width: "307px",
      height: "280px",
      paddingRight: "26px",
    },
  },

  aboutcard: {
    marginTop: "50px",
  },
  cardContainer: {
    marginTop: 88,
    paddingLeft: 80,
    marginBottom: 65,
  },

  aboutimgbox: {
    gap: 4,
  },
}));
