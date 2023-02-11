import { Typography, Checkbox } from "@material-ui/core";
import { makeStyles, Box } from "@material-ui/core";
import React from "react";
import InputField from "../../components/inputField";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

const Signup = () => {
  const classes = useStyle();
  return (
    <Box className={classes.container}>
      <Box className={classes.containersingup}>
        <Box className={classes.singupheader}>
          <Typography variant="h1" className={classes.getsingup}>
            Get <span className={classes.startsingup}>Started</span>
          </Typography>
        </Box>
        <Box className={classes.singuppara}>
          <Typography variant="h3" className={classes.paratypo}>
            Please fill out the following fields to create a new account.
          </Typography>
        </Box>

        <Box className={classes.inputsingup}>
          <Box>
            <InputField
              placeholder="First Name"
              className={classes.singinputname}
            />
          </Box>

          <Box>
            <InputField
              placeholder="Last Name"
              className={classes.singinputname}
            />
          </Box>

          <Box>
            <InputField
              placeholder="Username"
              className={classes.singinputname}
            />
          </Box>

          <Box>
            <InputField
              placeholder="Wallet Address"
              className={classes.singinputname}
            />
          </Box>

          <Box>
            <InputField placeholder="Email" className={classes.singinputname} />
          </Box>
        </Box>

        <Box className={classes.singingicontex}>
          <Typography>
            <Checkbox
              color="#FFFFFF"
              icon={
                <CheckBoxOutlineBlankIcon
                  fontSize="large"
                  className={classes.singingicon}
                />
              }
              inputProps={{ "aria-label": "checkbox with default color" }}
              checkedIcon={
                <CheckBoxIcon
                  fontSize="large"
                  className={classes.singingicon}
                />
              }
            />

            <span className={classes.singingtext}>
              By signing up, I agree to the terms of service and privacy policy.
            </span>
          </Typography>
        </Box>

        <Box className={classes.bntsingup}>
          <Button variant="contained" className={classes.signupButton}>
            Create account
          </Button>
        </Box>

        <Box className={classes.singaccount}>
          <Typography className={classes.singingtext}>
            Don't have an account?
            <Link>
              <span className={classes.startsingup}>Sign In</span>
            </Link>{" "}
          </Typography>
        </Box>

        <Box className={classes.signupcopyrightcantaner}>
          <Box className={classes.signupcopyright}>
            <Typography className={classes.singingtext}>
              Copyright © 2022
            </Typography>
            <Typography className={classes.singingtext}>
              Inc. All Rights Reserved. Accessibility,
            </Typography>
          </Box>
          <Box>
            <Typography className={classes.singingtext}>
              User Agreement, Privacy policy, Cookies Do not sell my personal
            </Typography>
          </Box>
          <Box>
            <Typography className={classes.singingtext}>
              information and Ad Choice.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;

const useStyle = makeStyles((theme) => ({
  container: {
    background: theme.palette.background.default,
    padding: "3em 4em",
  },
  containersingup: {
    background: "#0A0949",
  },

  singupheader: {
    display: "flex",
    justifyContent: "center",
  },

  singuppara: {
    display: "flex",
    justifyContent: "center",
    color: theme.palette.primary.main,
  },

  paratypo: {
    lineHeight: "25px",
    fontweight: 400,
  },
  getsingup: {
    color: theme.palette.primary.main,
    fontWeight: 800,
    paddingTop: "48px",
    lineHeight: "72px",
  },

  startsingup: {
    color: theme.palette.secondary.main,
  },

  inputsingup: {
    padding: "10px",
    lineHeight: "115px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignContent: "center",
    flexWrap: "wrap",
  },

  singinputname: {
    border: "2.97366px solid #FFFFFF",
    borderRadius: "4.46049px",
    width: "497.34px",
    height: "60.96px",
    boxSizing: "border-box",
    textAlign: "center",
    "& .MuiInputBase-input": {
      textAlign: "center",
      fontSize: "26px",
      color: theme.palette.primary.main,
    },
  },

  singingicontex: {
    textAlign: "center",
    lineHeight: "27px",
    fontWeight: 400,
    color: "#FFFFFF",
  },

  singingtext: {
    lineHeight: "27px",
    fontWeight: 400,
    fontSize: "18px",
  },

  singingicon: {
    color: "#FFFFFF",
  },

  bntsingup: {
    display: "flex",
    justifyContent: "center",
  },

  signupButton: {
    width: "364px",
    height: "69px",
    left: "30px",
  },

  singaccount: {
    display: "flex",
    justifyContent: "center",
    color: theme.palette.primary.main,
    marginTop: "20px",
  },

  signupcopyrightcantaner: {
    textAlign: "center",
    marginTop: "54px",
    color: theme.palette.primary.main,
    paddingBottom: "157px",
  },

  signupcopyright: {
    display: "flex",
    justifyContent: "center",
    gap: "88px",
  },
}));
