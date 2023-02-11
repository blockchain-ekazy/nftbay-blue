import { withStyles, InputBase } from "@material-ui/core";
const InputField = withStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    border: "2px solid #17D7F5",
    borderRadius: "21px",
    height: "42px",
    position: "relative",
    color: "#ffffff",
    fontSize: "14px",
    width: "100%",
    padding: "0 20px",
    "&.Mui-focused": {
      borderColor: "#17D7F5",
      transition: "0.5s ease",
    },
  },
}))(InputBase);
export default InputField;
