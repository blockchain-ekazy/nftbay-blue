import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import SyncAltTwoToneIcon from "@material-ui/icons/SyncAltTwoTone";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Box } from "@material-ui/core";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
const ethers = require("ethers");

const Activity = () => {
  const [activity, setActivity] = useState([]);

  function createData(icon, event, price, from, to, date) {
    return { icon, event, price, from, to, date };
  }

  useEffect(() => init(), []);
  async function init() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let m = await provider.send("eth_requestAccounts", []);
    m = m[0];

    let dbRef = doc(db, "activity", String(m).toLowerCase());
    let res = (await getDoc(dbRef)).data();

    setActivity(res.items);
  }

  const rows = [
    createData(<ListIcon />, "List", 0.5, 378973, 2, "3 Min"),
    createData(<SyncAltTwoToneIcon />, "Transfer", 237, 9.0, 37, "3 Min"),
    createData(<CreateOutlinedIcon />, "Create", 262, 16.0, 24, "3 Min"),
  ];
  const classes = useStyle();
  return (
    <TableContainer className={classes.tableContainer}>
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell align="center">TYPE</TableCell>
            <TableCell align="center">TOKEN</TableCell>
            <TableCell align="center">VALUE</TableCell>
            <TableCell align="center">TIME</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activity.map((row, i) => (
            <TableRow key={i}>
              {/* <TableCell align="center" component="th" scope="row">
                <Box className={classes.firstBox}>
                  {row.icon}
                  {row.event}
                </Box>
              </TableCell> */}
              <TableCell align="center">{row.type}</TableCell>
              <TableCell align="center">{row.tokenName}</TableCell>
              <TableCell align="center">{row.value / 1e18} ETH</TableCell>
              <TableCell align="center">
                {new Date(row.time).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Activity;

const useStyle = makeStyles((theme) => ({
  tabelContainer: {
    border: "1px solid #FFFFFF",
    maxWidth: "100%",
    background: "transparent",

    // display: "grid",
    // gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gap: 20,
    marginTop: 30,
  },
  firstContent: {
    display: "flex",
    // borderBottom: "1px solid #ffffff",

    justifyContent: "space-between",
    gap: 20,
    padding: 25,
    textAlign: "center",
  },
  firstBox: {
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  table: {
    background: "transparent",
    border: "1px solid #FFFFFF",
  },
}));
