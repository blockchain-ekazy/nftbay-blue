import { Box, Button, Typography } from "@material-ui/core";
import React from "react";
import ImageOne from "../../assets/Image1.png";
import ImageTwo from "../../assets/Image2.png";
import ImageThree from "../../assets/Image3.png";
import ImageFour from "../../assets/Image4.png";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import { makeStyles } from "@material-ui/core";
const DeatailImages = () => {
  const classes = useStyle();
  return (
    <Box className={classes.OuterContainer}>
      <Box className={classes.mainContainer}>
        <Box className={classes.innerContainer}>
          <Typography variant="h1" className={classes.title}>
            ART
          </Typography>
          <img src={ImageOne} alt="" className={classes.image} />
        </Box>
        <Button className={classes.viewAllButton}>
          View All <ArrowForwardOutlinedIcon />{" "}
        </Button>
      </Box>
      <Box className={classes.mainContainer}>
        <Box className={classes.innerContainer}>
          <Typography variant="h1" className={classes.title}>
            AUTOMOBILES
          </Typography>
          <img src={ImageTwo} alt="" className={classes.image} />
        </Box>
        <Button className={classes.viewAllButton}>
          View All <ArrowForwardOutlinedIcon />{" "}
        </Button>
      </Box>
      <Box className={classes.mainContainer}>
        <Box className={classes.innerContainer}>
          <Typography variant="h1" className={classes.title}>
            METAVERSE
          </Typography>
          <img src={ImageThree} alt="" className={classes.image} />
        </Box>
        <Button className={classes.viewAllButton}>
          View All <ArrowForwardOutlinedIcon />{" "}
        </Button>
      </Box>
      <Box className={classes.mainContainer}>
        <Box className={classes.innerContainer}>
          <Typography variant="h1" className={classes.title}>
            VIDEOGAMES <br />
            ITEMS
          </Typography>
          <img src={ImageFour} alt="" className={classes.image} />
        </Box>
        <Button className={classes.viewAllButton}>
          View All <ArrowForwardOutlinedIcon />{" "}
        </Button>
      </Box>
    </Box>
  );
};

export default DeatailImages;

const useStyle = makeStyles((theme) => ({
  OuterContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    margin: 0,
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
    },
  },
  mainContainer: {
    position: "relative",
  },
  viewAllButton: {
    color: theme.palette.primary.main,
    position: "absolute",
    top: "90%",
    left: "3%",
    transition: ".25s ease",
    "&:hover": {
      color: theme.palette.primary.dark,
      transition: ".25s ease",
    },
  },
  image: {
    width: "100%",
    height: 565,
    objectFit: "cover",
  },
  title: {
    position: "absolute",
    top: "10%",
    left: "4%",
  },
}));
