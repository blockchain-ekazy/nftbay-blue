import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core";

const FAQsdAccordions = ({ Question, Answer }) => {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion
        className={classes.accordion}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          className={classes.summary}
          expandIcon={expanded ? <RemoveIcon /> : <AddIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.secondaryHeading}>
            {Question}
          </Typography>
        </AccordionSummary>
        <div className={classes.divder}>
          <Divider />
        </div>
        {Answer.map((item, i) => {
          return (
            <>
              <AccordionDetails>
                <Typography className={classes.anstext}>{item.p}</Typography>
              </AccordionDetails>
            </>
          );
        })}
      </Accordion>
    </div>
  );
};

export default FAQsdAccordions;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  accordion: { boxShadow: "none !important" },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: " 27px",
    textTransform: "uppercase",
    color: "rgba(23, 215, 245, 1)",
    [theme.breakpoints.down("md")]: {
      fontSize: 12,
    },
  },

  summary: {
    "& .MuiSvgIcon-root": {
      color: "rgba(23, 215, 245, 1)",
    },
  },
  anstext: {
    fontweight: 500,
    fontSize: "18px",
    lineHeight: " 24px",
    textTransform: " Capitalize",

    color: theme.palette.text.primary,
    [theme.breakpoints.down("md")]: {
      fontSize: 12,
    },
  },
}));
