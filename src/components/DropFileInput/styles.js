import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles(() => ({
  leftleft: {
    display: "flex",
    border: "2px solid #17D7F5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  subHeading: {
    fontFamily: "Poppins,sans-serif",
    cursor: "default",
    userSelect: "none",
  },
  mainTag: {
    display: "none",
  },
  mainLabel: {
    fontFamily: "Poppins, sans-serif",
  },
  label: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    border: " 1px solid #E7EB21",
    borderRadius: 10,
    padding: "65px 0px",
    position: "relative",
    "& .drag_n_drop": {
      display: "flex",
      justifyContent: "center",
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
  innerLabel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontFamily: "Poppins,sans-serif",
    color: "#777E90",
    fontSize: "30px",
    "& p": {
      fontSize: "12px",
    },
  },
  upload: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  drag: {
    fontSize: "19.68px",
    color: " #17D7F5",
    fontFamily: "poppins",
    fontWeight: "",
  },
  uploadicon: {
    color: "#17D7F5",
  },
  error: {
    fontSize: 14,
    color: "#F44336",
  },
}));
