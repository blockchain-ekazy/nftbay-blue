import Box from "@material-ui/core/Box";
import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import data from "./Array";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
const Map = () => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.abouttop}>
        <Box className={classes.aboutheader}>
          <Typography className={classes.aboutheader1} variant="h1">
            Buy and Sell Digital NFT
          </Typography>
        </Box>
        {data.map((item) => {
          return (
            <>
              <Box className={classes.aboutpara}>{item.p}</Box>
            </>
          );
        })}

        <Box className={classes.aboutButton1}>
          <Link to="/nftdetailpage">
            <Button variant="contained" className={classes.aboutButton}>
              Explore NFT
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Map;

const useStyles = makeStyles((theme) => ({
  abouttop: {
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "81px",
    },

    [theme.breakpoints.down("md")]: {
      paddingLeft: 0,
      lineHeight: "21px",
    },
  },
  aboutheader: {
    color: theme.palette.primary.main,
    fontSize: theme.typography.h1.fontSize,
    width: "65%",
    paddingLeft: "10px",
  },

  aboutheader1: {
    [theme.breakpoints.down("md")]: {
      padding: "0 10px",
    },
  },
  aboutpara: {
    color: theme.palette.text.primary,
    fontSize: theme.typography.h5.fontSize,
    fontFamily: theme.fontFamily,
    margin: "20px",
    gap: 2,
  },

  aboutButton: {
    width: "364px",
    height: "69px",
    marginLeft: "18px",

    [theme.breakpoints.down("xs")]: {
      width: "286px",
    },
  },

  aboutButton1: {
    display: "flex",
  },
}));
