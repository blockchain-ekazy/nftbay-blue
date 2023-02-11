import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  mainContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    height: "100%",
    paddingLeft: "5.5vw",
    paddingRight: "5.5vw",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
    },
  },
  detailedImages: {
    marginTop: 83,
  },
  container: {
    background: theme.palette.background.default,
  },
  sellers: {
    paddingLeft: 75,
    paddingRight: 75,

    [theme.breakpoints.down("md")]: {
      marginTop: 322,
    },
  },
  buySellNFT: {
    paddingLeft: 75,
    paddingRight: 75,
    [theme.breakpoints.down("md")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
}));
