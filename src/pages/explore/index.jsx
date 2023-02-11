import { Box, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useStyle } from "./style";
import SearchBar from "../../components/searchBar/index";
import { FilterOptions } from "../../components/filters";
import Cardabout from "../../components/Cardabout/index";
import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";
const Explore = () => {
  const [data, setData] = useState("");
  const [auctions, setAuctions] = useState([]);
  const [Full, setFull] = useState([]);
  useEffect(() => {
    loadAuctions();
  }, []);

  async function loadAuctions() {
    let d = await getDocs(collection(db, "tokens"));
    let a = [];

    d.forEach((doc) => {
      a.push({
        id: doc.data().id,
        owner: doc.data().owner,
        tokenUri: doc.data().tokenUri,
        price: doc.data().price,
        forAuction: doc.data().forAuction,
        auctionEndTime: doc.data().auctionEndTime,
        highestBidder: doc.data().highestBidder,
        highestBid: doc.data().highestBid,
        _type: doc.data()._type,
        offerPrice: doc.data().offerPrice,
        offerBy: doc.data().offerBy,
        name: doc.data().name,
        description: doc.data().description,
        image: doc.data().image,
        category: doc.data().category,
      });
    });

    setAuctions(a);
    setFull(a);
  }

  const classes = useStyle();

  async function filter() {
    const f = [...Full];
    let n = [];
    let c;
    document.getElementsByName("category").forEach((r) => {
      if (r.checked) c = r.value;
    });
    f.forEach((a) => {
      if (a.category == c) n.push(a);
    });
    setAuctions(n);
  }
  return (
    <Box>
      <Box className={classes.heading}>
        <Typography variant="h1">Explore</Typography>
      </Box>

      {/* <Box className={classes.mainContainer}> */}
      <Box
        className="w-100"
        style={{ gridTemplateColumns: "1fr 3fr", display: "grid" }}
      >
        <Box className={classes.innerCotainer}>
          <Box className={classes.searchIcon}>
            <Box>
              <SearchBar
                className={classes.icon}
                placeholder="search for product"
              />
            </Box>
            <Box>
              <Typography className={classes.title}>
                Product Categories
              </Typography>
            </Box>
          </Box>

          <Box className={classes.list}>
            {/* <li onClick={handleClick}>Art (20)</li>
            <li>Automobiles (20)</li>
            <li>Collectibles (20)</li>
            <li>Domains (20)</li>
            <li>Fashion (20)</li>
            <li>Memes (20)</li>
            <li>MetaVerse (Virtual) Land (20)</li>
            <li>PFP's (20)</li>
            <li>Real State (20)</li>
            <li>Sports (20)</li>
            <li>Uncategorized (20)</li>
            <li>Video Games Items (20)</li> */}
            <form className="filter" onChange={() => filter()}>
              <label className="form-check-label">
                <input
                  type="radio"
                  className="form-check-input"
                  name="category"
                  value="Art"
                />
                Art
              </label>
              <label className="form-check-label">
                <input
                  type="radio"
                  className="form-check-input"
                  name="category"
                  value="Collectibles"
                />
                Collectibles
              </label>
              <label className="form-check-label">
                <input
                  type="radio"
                  className="form-check-input"
                  name="category"
                  value="Domains"
                />
                Domains
              </label>
              <label className="form-check-label">
                <input
                  type="radio"
                  className="form-check-input"
                  name="category"
                  value="Sports"
                />
                Sports
              </label>
              <label className="form-check-label">
                <input
                  type="radio"
                  className="form-check-input"
                  name="category"
                  value="Real Estate"
                />
                Real Estate
              </label>
              <label className="form-check-label">
                <input
                  type="radio"
                  className="form-check-input"
                  name="category"
                  value="Automobiles"
                />
                Automobiles
              </label>
              <label className="form-check-label">
                <input
                  type="radio"
                  className="form-check-input"
                  name="category"
                  value="Fashion"
                />
                Fashion
              </label>
              <label className="form-check-label">
                <input
                  type="radio"
                  className="form-check-input"
                  name="category"
                  value="Metaverse (Virtual) Land"
                />
                Metaverse (Virtual) Land
              </label>
              <label className="form-check-label">
                <input
                  type="radio"
                  className="form-check-input"
                  name="category"
                  value="Video Game Items"
                />
                Video Game Items
              </label>
              <label className="form-check-label">
                <input
                  type="radio"
                  className="form-check-input"
                  name="category"
                  value="Memes"
                />
                Memes
              </label>
              <label className="form-check-label">
                <input
                  type="radio"
                  className="form-check-input"
                  name="category"
                  value="PFP's"
                />
                PFP's
              </label>
            </form>
          </Box>
          <Box>
            <Typography variant="h1">Filter</Typography>
          </Box>
          <Box>
            <FilterOptions />
          </Box>
        </Box>
        {/* <Box>{data}</Box> */}
        <Box className="row">
          {auctions.map((a, i) => {
            return (
              <div className="col-md-4 col-lg-3 my-4">
                <div className="main-bg" style={{ backgroundColor: "#0A0949" }}>
                  <div className="img">
                    <a href={"/nftdetailpage?id=" + a.id}>
                      <img className="w-100 thumb" src={a.image} />
                    </a>
                  </div>
                  <div className="content">
                    <h1 className="nf pt-3">{a.name}</h1>
                    <p className="text-white">
                      <small>{a.description}</small>
                    </p>
                  </div>
                  {a.forAuction ? (
                    <div className="row">
                      <div className="col-6">
                        <h1 className="txti">Current Bid</h1>
                        <small className="text-white">
                          {a.highestBid / 1e18} ETH
                        </small>
                      </div>
                      <div className="col-6 text-right">
                        <h1 className="txti">Time</h1>
                        {a.auctionEndTime == 0 ? (
                          <small className="text-white">Reserved</small>
                        ) : (
                          <small className="text-white">
                            {new Date(a.auctionEndTime * 1000).toUTCString()}
                          </small>
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {a.price != 0 ? (
                    <div className="row">
                      <div className="col-6">
                        <h1 className="txti">Price</h1>
                      </div>
                      <div className="col-6 text-right">
                        <small className="text-white">
                          {a.price / 1e18} ETH
                        </small>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {a.offerPrice != 0 ? (
                    <div className="row">
                      <div className="col-6">
                        <h1 className="txti">Offer Price</h1>
                      </div>
                      <div className="col-6 text-right">
                        <small className="text-white">
                          {a.offerPrice / 1e18} ETH
                        </small>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {/* <div className="text-center mar pt-2">
                    <a href={"/nftdetailpage?id=" + a.id} className="btn-5">
                      Details
                    </a>
                  </div> */}
                </div>
              </div>
            );
          })}
        </Box>
      </Box>
      {/* </Box> */}
    </Box>
  );
};

export default Explore;
