import { Typography, Box, TextField } from "@material-ui/core";
import { makeStyles, Checkbox, InputAdornment } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { Link } from "react-router-dom";

import React from "react";

const Updataabout = () => {
  const classes = useStyle();
  return (
    <>
      <Box className={classes.mainContainer}>
        <Box className={classes.subscribeabout}>
          <Typography variant="h1" className={classes.updataabout}>
            Subscribe to the
            <Box>
              <span className={classes.color}>exclusive</span> updates!
            </Box>
          </Typography>
        </Box>

        <Box className={classes.emailabout}>
          <Box>
            <Box>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" label="dhjdjddidi">
                      <MailOutlineIcon className={classes.emailicon} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box className={classes.privacypara}>
              <Typography className={classes.agree}>
                <Checkbox
                  color="default"
                  inputProps={{ "aria-label": "checkbox with default color" }}
                  className={classes.emailinput}
                />
                <span className={classes.emailtx}>I agree to the</span>{" "}
                {/* <Link>
                  <span className={classes.emailtx1}>Privacy Policy.</span>
                </Link> */}
              </Typography>
            </Box>
          </Box>
          <Box className={classes.sendicon}>
            <Button
              color="theme.palette.secondary.main"
              className={classes.button}
              startIcon={<SendIcon className={classes.sendicon} />}
            >
              <Typography className={classes.sendicon}> Subscribe</Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Updataabout;
const useStyle = makeStyles((theme) => ({
  mainContainer: {
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr",
    paddingTop: "68px",
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      display: "flex",
      direction: "column",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },

  subscribeabout: {
    paddingLeft: "97px",
    fontSize: theme.typography.h1.fontSize,
    [theme.breakpoints.down("sm")]: {
      left: "1px",
      width: "451px",
    },
  },

  updataabout: {
    fontSize: theme.typography.h1.fontSize,
    color: theme.palette.primary.main,
    lineHeight: "40px",
    fontWight: 800,
  },

  color: {
    color: theme.palette.secondary.main,
  },

  emailicon: {
    padding: "10px",
    color: theme.palette.primary.main,
  },

  sendicon: {
    display: "flex",
    gap: 2,
    color: theme.palette.primary.main,
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "15px",
    },
  },

  privacypara: {
    [theme.breakpoints.down("sm")]: {
      width: "249px",
    },
  },

  emailabout: {
    display: "flex",
    gap: 11,
    [theme.breakpoints.down("sm")]: {
      lineHeight: "10px",
      padding: "38px",
      paddingLeft: "37px",
    },
  },

  emailtx: {
    color: "#414141",
  },

  emailtx1: {
    color: theme.palette.primary.main,
  },

  button: {
    background: theme.palette.background.default,
  },

  sendicon: {
    color: theme.palette.primary.main,
    paddingTop: "6px",
  },
}));
