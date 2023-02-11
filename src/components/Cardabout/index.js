import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import React from "react";
import HalfRating from "../rating";
import { data } from "./array";
import { makeStyles } from "@material-ui/core";
const Cardabout = () => {
  const classes = useStyles();
  return (
    <Box className={classes.outerContainer}>
      {data.map(({ Icon, ...item }, i) => {
        return (
          <Box className={classes.mainContainer} key={i}>
            <Box>
              <img src={item.img} alt="" className={classes.forImg} />
            </Box>
            <Box className={classes.innerContainer}>
              <Box>
                {" "}
                <Typography key={item.id}>{item.title}</Typography>
              </Box>
              <Box>
                <Typography key={item.id}>{item.price}</Typography>
              </Box>
              <Box>
                <HalfRating />
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default Cardabout;
const useStyles = makeStyles((theme) => ({
  outerContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gap: 20,
    marginTop: 20,
    paddingBottom: 25,
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr 1fr",
      justifyContent: "space-between",
    },
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "1fr",
      justifyContent: "space-between",
    },
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
  forImg: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
}));
