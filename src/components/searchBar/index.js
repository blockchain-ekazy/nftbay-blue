import { Box, IconButton } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
const SearchBar = ({ placeholder, backgroundColor }) => {
  const classes = useStyle();
  return (
    <Box className={classes.inputContainer}>
      <Box>
        <input
          className={classes.input}
          type="text"
          placeholder={placeholder}
        />
      </Box>
      <Box>
        <IconButton size="small" className={classes.searchButton}>
          <SearchIcon color="primary" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SearchBar;

const useStyle = makeStyles((theme) => ({
  inputContainer: {
    display: "flex",
    alignItems: "center",
    border: `3px solid ${theme.palette.primary.main}`,
    borderRadius: 25,
    padding: "5px 10px",
  },
  input: {
    border: "none",
    backgroundColor: "transparent",
    width: "100%",
    height: 24,
    fontFamily: theme.fontFamily,
    color: "rgba(255, 255, 255, 0.43)",
    "&:focus": {
      outline: "none",
    },
    "&::placeholder": {
      color: "rgba(255, 255, 255, 0.43)",
    },
    [theme.breakpoints.down("sm")]: {
      "&::placeholder": {
        textAlign: "center",
      },
    },
  },
  searchButton: {
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
    [theme.breakpoints.down("md")]: {},
  },
}));
