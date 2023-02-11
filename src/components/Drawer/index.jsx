import { Drawer, ListItem, ListItemText, Link, Box } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import React from "react";
import { makeStyles } from "@material-ui/styles";

const Drawerbtn = ({ open, handleClose }) => {
  const classes = useStyle();
  return (
    <>
      <Box>
        <Drawer style={{ marginTop: "100px" }} open={open} anchor="right">
          <ListItem button onClick={handleClose} className={classes.listItem}>
            <ArrowForwardIosIcon onClick={handleClose} />
          </ListItem>
          <ListItem button>
            <a href="/mintpage">
              <ListItemText primary={"Create"} className={classes.listItem} />
            </a>
          </ListItem>

          <ListItem button>
            <a href="/">
              <ListItemText primary={"Home"} className={classes.listItem} />
            </a>
          </ListItem>
          {/* <ListItem button>
            <ListItemText
              primary={"MarketPlace"}
              className={classes.listItem}
            />
          </ListItem> */}
          <ListItem button>
            <a href="/explore">
              <ListItemText primary={"Explore"} className={classes.listItem} />
            </a>
          </ListItem>
          <ListItem button>
            <a href="/about">
              <ListItemText primary={"About Us"} className={classes.listItem} />
            </a>
          </ListItem>
          <ListItem button>
            <a href="/faqs">
              <ListItemText primary={"FAQ"} className={classes.listItem} />
            </a>
          </ListItem>
          <ListItem button>
            <a href="/contactus">
              <ListItemText primary={"CONTACT"} className={classes.listItem} />
            </a>
          </ListItem>
        </Drawer>
      </Box>
    </>
  );
};
export default Drawerbtn;
const useStyle = makeStyles((theme) => ({
  mainContainer: {
    background: "white",
  },
  listItem: {
    color: theme.palette.primary.main,
  },
}));
