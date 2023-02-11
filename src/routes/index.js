import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";
import Layout from "../components/layout";
import Home from "../pages/Home";
import About from "../pages/About";
import UserProfile from "../components/userProfile";
import NFTDetailPage from "../pages/nftdetailpage";
import Explore from "../pages/explore";
import ProfileEdit from "../components/profileEdit";
import FAQs from "../pages/FAQs/index";
import ContactUs from "../pages/contactUs";
import MintPage from "../pages/mintPage/index";
const Routers = () => {
  return (
    <div>
      <Router>
        <Header />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route
            exact
            path="/nftdetailpage"
            element={
              <Layout>
                <NFTDetailPage />
              </Layout>
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <Layout>
                <UserProfile />{" "}
              </Layout>
            }
          />
          <Route
            exact
            path="/ProfileEdit"
            element={
              <Layout>
                <ProfileEdit />
              </Layout>
            }
          />
          <Route
            exact
            path="/explore"
            element={
              <Layout>
                <Explore />
              </Layout>
            }
          />
          <Route
            exact
            path="/FAQs"
            element={
              <Layout>
                <FAQs />
              </Layout>
            }
          />

          <Route
            exact
            path="/contactUs"
            element={
              <Layout>
                <ContactUs />
              </Layout>
            }
          />

          <Route
            exact
            path="/mintpage"
            element={
              <Layout>
                <MintPage />
              </Layout>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default Routers;
