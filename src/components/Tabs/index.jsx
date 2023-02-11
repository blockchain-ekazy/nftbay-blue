import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Cards from "../Cardabout/index";
import Activity from "../activity";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  tabButton: {
    background: theme.palette.primary.main,
    borderRadius: "100px",
    fontSize: "16px",
    fontWeight: "500",
    lineHieght: "40px",
    color: theme.palette.text.primary,
    width: "341px",
    hieght: "67px",
    "&:focus": {
      background: "#5558F3",
      borderBottom: "none",
    },
  },

  mainContainer: {
    background: theme.palette.background.default,
    color: theme.palette.primary.main,
    marginTop: 20,
    gap: 30,
    "& .MuiTabs-flexContainer": {
      display: "flex",
      justifyContent: "center",
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  cardContainer: {
    marginTop: 42,
    paddingBottom: 200,
  },
  tabContainer: {
    display: "flex",
    justifyContent: "center",
    "& .MuiTabs-scroller MuiTabs-fixed": {
      "& .PrivateTabIndicator-root-47": {
        background: "none",
      },
    },
    "& .MuiTabs-flexContainer": {
      justifyContent: "space-between",
      marginTop: 20,
    },
  },
  underLine: {
    width: "100%",
    border: "1px solid #17D7F5",
  },
  underlineContainer: {
    marginTop: 20,
  },
}));

const SimpleTabs = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Box position="static" className={classes.mainContainer}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          className={classes.tabContainer}
          variant="scrollable"
        >
          {/* <Tab
            className={classes.tabButton}
            label="Created"
            {...a11yProps(0)}
          />
          <Tab
            className={classes.tabButton}
            label="Collected"
            {...a11yProps(1)}
          /> */}
          <Tab
            className={classes.tabButton}
            label="Activity"
            {...a11yProps(2)}
            style={{ margin: "auto" }}
          />
        </Tabs>
      </Box>
      <Box className={classes.underlineContainer}>
        <hr className={classes.underLine} />
      </Box>
      {/* <TabPanel value={value} index={0}>
        <Box className={classes.cardContainer}>
          <Cards />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box className={classes.cardContainer}>
          <Cards />
        </Box>
      </TabPanel> */}
      <TabPanel value={value} index={0}>
        <Box className={classes.cardContainer}>
          <Activity />
        </Box>
      </TabPanel>
    </div>
  );
};
export default SimpleTabs;
