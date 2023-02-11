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
            <ListItemText primary={"Create"} className={classes.listItem} />
          </ListItem>

          <ListItem button>
            <ListItemText primary={"Home"} className={classes.listItem} />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary={"MarketPlace"}
              className={classes.listItem}
            />
          </ListItem>
          <ListItem button>
            <ListItemText primary={"Explore"} className={classes.listItem} />
          </ListItem>
          <ListItem button>
            <ListItemText primary={"About Us"} className={classes.listItem} />
          </ListItem>
          <ListItem button>
            <ListItemText primary={"FAQ"} className={classes.listItem} />
          </ListItem>
          <ListItem button>
            <ListItemText primary={"CONTACT"} className={classes.listItem} />
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
