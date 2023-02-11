import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import Banner1 from "../../assets/banner1.png";
import Banner2 from "../../assets/banner2.png";
import Banner3 from "../../assets/banner3.png";
import Banner4 from "../../assets/banner4.png";
import Banner5 from "../../assets/banner5.png";
import Banner6 from "../../assets/banner6.png";
import Banner7 from "../../assets/banner7.png";
import Banner8 from "../../assets/banner8.png";

const Banner = () => {
  const classes = useStyles();
  return (
    <Box className={classes.gridContainer}>
      <div className={classes.one}>
        <img src={Banner1} alt="" className={classes.image} />
      </div>
      <div className={classes.two}>
        <img src={Banner2} alt="" />
      </div>
      <div className={classes.three}>
        <img src={Banner3} alt="" />
      </div>
      <div className={classes.four}>
        <img src={Banner4} alt="" />
      </div>
      <div className={classes.five}>
        <img src={Banner5} alt="" />
      </div>
      <div className={classes.six}>
        <img src={Banner6} alt="" />
      </div>
      <div className={classes.seven}>
        <img src={Banner7} alt="" />
      </div>
      <div className={classes.eight}>
        <img src={Banner8} alt="" />
      </div>
    </Box>
  );
};

export default Banner;

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    display: "grid",
    justifyItems: "center",
    alignItems: "center",
    gridTemplateColumns: "repeat(3,1fr)",
    gridTemplateRows: "repeat(4,1fr)",
    color: "#ffff",
    height: "100vh",
    "& img": {
      width: "100%",
      height: "100%",
    },
    "& div": {
      height: "100%",
      width: "100%",
    },
    gap: 20,
    [theme.breakpoints.down]: {
      width: "100%",
    },
  },
  one: {
    gridArea: "1/1/3/2",
  },
  two: {
    gridArea: "3/1/4/2",
  },
  three: {
    gridArea: "4/1/5/2",
  },
  four: {
    gridArea: "1/2/2/3",
  },
  five: {
    gridArea: "2/2/5/3",
  },
  six: {
    gridArea: "1/3/2/4",
  },
  seven: {
    gridArea: "2/3/3/4",
  },
  eight: {
    gridArea: "3/3/5/4",
  },
  image: {
    width: "100%",
  },
}));
