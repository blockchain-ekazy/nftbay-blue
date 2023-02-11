import { Box, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core";
import Button from "../Button/index";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
const Authors = () => {
  const classes = useStyle();
  return (
    <Box className={classes.mainContainer}>
      <Box>
        <Typography variant="h2" className={classes.description}>
          THE BEST NFT AUTHORS HERE
        </Typography>
      </Box>
      <Box>
        <Typography className={classes.nftAssets} variant="h1">
          A new place to collect & sell NFT assets
        </Typography>
      </Box>
      <Box>
        <Button className={classes.viewMarketButton} variant="h3">
          View Market
        </Button>
      </Box>
      <Box>
        <Typography variant="h3" className={classes.description}>
          Discover Artworks
        </Typography>

        <ArrowDownwardIcon className={classes.arrowDown} fontSize="large" />
      </Box>
    </Box>
  );
};

export default Authors;

const useStyle = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 50,
    marginTop: 80,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginBottom: "20px",
    },
  },
  description: {
    color: theme.palette.secondary.main,
    fontSize: 19,
    fontWeight: 600,
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  nftAssets: {
    width: 533,
    fontSize: 70,
    fontWeight: "1000",
    lineHeight: "90px",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  viewMarketButton: {
    width: 320,
    hieght: 69,
    padding: 20,
    fontWeight: "800",
    fontSize: "16px",
  },
  arrowDown: {
    color: theme.palette.primary.main,
    marginTop: 10,
    marginLeft: 10,
  },
}));
