import { Box, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import coverImage from "../../assets/coverImage.png";
import profile from "../../assets/ME.jpeg";
import Button from "../Button/index";
import { makeStyles } from "@material-ui/core";
import InputField from "../inputField";
import editIcon from "../../assets/iconEdit.png";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import { FileUploader } from "react-drag-drop-files";
// import { Translate } from "@material-ui/icons";

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

const ProfileEdit = (
  { handleImageUploadComplete, helperText, error, value },
  ref
) => {
  const [data, setData] = useState({
    name: "",
    image: "./imgs/user.jpg",
  });
  const useStyle = makeStyles((theme) => ({
    mainContainer: {},
    coverImage: {
      position: "relative",
    },
    cov: {
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    profile: {
      width: 300,
      height: 300,
      borderRadius: "50%",
      position: "absolute",
      bottom: 0,
      left: "50%",
      transform: "translate(-50%, 50%)",
      background: `url("${data.image}")`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      display: "grid",
      placeContent: "center",
      [theme.breakpoints.down("md")]: {
        width: 120,
        height: 120,
        left: "50%",
      },
      [theme.breakpoints.down("sm")]: {
        width: 120,
        height: 120,
        left: "50%",
      },
      [theme.breakpoints.down("xs")]: {
        width: 100,
        height: 100,
        left: "50%",
      },
    },
    profile2: {
      width: 50,
      height: 50,
      borderRadius: "50%",
      position: "absolute",
      bottom: 10,
      right: 10,
      // backgroundPosition: "center",
      // backgroundSize: "cover",
      // display: "grid",
      // placeContent: "center",
      [theme.breakpoints.down("xs")]: {
        bottom: 0,
        right: 0,
      },
    },
    icn: {
      height: 80,
      width: 75,
      cursor: "pointer",
      color: theme.palette.text.primary,
      [theme.breakpoints.down("md")]: {
        height: 60,
        width: 50,
      },
      [theme.breakpoints.down("sm")]: {
        height: 60,
        width: 50,
      },
      [theme.breakpoints.down("xs")]: {
        height: 60,
        width: 40,
      },
    },
    icn2: {
      height: 50,
      width: 45,
      cursor: "pointer",
      color: theme.palette.text.primary,
      [theme.breakpoints.down("xs")]: {
        height: 40,
        width: 35,
      },
    },
    inputField: {
      marginTop: 150,
      [theme.breakpoints.down("xs")]: {
        marginTop: 80,
      },
    },
    inner: {
      display: "flex",
      justifyContent: "center",
      position: "relative",
    },
    forInp: {
      width: 369,
      borderBottom: "2px solid #17D7F5",
      border: "none",
      borderRadius: 0,
      padding: "0 10px",
      [theme.breakpoints.down("md")]: {
        width: 300,
      },
      [theme.breakpoints.down("sm")]: {
        width: 260,
      },
      [theme.breakpoints.down("xs")]: {
        width: 213,
      },
    },
    forIcon: {
      color: theme.palette.primary.main,
      position: "absolute",
      marginLeft: 327,
      height: 26,
      width: 26,
      cursor: "pointer",
      [theme.breakpoints.down("sm")]: {
        marginLeft: 175,
      },
    },
    outerLR: {
      display: "flex",
      marginTop: 30,
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      },
    },
    right: {
      marginLeft: 15,
      [theme.breakpoints.down("xs")]: {
        marginLeft: 0,
      },
    },
    forArea: {
      width: 580,
      marginTop: 12,
      [theme.breakpoints.down("md")]: {
        width: 320,
        display: "flex",
        justifyContent: "center",
      },
      [theme.breakpoints.down("sm")]: {
        width: 320,
        display: "flex",
        justifyContent: "center",
      },
      [theme.breakpoints.down("xs")]: {
        width: 300,
        display: "flex",
        justifyContent: "center",
      },
    },

    des: {
      marginTop: 30,
    },
    forBTn: {
      width: 580,
      marginTop: 65,
      [theme.breakpoints.down("xs")]: {
        width: 285,
      },
    },
    forDown: {
      display: "flex",
      justifyContent: "center",
      marginTop: 30,
      paddingBottom: 30,
    },
    forBTn2: {
      width: 211,
      marginTop: 65,
    },
  }));
  const classes = useStyle();

  const [edit, setedit] = useState(false);
  const [ownprofile, setownprofile] = useState(false);
  const [address, setaddress] = useState("0x000...000");

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
      document.getElementById("namefield").value = res.name;
    }
    setaddress(
      m.substring(0, 6) + "...." + m.substring(m.length, m.length - 6)
    );

    dbRef = doc(db, "activity", String(m).toLowerCase());
    res = (await getDoc(dbRef)).data();

    setActivity(res.items);
  }
  async function save() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let m = await provider.send("eth_requestAccounts", []);
    let dbRef = doc(db, "users", String(m[0]));
    await setDoc(dbRef, data).then(() => (window.location.href = "/profile"));
    setedit(false);
  }
  async function uploadImg(file) {
    let d = { ...data };
    let imgObj = file; //document.getElementById("imgfile").files[0];
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

  // const classes = useStyle();
  const [isImgUploading, setIsImgUploading] = React.useState(false);
  const [isInvalidFile, setIsInvalidFile] = React.useState(false);
  const handleFileUpload = (file) => {
    setIsInvalidFile(null);
    setIsImgUploading(true);
    // check for file
    if (
      !file ||
      !/\.(jpg|jpeg|png|gif|tiff|tif|heif|heic|svg|svgz|ai|mp4|ogg|webm|mov)$/.test(
        file.name.toLowerCase()
      )
    ) {
      setIsInvalidFile("Only image and video NFTs are allowed.");
      setIsImgUploading(false);
      return false;
    }
    setIsImgUploading(false);
    handleImageUploadComplete(file);
    const res = URL.createObjectURL(file);
    ref.current.poster = res;
    ref.current.src = res;
  };
  return (
    <>
      <Box className={classes.mainContainer}>
        <Box className={classes.coverImage}>
          <FileUploader
            classes="drag_n_drop"
            handleChange={uploadImg}
            name="imageFile"
            type="file"
          >
            <img src={coverImage} alt="" className={classes.cov} />

            <div
              style={{ background: `${data.image}` }}
              className={classes.profile}
            >
              <InsertPhotoIcon className={classes.icn} />
            </div>
            {/* <div className={classes.profile2}>
              <InsertPhotoIcon className={classes.icn2} />
            </div> */}
          </FileUploader>
        </Box>
        <div className={classes.mainLabel}>
          {(error || isInvalidFile) && (
            <p className={classes.error}>{isInvalidFile || helperText}</p>
          )}
        </div>

        <Box className={classes.inputField}>
          <Box className={classes.inner}>
            <InputField
              id="namefield"
              placeholder="Name"
              className={classes.forInp}
              defaultValue={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <img src={editIcon} className={classes.forIcon} />
          </Box>
        </Box>
      </Box>
      {/* <Box className={classes.outerLR}>
        <Box className={classes.left}>
          <Typography variant="h3" className={classes.des}>
            Bio
          </Typography>
          <InputField
            placeholder="About Your Self in A Few Words"
            rows={6}
            multiline
            style={{ height: 150 }}
            className={classes.forArea}
          />

          <Typography variant="h3" className={classes.des}>
            TWITTER
          </Typography>
          <InputField className={classes.forArea} />
        </Box>
        <Box className={classes.right}>
          <Typography variant="h3" className={classes.des}>
            PORTFOLIO OR WEBSITE
          </Typography>
          <InputField className={classes.forArea} />
          <Typography variant="h3" className={classes.des}>
            CUSTOM URL
          </Typography>
          <InputField className={classes.forArea} />
          <Button className={classes.forBTn}>ADD MORE SOCIAL ACCOUNT</Button>
        </Box>
      </Box> */}
      <Box className={classes.forDown}>
        <Button className={classes.forBTn2} onClick={() => save()}>
          UPDATE PROFILE
        </Button>
      </Box>
    </>
  );
};

export default ProfileEdit;
