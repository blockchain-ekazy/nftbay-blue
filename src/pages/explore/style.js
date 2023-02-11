import { makeStyles } from "@material-ui/core";

export const useStyle = makeStyles((theme) => ({
  mainContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
  searchIcon: {
    maxWidth: 300,
    display: "flex",
    justifyItems: "center",
    flexDirection: "column",
    gap: 20,
  },
  innerCotainer: {
    background: theme.palette.background.paper,
    maxWidth: 346,
    display: "flex",
    justifyItems: "center",
    padding: 30,
    flexDirection: "column",
    gap: 20,
  },

  list: {
    color: theme.palette.text.primary,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginTop: 20,
    fontSize: 19,
    fontWeight: "300",
    cursor: "pointer",
  },
  title: {
    fontSize: "20px",
    fontWeight: "700",
    display: "flex",
    justifyContent: "center",
    color: theme.palette.text.primary,
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
  },
  heading: {
    padding: "30px  0px 30px 0px",
  },
}));
