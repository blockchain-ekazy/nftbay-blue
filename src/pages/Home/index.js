import { Box } from "@material-ui/core";
import React from "react";
import Authors from "../../components/authors";
import Banner from "../../components/banner";
import BuySellNFT from "../../components/buysellNFT";
import DeatailImages from "../../components/detailedImages";
import Layout from "../../components/layout";
import TopSellers from "../../components/topsellers";
import useStyle from "./style";
export const Home = () => {
  const classes = useStyle();
  return (
    <Box className={classes.container}>
      <Box className={classes.mainContainer}>
        <Box>
          <Authors />
        </Box>
        <Box>
          <Banner />
        </Box>
      </Box>
      <Box>
        <TopSellers />
      </Box>
      <Layout>
        <BuySellNFT />
      </Layout>
      <Box>
        <DeatailImages />
      </Box>
    </Box>
  );
};

export default Home;
