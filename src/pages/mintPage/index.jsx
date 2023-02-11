import React, { useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import Checkbox from "@material-ui/core/Checkbox";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import InputField from "../../components/inputField";
import DropFileInput from "../../components/DropFileInput";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

import * as IPFS from "ipfs-core";
import axios from "axios";

import { CID } from "multiformats/cid";

import abiADMIN from "../../chaininfo/adminabi.json";
import { contractADMIN, NETWORK, NETWORKNAME } from "../../chaininfo/contracts";

const ethers = require("ethers");

const MintPage = () => {
  const classes = useStyle();
  const [checked, setChecked] = React.useState(true);
  const [img, setimg] = useState("ll");

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const CHARACTER_LIMIT = 20;
  const CHARACTER_LIMIT_PARA = 50;
  const [values, setValues] = React.useState({
    title: "",
    para: "",
  });

  const handleChngTitl = (title) => (event) => {
    setValues({ ...values, [title]: event.target.value });
  };
  const handleChngPara = (para) => (event) => {
    setValues({ ...values, [para]: event.target.value });
  };

  const createAuction = async () => {
    // event.preventDefault();
    const ipfs = await IPFS.create();

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let m = await provider.send("eth_requestAccounts", []);
      m = m[0];
      const ct = new ethers.Contract(contractADMIN, abiADMIN, signer);

      let data, imgp;
      let imgObj = img;

      //handle IPFS
      // await toast.promise(
      // async () => {
      //pin image
      let { path } = await ipfs.add(imgObj);
      path = CID.parse(path).toV1().toString();

      await axios({
        method: "post",
        url: "https://api.nft.storage/pins",
        headers: {
          Accept: "*/*",
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE2OEI0NEQxODU5YjgxRkVlOTRCMkYwRkEzODZjMTEwNkQyOGE5OTIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NTQyOTA5NDcwNiwibmFtZSI6Im5mdGJheSJ9.jf6rMMzGvP50jw4QSI4529JrRqOufMyzkf23TjdRu88",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          cid: path,
        }),
      });

      //pin metadata
      const res = await axios({
        method: "post",
        url: "https://api.nft.storage/upload",
        headers: {
          Accept: "*/*",
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE2OEI0NEQxODU5YjgxRkVlOTRCMkYwRkEzODZjMTEwNkQyOGE5OTIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NTQyOTA5NDcwNiwibmFtZSI6Im5mdGJheSJ9.jf6rMMzGvP50jw4QSI4529JrRqOufMyzkf23TjdRu88",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          name: values.title,
          description: values.para,
          image: "https://" + path + ".ipfs.nftstorage.link/",
        }),
      });
      data = res.data;
      imgp = "https://" + path + ".ipfs.nftstorage.link/";
      // },
      // {
      //   pending: "Processing Metadata",
      //   success: "Success!!",
      //   error: "Failed!!",
      // }
      // );

      // await toast.promise(
      //   async () => {
      let tx = await ct.mint(
        String("https://" + data.value.cid + ".ipfs.nftstorage.link/")
      );
      let req = await tx.wait().then(async (receipt) => {
        let t = await ct.totalSupply();
        let auc = {
          id: Number(t),
          owner: m,
          tokenUri: "https://" + data.value.cid + ".ipfs.nftstorage.link/",
          price: 0,
          forAuction: false,
          auctionEndTime: 0,
          highestBidder: "0x0000000000000000000000000000000000000000",
          highestBid: 0,
          _type: 0,
          offerPrice: 0,
          offerBy: "0x0000000000000000000000000000000000000000",
          name: document.getElementById("itemName").value,
          description: document.getElementById("itemDescription").value,
          image: imgp,
          category: document.getElementById("category").value,
        };

        let dbRef = doc(db, "tokens", String(t));
        await setDoc(dbRef, auc);

        dbRef = doc(db, "activity", String(m));
        let res = (await getDoc(dbRef)).data().items;

        if (Object.keys(res).length == 0) res = new Array();
        res.push({
          type: "MINT",
          time: Date.now(),
          tokenName: document.getElementById("itemName").value,
          txhash: receipt.transactionHash,
          id: String(t),
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
    } catch (e) {
      ipfs.stop();
    } finally {
      ipfs.stop();
    }
  };

  return (
    <div>
      <Box className={classes.mainMint}>
        <Box className={classes.leftMint} style={{ position: "relative" }}>
          <DropFileInput
          // onClick={(e) => {
          //   e.preventDefault();
          // }}
          />
          <div
            id="imginput"
            style={{
              position: "absolute",
              top: "0",
              width: "100%",
              height: "100%",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              // opacity: "0",
            }}
          ></div>
          <input
            type="file"
            onChange={(e) => {
              setimg(e.target.files[0]);
              console.log(e.target.files[0]);
              document.getElementById(
                "imginput"
              ).style.backgroundImage = `url(${URL.createObjectURL(
                e.target.files[0]
              )})`;
            }}
            style={{
              position: "absolute",
              top: "0",
              width: "100%",
              height: "100%",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: "0",
            }}
          />
          {/* // opacity: "0", */}
        </Box>

        <Box className={classes.rightMint}>
          <Box>
            <Typography variant="h1">
              Mint
              <span className={classes.spnitem}>Item</span>{" "}
            </Typography>
          </Box>
          <Box style={{ paddingTop: "25px" }}>
            <InputField
              placeholder="Title"
              className={classes.tagInput}
              // label="Limit"
              inputProps={{
                maxlength: CHARACTER_LIMIT,
              }}
              value={values.name}
              onChange={handleChngTitl("title")}
            />
          </Box>
          <Box pt={4}>
            <Typography variant="body1" className={classes.pdingCount}>
              {`${values.title.length}/${CHARACTER_LIMIT}`}
            </Typography>
          </Box>

          <Box className={classes.roundBox}>
            <InputField
              placeholder=" Write Description "
              rows={6}
              multiline
              style={{ height: 150 }}
              className={classes.forArea}
              inputProps={{
                maxlength: CHARACTER_LIMIT_PARA,
              }}
              value={values.para}
              onChange={handleChngPara("para")}
            />
          </Box>
          <Box>
            <Typography variant="body1" className={classes.pdingCount}>
              {`${values.para.length}/${CHARACTER_LIMIT_PARA}`}
            </Typography>
          </Box>
          <Box className={classes.agremntOverall}>
            <Box className={classes.two}>
              <Checkbox
                color="default"
                inputProps={{ Poppins: "checkbox with default color" }}
                className={classes.checbxicn}
                onClick={handleChange}
              />
              <Typography className={classes.agremnttypo}>
                <span className={classes.subagremnttypo}>I agree to the</span>{" "}
                <span className={classes.agremntterms}>
                  {" "}
                  <a className={classes.linkStyle}> terms and conditions.</a>
                </span>
              </Typography>
            </Box>
            <Box className={classes.typopara}>
              <Typography className={classes.termscondation}>
                In publishing and graphic design, Lorem <br />
                Lorem ipsum Lorem ipsum dolor sit amet, <br />
                consectetur adipisicing elit, sed do <br />
                eiusmod tempor incididunt ut labore <br />
                et dolore magna aliqua. Ut enim ad minim
              </Typography>
            </Box>
          </Box>

          <Box className={classes.butnsNft}>
            <Box>
              <Button
                variant="contained"
                className={classes.connectButton}
                onClick={() => createAuction()}
              >
                Mint NFT
              </Button>
            </Box>
            <Box>
              <a href="/explore">
                <Button variant="outlined" className={classes.connectButton}>
                  discard
                </Button>
              </a>
            </Box>
          </Box>
        </Box>
        <Box></Box>
      </Box>
    </div>
  );
};

export default MintPage;

const useStyle = makeStyles((theme) => ({
  mainMint: {
    // display: "flex",
    // justifyContent: "center",

    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    paddingBottom: "60px",
    gap: 65,
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
      alignItems: "center",
    },
  },
  leftMint: {
    // border: "2px solid #17D7F5",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    width: 606,
    height: 731,
  },
  rightMint: {
    display: "flex",
    // justifyContent: "center",
    flexDirection: "column",
    width: 500,
    height: 731,
  },
  spnitem: {
    color: "#17D7F5",
    marginLeft: "10px",
  },
  underinpt: {
    color: "#FFFFFF",
    borderBottom: " solid #17D7F5",
    fontSize: "18.96px",
    "&.Mui-underline:after": {
      borderBottom: "none",
    },
  },
  agremntOverall: {
    color: theme.palette.primary.main,
    lineHeight: "39px",
    fontWeight: "500",
    fontSize: "19.31px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  agremnttypo: {
    display: "flex",
    flexDirection: "row",
  },
  subagremnttypo: {
    color: "#FFFFFF",
    display: "flex",

    alignItems: "center",
  },
  agremntterms: {
    display: "flex",
    alignItems: "center",
    marginLeft: "5px",
    color: "#17D7F5",
  },
  checbxicn: {
    color: "#D9D9D9",
    borderRadius: "7.3722px",
  },
  termscondation: {
    color: "#FFFFFF",
    fontSize: "16.6414px",
    textAlign: "Justified",
    fontFamily: "Poppins",
  },
  forArea: {
    color: "#FFFFFF",
  },

  two: {
    display: "flex",
    paddingTop: "18px",
  },
  linkStyle: {
    textDecoration: "none",
    color: "#17D7F5",
  },
  roundBox: {
    paddingTop: "30px",
    width: 494.99,
  },

  tagInput: {
    width: 494.99,
    borderBottom: "2px solid #17D7F5",
    border: "none",
    fontFamily: "Poppins",
    color: "#FFFFFF",
    borderRadius: 0,
    padding: "0 10px",
    [theme.breakpoints.down("sm")]: {
      width: 213,
    },
  },
  typopara: {
    paddingTop: "35px",
  },
  butnsNft: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    paddingTop: "55px",
    gap: 25,
    width: "100%",
  },
  pdingCount: {
    color: "#888A90",
    paddingTop: "12px",
  },
}));
