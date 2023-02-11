import React from "react";
import { Box, makeStyles, Slider, Typography } from "@material-ui/core";

import { useState } from "react";
import { withStyles } from "@material-ui/styles";
import Button from "../Button/index";
export const FilterOptions = ({ handleFilters }) => {
  const classes = useStyles();
  const [priceRange, setPriceRange] = useState(0.1);
  const handlePriceRange = (_, value) => {
    setPriceRange(value);
  };

  const PrettoSlider = withStyles({
    root: {
      color: "#F2C010",
      height: 10,
    },
    thumb: {
      display: "none",
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

  return (
    <div className={classes.root}>
      <form>
        <div className={classes.range}>
          <PrettoSlider
            value={priceRange}
            min={0.1}
            max={10}
            step={0.1}
            onChange={handlePriceRange}
            valueLabelDisplay="auto"
          />
        </div>
        <Box>
          <Typography variant="h3"> Price: 0 ETH — 10 ETH</Typography>
        </Box>
        <div className={classes.filterBtns}>
          <Button variant="h1" className={classes.filerButton}>
            Filter
          </Button>
        </div>
      </form>
    </div>
  );
};

export const useStyles = makeStyles(() => ({
  root: {
    "& h1": {
      margin: "0",
      paddingLeft: "10px",
      fontSize: "24px",
      fontWeight: "600",
      color: "#23262F",
    },
  },
  checksInner: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: "500",
    color: "#141416",
  },

  priceExtremes: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& p": {
      margin: 0,
      color: "#23262F",
      fontWeight: "500",
    },
  },

  filterBtns: {
    padding: "27px 0px",
    display: "flex",
    justifyContent: "center",
  },
  filerButton: {
    width: 209,
    height: 41,
  },
}));
