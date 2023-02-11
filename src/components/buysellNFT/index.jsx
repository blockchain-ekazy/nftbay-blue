import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import InsertPhotoOutlinedIcon from "@material-ui/icons/InsertPhotoOutlined";
import LocalAtmOutlinedIcon from "@material-ui/icons/LocalAtmOutlined";
const BuySellNFT = () => {
  const classes = useStyle();
  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.title}>
        <Typography variant="h1">Buy and sell your NFTs</Typography>
        <Typography variant="h3" className={classes.typoService}>
          1% Service Fees on NFTBay
        </Typography>
      </Box>
      <Box className={classes.container}>
        {" "}
        <Box className={classes.outerContainer}>
          <Box>
            <AccountBalanceWalletOutlinedIcon className={classes.icon} />
          </Box>
          <Box className={classes.despContainer}>
            <Typography variant="h1" className={classes.heading}>
              Set up your wallet
            </Typography>
            <Typography variant="h3" className={classes.description}>
              Connect your MetaMask, Coinbase or TrustWallet. If you don't have
              one already follow these simple instructions
            </Typography>
          </Box>
        </Box>
        <Box className={classes.outerContainer}>
          <Box>
            <InsertPhotoOutlinedIcon className={classes.icon} />
          </Box>
          <Box className={classes.despContainer}>
            <Typography variant="h1" className={classes.heading}>
              Mint NFT
            </Typography>
            <Typography variant="h3" className={classes.description}>
              Connect your MetaMask, Coinbase or TrustWallet. If you don't have
              one already follow these simple instructions
            </Typography>
          </Box>
        </Box>
        <Box className={classes.outerContainer}>
          <Box>
            <LocalAtmOutlinedIcon className={classes.icon} />
          </Box>
          <Box className={classes.despContainer}>
            <Typography variant="h1" className={classes.heading}>
              List them for sale
            </Typography>
            <Typography variant="h3" className={classes.description}>
              Connect your MetaMask, Coinbase or TrustWallet. If you don't have
              one already follow these simple instructions
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BuySellNFT;
const useStyle = makeStyles((theme) => ({
  typoService: {
    color: theme.palette.secondary.main,
    fontSize: 33,
  },
  mainContainer: {
    marginTop: 41,
    marginBottom: 41,
  },
  outerContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 5fr",
    width: 300,
    justifyItems: "center",
    marginTop: 78,
    gap: 20,
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
      width: "100%",
      display: "flex",
    },
  },
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 40,
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
    },
  },
  heading: {
    lineHeight: "57px",
  },
  icon: {
    width: 100,
    height: 60,
    color: theme.palette.secondary.main,
  },
  despContainer: {
    width: 260,
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  description: {
    lineHeight: "30px",
  },
  title: {
    [theme.breakpoints.down("md")]: {
      paddingLeft: "20px",
    },
  },
}));
