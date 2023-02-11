import { Box } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core";
import Mapaccordion from "../../components/Faqs/map";

function FAQs() {
  const classes = useStyles();
  return (
    <Box className={classes.main}>
      <Box className={classes.mapsection}>
        <Mapaccordion />
      </Box>
    </Box>
  );
}

export default FAQs;

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: "#fffff",
    paddingBottom: 20,
  },

  mapsection: {
    "& .MuiPaper-root": {
      backgroundColor: theme.palette.background.default,
      fontWeight: "bold",
    },
    "& .MuiTypography-root": {
      textDecoration: "none",
    },
  },
  Layoutac: {
    margin: 50,
    padding: "100px",
    [theme.breakpoints.down("md")]: {
      padding: "70px",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "20px",
    },
  },
}));
