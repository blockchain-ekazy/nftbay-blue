import { Box, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/styles";
import imageOne from "../../assets/ME.jpeg";
import { Link } from "react-router-dom";
const TopSellers = () => {
  const classes = useStyle();
  return (
    <Box className={classes.outerContainer}>
      <Box className={classes.title}>
        <Typography variant="h1">Top Sellers</Typography>
      </Box>
      <Box className={classes.mainContainer}>
        <Box className={classes.container}>
          <Box className={classes.imageContainer}>
            {" "}
            <Link to="/profile">
              <img className={classes.imageOne} src={imageOne} alt="" />
            </Link>
          </Box>
          <Link to="/profile">
            <Box className={classes.topSellerProfile}>
              <Typography variant="h5" className={classes.profileLink}>
                @ YZZKmag
              </Typography>
              <Typography variant="h5">alikhan</Typography>
            </Box>
          </Link>
        </Box>
        <Box className={classes.container}>
          <Link to="/profile">
            {" "}
            <img className={classes.imageOne} src={imageOne} alt="" />
            <Box className={classes.topSellerProfile}>
              <Typography variant="h5" className={classes.profileLink}>
                @ YZZKmag
              </Typography>
              <Typography variant="h5">SaqibAmin</Typography>
            </Box>
          </Link>
        </Box>
        <Box className={classes.container}>
          <Link to="/profile">
            <img className={classes.imageOne} src={imageOne} alt="" />

            <Box className={classes.topSellerProfile}>
              <Typography variant="h5" className={classes.profileLink}>
                @ YZZKmag
              </Typography>
              <Typography variant="h5">SaqibAmin</Typography>
            </Box>
          </Link>
        </Box>
        <Box className={classes.container}>
          <Link to="/profile">
            <img className={classes.imageOne} src={imageOne} alt="" />
            <Box className={classes.topSellerProfile}>
              <Typography variant="h5" className={classes.profileLink}>
                @ YZZKmag
              </Typography>
              <Typography variant="h5">SaqibAmin</Typography>
            </Box>
          </Link>
        </Box>
        <Box className={classes.container}>
          <Link to="/profile">
            <img className={classes.imageOne} src={imageOne} alt="" />
            <Box
              className={classes.topSellerProfile}
              component={Link}
              to="/profile"
            >
              <Typography variant="h5" className={classes.profileLink}>
                @ YZZKmag
              </Typography>
              <Typography variant="h5">SaqibAmin</Typography>
            </Box>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default TopSellers;

const useStyle = makeStyles((theme) => ({
  outerContainer: {
    marginTop: 131,
    [theme.breakpoints.down("md")]: {
      marginTop: 100,
    },
  },
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    gap: 72.5,
    marginTop: 33,
    [theme.breakpoints.down("md")]: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 20,
    },
  },
  sellerContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 21,
  },
  imageContainer: {
    width: 177,
    height: 177,
  },
  SellerOne: {
    width: 380,
    height: 80,
    background: "linear-gradient(270.48deg, #0F1952 -10.2%, #151A33 93.45%)",
    marginTop: 27,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imageOne: {
    borderRadius: "50%",
    width: 177,
    height: 177,
    objectFit: "cover ",
    cursor: "pointer",
  },
  topSellerProfile: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 7,
    marginTop: 23,
    textDecoration: "none",
  },
  profileLink: {
    textStyle: "none",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    paddingLeft: 70,
    [theme.breakpoints.down("md")]: {
      paddingLeft: "30px",
    },
  },
}));
