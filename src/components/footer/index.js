import React from "react";
import { makeStyles } from "@material-ui/core";
import { Box, Typography } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Link } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";

const Footer = () => {
  const classes = useStyle();

  return (
    <div>
      <Box className={classes.footerMain}>
        <Box style={{ paddingLeft: "70px" }}>
          <Typography variant="h4" className={classes.description}>
            A new place to collect
          </Typography>
          <Typography variant="h4" className={classes.subDescriptn}>
            NFT assets
          </Typography>
        </Box>

        <Box className={classes.linksOverall}>
          <Box className={classes.innerBox}>
            <Box className={classes.box1}>
              <Typography variant="h4" className={classes.links}>
                Say Hello{" "}
              </Typography>
              <Typography variant="h4" className={classes.linksColor}>
                XYZ{" "}
              </Typography>
            </Box>

            <Box className={classes.box1}>
              <Typography variant="h4" className={classes.links}>
                Important Links
              </Typography>
              <Typography variant="h4" className={classes.linksColor}>
                Privacy Policy{" "}
              </Typography>
              <Typography variant="h4" className={classes.linksColor}>
                Terms of Use{" "}
              </Typography>
            </Box>
          </Box>

          <Box className={classes.boxlink}>
            <Box>
              <Typography variant="h4" className={classes.links}>
                Socials
              </Typography>
            </Box>

            <Box className={classes.boxlink1}>
              <Box className={classes.boxcircle}>
                <a>
                  <InstagramIcon
                    color="primary"
                    className={classes.footrIcons}
                  />
                </a>
              </Box>
              <Box className={classes.boxcircle}>
                <a>
                  <TwitterIcon color="primary" className={classes.footrIcons} />
                </a>
              </Box>

              <Box className={classes.boxcircle}>
                <a>
                  <FacebookIcon
                    color="primary"
                    className={classes.footrIcons}
                  />
                </a>
              </Box>
            </Box>
          </Box>

          <Box className={classes.box1}>
            <Box>
              <Typography variant="h4" className={classes.links}>
                Newsletter{" "}
              </Typography>
            </Box>

            <Box className={classes.boxlink2}>
              <Box className={classes.linksColor}>
                <Typography className={classes.agree}>
                  <MailOutlineIcon className={classes.iccn} />

                  <input
                    placeholder="Enter Your Email Address"
                    className={classes.grayinput}
                  />

                  <ArrowForwardIcon className={classes.iccn} />
                </Typography>
              </Box>

              <Box>
                <hr className={classes.hrmail} />
              </Box>

              <Box className={classes.linksColor}>
                <Typography className={classes.agree}>
                  <Checkbox
                    color="default"
                    inputProps={{ Poppins: "checkbox with default color" }}
                    className={classes.gray}
                  />
                  <span className={classes.gray}>I agree to the</span>{" "}
                  <span className={classes.gray1}>
                    {" "}
                    <a className={classes.linkStyle}>Privacy Policy.</a>
                  </span>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography className={classes.copywrites}>
            <hr
              className={classes.hr2}
              style={{ width: "80%", coloor: "#414141" }}
            />
            copywrites© 2022. All Rights Reserved.
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Footer;

const useStyle = makeStyles((theme) => ({
  footerMain: {
    backgroundColor: "#0A0949",
    paddingTop: "70px",
    fontFamily: theme.fontFamily,
    [theme.breakpoints.down("md")]: {
      padding: "0 0px",
    },
  },
  innerBox: {
    [theme.breakpoints.down("sm")]: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
    },
  },
  description: {
    color: theme.palette.primary.main,
    fontWeight: "700",
    fontSize: "42px",
  },
  subDescriptn: {
    color: theme.palette.secondary.main,
    fontWeight: "700",
    fontSize: "42px",
  },
  linksOverall: {
    paddingTop: "40px",
    display: "flex",
    justifyContent: "space-around",
    color: theme.palette.secondary.main,
    gap: 10,
    [theme.breakpoints.down("md")]: {
      display: "grid",
      gridTemplateColumns: "1fr ",
      padding: "30px 53px 0px 70px",
    },
  },
  links: {
    color: theme.palette.secondary.main,
    fontSize: "26px",
    fontWeight: "500",
  },
  linksColor: {
    color: theme.palette.primary.main,
    lineHeight: "39px",
    fontWeight: "500",
    fontSize: "19.31px",
    "&:hover": {
      cursor: "pointer",
    },
  },

  boxlink1: {
    display: "flex",
    textAlign: "center",
    gap: 10,
    paddingTop: 21,
  },
  boxlink2: {
    lineHeight: "59px",
    paddingTop: 30,
  },
  boxcircle: {
    borderRadius: "50px",
    width: "51px",
    height: "51px",
    border: "2px solid white",
  },
  agree: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  footrIcons: {
    width: "35px",
    height: "41px",
    padding: 5,
  },
  gray: {
    color: "#414141",
    display: "flex",
    alignItems: "center",
  },
  gray1: {
    display: "flex",
    alignItems: "center",
    marginLeft: "3px",
  },
  grayinput: {
    color: "#414141",
    border: "none",
    backgroundColor: "#0A0949",
    "&:focus-within": {
      backgroundColor: "#0A0949",
      border: "none",
      outline: "none",
    },
  },
  hrmail: {
    border: "2px solid #414141",
  },
  hr2: {
    border: "2px solid #2C2C44",
  },
  copywrites: {
    paddingTop: "200px",
    textAlign: "center",
    fontWeight: "500",
    fontSize: "15.555px",
    color: theme.palette.primary.main,
  },
  iccn: {
    width: "28.78px",
    height: "19.18px",
  },
  linkStyle: {
    textDecoration: "none",
    color: "#FAFAFA",
  },
}));
