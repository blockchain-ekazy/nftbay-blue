import { makeStyles } from "@material-ui/styles";
import React from "react";

const Layout = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.layoutWrapper}>{children}</div>;
};

export default Layout;

const useStyles = makeStyles((theme) => ({
  layoutWrapper: {
    height: "fit-content",
    background: theme.palette.background.default,
    padding: "0px 80px",
    [theme.breakpoints.down("md")]: {
      padding: "0px 20px",
    },
  },
}));
