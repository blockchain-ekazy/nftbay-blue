import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  mainContainer: {
    background: "#060C2E",
    display: "flex",
    alignItems: "center",
    paddingLeft: "7.6vw",
    paddingTop: 20,
    paddingBottom: 20,
    gap: 30,

    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
      paddingLeft: "0px",
      gap: 15,
    },
  },
  logo: {
    color: theme.palette.primary.main,
    width: 142,
    height: 50,
    objectFit: "cover",
    [theme.breakpoints.down("md")]: {
      width: "100px",
      objectFit: "cover",
      paddingLeft: 10,
    },
  },
  navLinks: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    color: theme.palette.primary.main,
    gap: 22,
  },
  links: {
    color: theme.palette.text.primary,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 16,
    fontFamily: theme.fontFamily,
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  },
  // profileIcon: {
  //   width: 32,
  //   height: 35,
  // },
  connectButton: {
    textTransform: "lowercase",
  },
  menuButton: {
    width: 50,
  },
}));
