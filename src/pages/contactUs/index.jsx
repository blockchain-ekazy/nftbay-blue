import { Box, Typography, Checkbox, Button } from "@material-ui/core";
import React from "react";

import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";

import useStyle from "./style";
import FormInput from "../../components/formInput";
const ContactUs = () => {
  const classes = useStyle();
  return (
    <Box className={classes.container}>
      <Box className={classes.mainContainer}>
        <Typography variant="h2" className={classes.contact}>
          CONTACT US
        </Typography>

        <Box className={classes.innerContainer}>
          <Box className={classes.heading}>
            <Typography className={classes.mainHeading} variant="h1">
              Have <span className={classes.span}>Questions</span>? Get In
              Touch!
            </Typography>
          </Box>
          <Box className={classes.rightContainer}>
            <Box className={classes.gridContainer}>
              <Box className={classes.field}>
                {" "}
                <FormInput
                  className={classes.gridItem1}
                  name="Name"
                  Icon={PersonOutlineOutlinedIcon}
                />
              </Box>

              <Box className={classes.field}>
                {" "}
                <FormInput
                  className={classes.gridItem2}
                  name="Email Adress"
                  Icon={MailOutlineIcon}
                />
              </Box>

              <Box className={classes.field}>
                {" "}
                <FormInput
                  className={classes.gridItem3}
                  name="Phone"
                  Icon={PhoneOutlinedIcon}
                />
              </Box>

              <Box className={classes.field}>
                {" "}
                <FormInput
                  className={classes.gridItem4}
                  name="Subject"
                  Icon={InfoOutlinedIcon}
                />
              </Box>

              <Box className={classes.gridItem5}>
                <FormInput name="How can we help?" Icon={GroupOutlinedIcon} />
              </Box>
            </Box>
            <Box>
              <Button className={classes.button} variant="h3">
                Get In Touch
              </Button>
            </Box>
            <Typography className={classes.agree}>
              <Checkbox
                color=""
                inputProps={{ "aria-label": "checkbox with default color" }}
                className={classes.checkbox}
              />
              <span className={classes.text}>
                I agree that my submission date is
              </span>{" "}
              <span className={classes.span}>Collected and Started.</span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactUs;
