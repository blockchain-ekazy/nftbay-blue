import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  mainContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },

  span: {
    color: theme.palette.primary.main,
  },

  innerContainer: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },

  heading: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
    [theme.breakpoints.down("sm")]: {
      // fontSize: 20,
    },
  },

  contact: {
    color: theme.palette.primary.main,
    fontSize: 19,
    fontWeight: 600,
    marginTop: 80,
  },
  mainHeading: {
    width: 589,
    fontSize: 60,
    fontWeight: "700",
    lineHeight: "90px",
    [theme.breakpoints.down("md")]: {
      width: "auto",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 20,
      width: "auto",
    },
  },

  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "1fr 1fr 1fr",
    gap: 10,
    padding: 10,
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  gridItem5: {
    width: "100%",
    gridColumn: "1 / span 2",
  },

  button: {
    height: 69,
    padding: 20,
    width: 340,
    marginTop: 60,
    fontWeight: "800",
    fontSize: 16,
    color: "#FFFF",

    background: theme.palette.primary.main,
    border: " 3.66927px solid #17D7F5",
    borderRadius: " 52.5928px",
    [theme.breakpoints.down("xs")]: {
      height: 43.53,

      width: 221.6,
    },
  },
  text: {
    color: "#FFFFFF",
  },

  checkbox: {
    color: "#FFFFFF",
  },
  agree: {
    marginBottom: 112,
    marginTop: 29,
  },
}));
