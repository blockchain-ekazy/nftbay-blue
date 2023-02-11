import { Box } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/styles";

const FormInput = ({ name, Icon }) => {
  const classes = useStyle();
  return (
    <Box>
      <Box className={classes.input}>
        <Box className={classes.inner}>
          <Icon className={classes.icon} />

          <input placeholder={name} className={classes.inputField} />
        </Box>
        {/* <hr className={classes.hr} /> */}
      </Box>
    </Box>
  );
};

export default FormInput;

const useStyle = makeStyles((theme) => ({
  inner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    gap: 5,
  },
  input: {
    borderBottom: "1.75168px solid #FFFFFF",
    padding: 5,
  },
  inputField: {
    outline: "none",
    background: "transparent",
    border: "none",
    color: "#ffffff",
    "& ::placeholder": {
      color: theme.palette.text.primary,
    },
  },
  icon: {
    color: theme.palette.text.primary,
    fontSize: 23,
  },
}));
