import { createTheme } from "@material-ui/core/styles";
const theme = createTheme({
  fontFamily: "Poppins, sans-serif",
  fontStyle: "normal",
  fontWeight: "normal",
  palette: {
    primary: {
      main: "#17D7F5",
    },
    secondary: {
      main: "#5558F3",
    },
    background: {
      default: "#060C2E",
      paper: "#0A0949",
    },
    text: {
      primary: "#ffffff",
    },
  },
  typography: {
    //REMOVE COLOR KEY FROM ALL OBJECTS
    //FONT SIZE AND WEIGHT ASSIGNMENT IS INCORRECT
    //H1>H2>H3>....
    h1: {
      fontSize: "36px",
      color: "#ffffff",
      fontWeight: "800",
    },
    h2: {
      fontSize: "27px",
      fontWeight: "400",
      color: "#ffffff",
    },
    h3: {
      fontSize: "22px",
      color: "#ffffff",
      fontWeight: "500",
    },
    h4: {
      fontSize: "23px",
      color: "#17D7F5",
      fontWeight: "600",
    },
    h5: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#ffffff",
    },
  },
});

export default theme;
