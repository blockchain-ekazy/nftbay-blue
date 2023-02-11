import React, { useState } from "react";
import { Box, IconButton, useMediaQuery } from "@material-ui/core";
import useStyle from "./styles";
import SearchBar from "../searchBar";
import Button from "../Button";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import Logo from "../../assets/logo.png";
import Drawerbtn from "../Drawer";
import MenuIcon from "@material-ui/icons/Menu";

const Header = ({ placeholder, backgroundColor }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const isActive = useMediaQuery("(max-width: 860px)");
  const isDeactive = useMediaQuery("(min-width: 860px)");
  const blocked = useMediaQuery("(min-width: 1100px)");
  const classes = useStyle();
  return (
    <Box className={classes.mainContainer}>
      <Box>
        <a href="/">
          {" "}
          <img src={Logo} alt="" className={classes.logo} />
        </a>
      </Box>
      <Box className={classes.searchBar}>
        <SearchBar placeholder="Search" backgroundColor="black" />
      </Box>
      {isDeactive && (
        <Box className={classes.navLinks}>
          <a href="/" className={classes.links} variant="h3">
            Home
          </a>
          <a
            className={classes.links}
            variant="h3"
            component={Link}
            href="/explore"
          >
            Explore
          </a>
          <a href="/about" className={classes.links} variant="h3">
            About Us
          </a>
          <a href="/FAQs" className={classes.links} variant="h3">
            FAQ
          </a>
          <a href="/contactUs" className={classes.links} variant="h3">
            CONTACT
          </a>
        </Box>
      )}
      {blocked && (
        <Box>
          <a href="/mintpage" className={classes.links} variant="h3">
            <Button variant="contained" className={classes.connectButton}>
              Create Item
            </Button>
          </a>
        </Box>
      )}
      {blocked && (
        <a href="/profile">
          <Box>
            <AccountCircleOutlinedIcon
              color="primary"
              className={classes.profileIcon}
              fontSize="large"
            />
          </Box>
        </a>
      )}
      <Box>
        {isActive && (
          <div>
            <IconButton style={{ color: "white" }} onClick={handleOpen}>
              <MenuIcon fontSize="large" />
            </IconButton>
            <Drawerbtn open={open} handleClose={handleClose} />
          </div>
        )}
      </Box>
    </Box>
  );
};
export default Header;
