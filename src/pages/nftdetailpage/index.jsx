import { Box, Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import NFTDetailImage from "../../assets/nftDetail.png";
import ButtonTwo from "../../components/Button/index";
import { makeStyles } from "@material-ui/styles";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Cardabout from "../../components/Cardabout";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

import abiADMIN from "../../chaininfo/adminabi.json";
import {
  contractADMIN,
  PROVIDER,
  NETWORK,
  NETWORKNAME,
} from "../../chaininfo/contracts";

const ethers = require("ethers");

const NFTDetailPage = () => {
  const classes = useStyle();
  const [counter, setCounter] = useState(1);
  const incrementCounter = () => {
    setCounter(counter + 1);
  };
  const decrementCounter = () => {
    setCounter(counter - 1);
  };

  const [auction, setAuction] = useState({
    id: 0,
    owner: "",
    tokenUri: "",
    price: 0,
    forAuction: false,
    auctionEndTime: 0,
    highestBidder: "",
    highestBid: 0,
    _type: 0,
    offerPrice: "",
    offerBy: "",
    name: "",
    description: "",
    category: "",
    image: "./imgs/empty.png",
  });
  const [address, setAddress] = useState("");
  const [id, setId] = useState(0);
  const [modalbox, setModalbox] = useState(<></>);

  useEffect(() => {
    let id = new URLSearchParams(window.location.search).get("id");
    loadAuction(id);
    setId(id);
  }, []);

  const loadAuction = async (id) => {
    console.log(auction.auctionEndTime < Date.now() / 1000);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let m = await provider.send("eth_requestAccounts", []);
    setAddress(m[0].toLowerCase());

    let dbRef = doc(db, "tokens", String(id));
    let res = await getDoc(dbRef);

    setAuction({
      id: res.data().id,
      owner: res.data().owner,
      tokenUri: res.data().tokenUri,
      price: res.data().price,
      forAuction: res.data().forAuction,
      auctionEndTime: res.data().auctionEndTime,
      highestBidder: res.data().highestBidder,
      highestBid: res.data().highestBid,
      _type: res.data()._type,
      offerPrice: res.data().offerPrice,
      offerBy: res.data().offerBy,
      name: res.data().name,
      description: res.data().description,
      image: res.data().image,
      category: res.data().category,
    });
  };

  function sell() {
    setModalbox(
      <>
        <div className="singlemodal" onClick={() => setModalbox("")}></div>
        <div className="card modalcard p-2 text-center">
          Enter Sale Price
          <input className="form-control py-0" id="saleprice" />
          <button
            className="btn btn-theme"
            onClick={() =>
              sellmodal(document.getElementById("saleprice").value)
            }
          >
            CONFIRM
          </button>
          {/* </div> */}
        </div>
      </>
    );
  }
  async function sellmodal(p) {
    setModalbox(<></>);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let m = await provider.send("eth_requestAccounts", []);
    m = m[0];
    const ct = new ethers.Contract(contractADMIN, abiADMIN, signer);

    // await toast.promise(
    //   async () => {
    let tx = await ct.setPrice(id, String(p * 1e18));
    let req = await tx.wait().then(async (receipt) => {
      let auc = auction;
      auc.price = p * 1e18;

      let dbRef = doc(db, "tokens", String(id));
      await updateDoc(dbRef, auc);

      dbRef = doc(db, "activity", String(m));
      let res = (await getDoc(dbRef)).data().items;
      if (res.exists()) res = res.data().items;
      else res = [];

      if (Object.keys(res).length == 0) res = new Array();
      res.push({
        type: "LIST",
        time: Date.now(),
        tokenName: auction.name,
        txhash: receipt.transactionHash,
        id: auction.id,
      });
      await setDoc(dbRef, { items: res });
    });
    //   },
    //   {
    //     pending: "Waiting Confirmation on blockchain!!",
    //     success: "Success!!",
    //     error: "Failed!!",
    //   }
    // );
  }

  async function cancelListing() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let m = await provider.send("eth_requestAccounts", []);
    m = m[0];
    const ct = new ethers.Contract(contractADMIN, abiADMIN, signer);

    // await toast.promise(
    //   async () => {
    let tx = await ct.cancelListing(id);
    let req = await tx.wait().then(async (receipt) => {
      let auc = auction;
      auc.price = 0;

      let dbRef = doc(db, "tokens", String(id));
      await updateDoc(dbRef, auc);

      dbRef = doc(db, "activity", String(m));
      let res = (await getDoc(dbRef)).data().items;
      if (res.exists()) res = res.data().items;
      else res = [];

      if (Object.keys(res).length == 0) res = new Array();
      res.push({
        type: "CANCEL LISTING",
        time: Date.now(),
        tokenName: auction.name,
        txhash: receipt.transactionHash,
        id: auction.id,
      });
      await setDoc(dbRef, { items: res });
    });
    //   },
    //   {
    //     pending: "Waiting Confirmation on blockchain!!",
    //     success: "Success!!",
    //     error: "Failed!!",
    //   }
    // );
  }

  function auctionModal() {
    setModalbox(
      <>
        <div className="singlemodal" onClick={() => setModalbox("")}></div>
        <div className="card modalcard p-2 text-center">
          Enter Minimum Bid Price
          <input className="form-control py-0" id="saleprice" required />
          Select Auction Type
          <label>
            <input type="radio" name="atype" value="2" required /> Schedule
          </label>
          <label>
            <input type="radio" name="atype" value="1" required /> Reserve
          </label>
          <button
            className="btn btn-theme"
            onClick={() =>
              startAuction(document.getElementById("saleprice").value)
            }
          >
            CONFIRM
          </button>
        </div>
      </>
    );
  }

  async function startAuction(a) {
    let c;
    document.getElementsByName("atype").forEach((r) => {
      if (r.checked) c = r.value;
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let m = await provider.send("eth_requestAccounts", []);
    m = m[0];
    const ct = new ethers.Contract(contractADMIN, abiADMIN, signer);

    // await toast.promise(
    //   async () => {
    let tx = await ct.startAuction(id, Number(c), Number(a) * 1e18);
    let req = await tx.wait().then(async (receipt) => {
      let auc = auction;
      auc.forAuction = true;
      auc.auctionEndTime = Date.now() / 1000;
      auc.highestBid = a * 1e18;
      auc._type = c;

      let dbRef = doc(db, "tokens", String(id));
      await updateDoc(dbRef, auc);

      dbRef = doc(db, "activity", String(m));
      let res = await getDoc(dbRef);

      if (res.exists()) res = res.data().items;
      else res = [];

      if (Object.keys(res).length == 0) res = new Array();
      res.push({
        type: "START AUCTION",
        time: Date.now(),
        tokenName: auction.name,
        txhash: receipt.transactionHash,
        id: auction.id,
        value: 0,
      });
      await setDoc(dbRef, { items: res });
    });
    //   },
    //   {
    //     pending: "Waiting Confirmation on blockchain!!",
    //     success: "Success!!",
    //     error: "Failed!!",
    //   }
    // );
  }

  async function endAuction() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let m = await provider.send("eth_requestAccounts", []);
    m = m[0];
    const ct = new ethers.Contract(contractADMIN, abiADMIN, signer);

    // await toast.promise(
    //   async () => {
    let tx = await ct.endAuction(id);
    let req = await tx.wait().then(async () => {
      let auc = auction;
      auc.forAuction = false;
      auc.auctionEndTime = 0;
      auc.highestBidder = "0x0000000000000000000000000000000000000000";
      auc.highestBid = "0x0000000000000000000000000000000000000000";
      auc._type = 0;

      let dbRef = doc(db, "tokens", String(id));
      await updateDoc(dbRef, auc);
    });
    //   },
    //   {
    //     pending: "Waiting Confirmation on blockchain!!",
    //     success: "Success!!",
    //     error: "Failed!!",
    //   }
    // );
  }

  function bid() {
    setModalbox(
      <>
        <div className="singlemodal" onClick={() => setModalbox("")}></div>
        <div className="card modalcard p-2 text-center">
          Enter Your Bid Price
          <br />
          <small>
            Minumum Bid Price <strong>{auction.highestBid / 1e18} ETH</strong>
          </small>
          <input className="form-control py-0" id="saleprice" required />
          <button
            className="btn btn-theme"
            onClick={() => startbid(document.getElementById("saleprice").value)}
          >
            CONFIRM
          </button>
        </div>
      </>
    );
  }

  async function startbid(a) {
    if (a <= auction.highestBid / 1e18) {
      alert("Bid value should be higher than existing price");
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let m = await provider.send("eth_requestAccounts", []);
    m = m[0];
    const ct = new ethers.Contract(contractADMIN, abiADMIN, signer);

    // await toast.promise(
    //   async () => {
    let tx = await ct.placeBid(id, {
      value: String(a * 1e18),
    });
    let req = await tx.wait().then(async (receipt) => {
      let auc = auction;
      auc.highestBidder = m;
      auc.highestBid = a * 1e18;

      let dbRef = doc(db, "tokens", String(id));
      await updateDoc(dbRef, auc);

      dbRef = doc(db, "activity", String(m));
      let res = await getDoc(dbRef);

      if (res.exists()) res = res.data().items;
      else res = [];

      if (Object.keys(res).length == 0) res = new Array();
      res.push({
        type: "BID",
        time: Date.now(),
        tokenName: auction.name,
        txhash: receipt.transactionHash,
        id: auction.id,
        value: String(a * 1e18),
      });
      await setDoc(dbRef, { items: res });
    });
    //   },
    //   {
    //     pending: "Waiting Confirmation on blockchain!!",
    //     success: "Success!!",
    //     error: "Failed!!",
    //   }
    // );
  }

  function giveoffer() {
    setModalbox(
      <>
        <div className="singlemodal" onClick={() => setModalbox("")}></div>
        <div className="card modalcard p-2 text-center">
          Enter Your OFFER Price
          <br />
          <small>
            CURRENT OFFER <strong>{auction.offerPrice / 1e18} ETH</strong>
          </small>
          <input className="form-control py-0" id="saleprice" required />
          <button
            className="btn btn-theme"
            onClick={() =>
              placeoffer(document.getElementById("saleprice").value)
            }
          >
            CONFIRM
          </button>
        </div>
      </>
    );
  }

  async function placeoffer(a) {
    if (a <= auction.offerPrice / 1e18) {
      alert("Bid offer should be higher than existing offer");
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let m = await provider.send("eth_requestAccounts", []);
    m = m[0];
    const ct = new ethers.Contract(contractADMIN, abiADMIN, signer);

    // await toast.promise(
    //   async () => {
    let tx = await ct.offer(id, {
      value: String(a * 1e18),
    });
    let req = await tx.wait().then(async (receipt) => {
      let auc = auction;
      auc.offerBy = m;
      auc.offerPrice = a * 1e18;

      let dbRef = doc(db, "tokens", String(id));
      await updateDoc(dbRef, auc);

      dbRef = doc(db, "activity", String(m));
      let res = await getDoc(dbRef);

      if (res.exists()) res = res.data().items;
      else res = [];

      if (Object.keys(res).length == 0) res = new Array();
      res.push({
        type: "OFFER",
        time: Date.now(),
        tokenName: auction.name,
        txhash: receipt.transactionHash,
        id: auction.id,
        value: String(a * 1e18),
      });
      await setDoc(dbRef, { items: res });
    });
    //   },
    //   {
    //     pending: "Waiting Confirmation on blockchain!!",
    //     success: "Success!!",
    //     error: "Failed!!",
    //   }
    // );
  }

  async function acceptOffer() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let m = await provider.send("eth_requestAccounts", []);
    m = m[0];
    const ct = new ethers.Contract(contractADMIN, abiADMIN, signer);

    // await toast.promise(
    //   async () => {
    let tx = await ct.acceptOffer(id);
    let req = await tx.wait().then(async (receipt) => {
      let auc = auction;
      auc.offerBy = "0x0000000000000000000000000000000000000000";
      auc.offerPrice = 0;

      let dbRef = doc(db, "tokens", String(id));
      await updateDoc(dbRef, auc);

      dbRef = doc(db, "activity", String(m));
      let res = await getDoc(dbRef);

      if (res.exists()) res = res.data().items;
      else res = [];

      if (Object.keys(res).length == 0) res = new Array();
      res.push({
        type: "ACCEPT OFFER",
        time: Date.now(),
        tokenName: auction.name,
        txhash: receipt.transactionHash,
        id: auction.id,
        value: auction.offerPrice * 1e18,
      });
      await setDoc(dbRef, { items: res });
    });
    //   },
    //   {
    //     pending: "Waiting Confirmation on blockchain!!",
    //     success: "Success!!",
    //     error: "Failed!!",
    //   }
    // );
  }

  async function cancel() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let m = await provider.send("eth_requestAccounts", []);
    m = m[0];
    const ct = new ethers.Contract(contractADMIN, abiADMIN, signer);

    // await toast.promise(
    //   async () => {
    let tx = await ct.cancelListing(id);
    let req = await tx.wait().then(async (receipt) => {
      let auc = auction;
      auc.price = 0;

      let dbRef = doc(db, "tokens", String(id));
      await updateDoc(dbRef, auc);

      dbRef = doc(db, "activity", String(m));
      let res = await getDoc(dbRef);

      if (res.exists()) res = res.data().items;
      else res = [];

      if (Object.keys(res).length == 0) res = new Array();
      res.push({
        type: "CANCEL LISTING",
        time: Date.now(),
        tokenName: auction.name,
        txhash: receipt.transactionHash,
        id: auction.id,
        value: 0,
      });
      await setDoc(dbRef, { items: res });
    });
    //   },
    //   {
    //     pending: "Waiting Confirmation on blockchain!!",
    //     success: "Success!!",
    //     error: "Failed!!",
    //   }
    // );
  }

  async function buy() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let m = await provider.send("eth_requestAccounts", []);
    m = m[0];
    const ct = new ethers.Contract(contractADMIN, abiADMIN, signer);

    // await toast.promise(
    //   async () => {
    let tx = await ct.offer(id, {
      value: String(auction.price * 1e18),
    });
    let req = await tx.wait().then(async (receipt) => {
      let auc = auction;
      auc.owner = m;
      auc.price = 0;

      let dbRef = doc(db, "tokens", String(id));
      await updateDoc(dbRef, auc);

      dbRef = doc(db, "activity", String(m));
      let res = await getDoc(dbRef);

      if (res.exists()) res = res.data().items;
      else res = [];

      if (Object.keys(res).length == 0) res = new Array();
      res.push({
        type: "BUY",
        time: Date.now(),
        tokenName: auction.name,
        txhash: receipt.transactionHash,
        id: auction.id,
        value: String(auc.price * 1e18),
      });
      await setDoc(dbRef, { items: res });
    });
    //   },
    //   {
    //     pending: "Waiting Confirmation on blockchain!!",
    //     success: "Success!!",
    //     error: "Failed!!",
    //   }
    // );
  }
  return (
    <Box>
      <Box className={classes.mainContainer}>
        <Box>
          <img src={auction.image} alt="" className={classes.detailImage} />
        </Box>
        <Box className={classes.innerContainer}>
          <Box>
            {" "}
            <Typography variant="h1">{auction.name}</Typography>
          </Box>
          <Box className={classes.decription}>
            <Typography variant="h3">{auction.description}</Typography>
          </Box>

          {/* <Box className={classes.forCurBitOuter}>
            <Typography variant="h3" className={classes.forCurBit}>
              current bid:
            </Typography>
            <Typography variant="h4">1.09 ETH</Typography>
          </Box> */}
          <Box className={classes.buttonContainer}>
            {/* <Button className={classes.counterButton} variant="h2">
              {counter}
            </Button>

            <Box className={classes.incDecButton}>
              <ExpandLessIcon
                className={classes.arrows}
                onClick={incrementCounter}
              />
              <ExpandMoreIcon
                className={classes.arrows}
                onClick={decrementCounter}
              />
            </Box> */}

            {/* <ButtonTwo className={classes.buyNowButton}> BUY NOW</ButtonTwo> */}
            <div className="text-white">
              {auction.forAuction ? (
                <div className="date">
                  Auction End Time
                  <br />
                  <strong>
                    {new Date(auction.auctionEndTime * 1000).toLocaleString()}
                  </strong>
                  <br />
                  {auction.auctionEndTime > Date.now() / 1000 ||
                  auction._type == "1" ? (
                    <>
                      <ButtonTwo
                        className={classes.buyNowButton}
                        onClick={() => bid()}
                      >
                        PLACE BID
                      </ButtonTwo>
                      <br className="mb-4" />
                    </>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
              {auction.price != 0 ? (
                <>
                  <strong>SALE PRICE</strong>{" "}
                  <h5 className="d-inline-block">
                    {(auction.price / 1e18).toFixed(4)} ETH
                  </h5>
                  <br className="mb-2" />
                  {auction.owner != address ? (
                    <>
                      <ButtonTwo
                        className={classes.buyNowButton}
                        onClick={() => buy()}
                      >
                        BUY NOW
                      </ButtonTwo>
                      <br className="mb-4" />
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
              {auction.offerPrice != 0 ? (
                <>
                  <strong>BEST OFFER</strong>{" "}
                  <h5 className="d-inline">{auction.offerPrice / 1e18} ETH</h5>
                  <br />
                  {auction.offerBy == address ? (
                    <ButtonTwo
                      className={classes.buyNowButton}
                      onClick={() => cancel()}
                    >
                      CANCEL OFFER
                    </ButtonTwo>
                  ) : (
                    ""
                  )}
                  <br className="mb-2" />
                </>
              ) : (
                ""
              )}
              {auction.owner == address ? (
                <>
                  {auction.offerPrice != 0 ? (
                    <>
                      <ButtonTwo
                        className={classes.buyNowButton}
                        onClick={() => acceptOffer()}
                      >
                        ACCEPT OFFER
                      </ButtonTwo>
                      <br className="mb-4" />
                    </>
                  ) : (
                    ""
                  )}
                  {auction.price == 0 && !auction.forAuction ? (
                    <>
                      <ButtonTwo
                        className={classes.buyNowButton}
                        onClick={() => sell()}
                      >
                        SELL
                      </ButtonTwo>{" "}
                      <ButtonTwo
                        className={classes.buyNowButton}
                        onClick={() => auctionModal()}
                      >
                        AUCTION
                      </ButtonTwo>
                    </>
                  ) : (
                    ""
                  )}
                  {auction.price != 0 ? (
                    <>
                      <ButtonTwo
                        className={classes.buyNowButton}
                        onClick={() => cancelListing()}
                      >
                        CANCEL LISTING
                      </ButtonTwo>
                    </>
                  ) : (
                    ""
                  )}
                  {auction.forAuction &&
                  auction.auctionEndTime < Date.now() / 1000 &&
                  auction._type == 2 ? (
                    <>
                      <ButtonTwo
                        className={classes.buyNowButton}
                        onClick={() => endAuction()}
                      >
                        End AUCTION
                      </ButtonTwo>
                    </>
                  ) : (
                    ""
                  )}
                  {auction.forAuction &&
                  auction.auctionEndTime < Date.now() / 1000 &&
                  auction._type == 1 &&
                  auction.highestBidder !=
                    "0x0000000000000000000000000000000000000000" ? (
                    <>
                      <ButtonTwo
                        className={classes.buyNowButton}
                        onClick={() => endAuction()}
                      >
                        End AUCTION
                      </ButtonTwo>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
              {auction.owner != address ? (
                <>
                  {auction.price == 0 && !auction.forAuction ? (
                    <>
                      <ButtonTwo
                        className={classes.buyNowButton}
                        onClick={() => giveoffer()}
                      >
                        GIVE OFFER
                      </ButtonTwo>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
            </div>
          </Box>
        </Box>
      </Box>
      {/* <Box className={classes.secondMainContainer}>
        <Box>
          <Typography variant="h3">
            Dicta sunt explicabo. Nemo enim ipsam voluptatem voluptas sit odit
            aut fugit, sed quia <br /> consequuntur. Lorem ipsum nonum eirmod
            dolor.
          </Typography>
        </Box>
        <Box>
          <Typography variant="h3">
            Tags Design, External, Item{" "}
            <span style={{ fontWeight: "700" }}>Product ID:</span> 2377
          </Typography>
        </Box>
        <Box className={classes.productDescription}>
          <Box>
            {" "}
            <Typography variant="h3">
              Dicta sunt explicabo. Nemo enim ipsam voluptatem voluptas sit odit
              aut fugit, sed quia consequuntur. Lorem ipsum dolor. Aquia sit
              amet, elitr, sed diam nonum eirmod tempor invidunt labore et
              dolore magna aliquyam.erat, sed diam voluptua. At vero accusam et
              justo duo dolores et ea rebum. Stet clitain vidunt ut labore
              eirmod tempor invidunt magna aliquyam.
            </Typography>
          </Box>
          <Box>
            {" "}
            <Typography variant="h3">Related Products</Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <hr className={classes.underLine} />
      </Box> */}
      <Box>
        <Typography variant="h1">Related Products</Typography>
        <Cardabout />
      </Box>
    </Box>
  );
};

export default NFTDetailPage;

const useStyle = makeStyles((theme) => ({
  mainContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 100,
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      gap: 30,
    },
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 52,
    [theme.breakpoints.down("md")]: {
      gap: 25,
    },
  },
  decription: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    lineHeight: "36px",
  },
  detailImage: {
    width: "100%",
    height: "772px",
    [theme.breakpoints.down("xs")]: {
      objectFit: "contain",
      height: "100%",
      width: "100%",
    },
  },
  buttonContainer: {
    display: "flex",
    gap: 50,
    marginTop: 20,
  },
  forCurBitOuter: {
    [theme.breakpoints.down("md")]: {
      display: "flex",
      alignItems: "center",
    },
  },

  forCurBit: {
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
  incDecButton: {
    display: "flex",
    flexDirection: "column",
    width: "40px",
    background: "white",
    color: theme.palette.secondary.main,
    borderTopRightRadius: "50px",
    borderBottomRightRadius: "50px",
    marginLeft: -53,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  arrows: {
    fontSize: 30,
    cursor: "pointer",
  },
  counterButton: {
    borderTopLeftRadius: "50px",
    borderBottomLeftRadius: "50px",
    width: 111,
    background: "#D3D3D3",
    color: "black",
    fontSize: 19,
    fontWeight: "600",
    "&:hover": {
      background: "#D3D3D3",
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  buyNowButton: {
    width: 206,
    fontSize: 19,
    fontWeight: "600",
  },
  secondMainContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginTop: 20,
  },
  underLine: {
    width: "100%",
    border: "2px solid #17D7F5",
    marginTop: 20,
    marginBottom: 20,
  },
  productDescription: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    gap: 30,
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
}));
