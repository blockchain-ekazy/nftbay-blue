import { Box, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import coverImage from "../../assets/coverImage.png";
import profile from "../../assets/ME.jpeg";
import Button from "../Button/index";
import { makeStyles } from "@material-ui/core";
import Tabs from "../Tabs/index";
import { Link } from "react-router-dom";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
// import { ethers } from "ethers";
import * as IPFS from "ipfs-core";
import { CID } from "multiformats/cid";
import axios from "axios";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";
const ethers = require("ethers");
const UserProfile = () => {
  const classes = useStyle();

  const [edit, setedit] = useState(false);
  const [ownprofile, setownprofile] = useState(false);
  const [address, setaddress] = useState("0x000...000");
  const [data, setData] = useState({
    name: "",
    image: "./imgs/user.jpg",
  });
  const [activity, setActivity] = useState([]);

  useEffect(() => load(), []);

  async function load() {
    let qad = new URLSearchParams(window.location.search).get("address");

    let m;
    if (!qad) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      m = await provider.send("eth_requestAccounts", []);
      m = m[0];
      setownprofile(true);
    } else if (qad == m) {
      setownprofile(true);
    } else m = qad;

    let dbRef = doc(db, "users", String(m).toLowerCase());
    let res = (await getDoc(dbRef)).data();

    if (res) {
      if (!res.image) res.image = "./imgs/user.jpg";
      setData(res);
    }
    setaddress(
      m.substring(0, 6) + "...." + m.substring(m.length, m.length - 6)
    );

    dbRef = doc(db, "activity", String(m).toLowerCase());
    res = (await getDoc(dbRef)).data();

    console.log(res);

    setActivity(res.items);
  }
  async function save() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let m = await provider.send("eth_requestAccounts", []);
    let dbRef = doc(db, "users", String(m[0]));
    await setDoc(dbRef, data);
    setedit(false);
  }
  async function uploadImg() {
    let d = { ...data };
    let imgObj = document.getElementById("imgfile").files[0];
    const ipfs = await IPFS.create();

    let { path } = await ipfs.add(imgObj);
    path = CID.parse(path).toV1().toString();

    await axios({
      method: "post",
      url: "https://api.nft.storage/pins",
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + process.env.REACT_APP_NFTSTORAGEAPI,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        cid: path,
      }),
    }).then(() => {
      d.image = "https://" + path + ".ipfs.nftstorage.link/";
      setData(d);
    });
  }

  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.coverImage}>
        <img src={coverImage} alt="" className={classes.cover} />
        <img src={data.image} alt="" className={classes.profile} />
      </Box>

      <Box className={classes.profileDecp}>
        <Typography variant="h1" className={classes.title}>
          {data.name}
        </Typography>
        <Typography variant="h3"></Typography>

        <a href="/ProfileEdit">
          <Button
            // component={Link}
            className={classes.editButton}
          >
            Edit
          </Button>
        </a>
      </Box>
      <Box>
        <Tabs />
      </Box>
    </Box>
  );
};

export default UserProfile;
const useStyle = makeStyles((theme) => ({
  mainContainer: {},
  coverImage: { position: "relative" },
  profile: {
    width: 321,
    height: 321,
    objectFit: "cover",
    borderRadius: "50%",
    position: "absolute",
    top: "50%",
    left: "36.5%",
    [theme.breakpoints.down("xs")]: {
      top: "50%",
      left: "37.5%",
      width: 100,
      height: 100,
    },
  },
  cover: {
    width: "100%",
  },
  profileDecp: {
    marginTop: 150,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 25,
    [theme.breakpoints.down("md")]: {
      marginTop: 50,
    },
  },
  editButton: {
    width: 209,
    height: 41,
  },
}));
