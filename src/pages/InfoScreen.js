import React, { useState } from "react";
import { Paper, Grid, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { List, ListItem } from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InfoScreen = (props) => {
  const history = useHistory();
  const [checkbox3, setCheckbox3] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange3 = (event) => {
    setCheckbox3(event.target.checked);
  };

  if (props.userInfo === undefined) {
    history.push("/phone");
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleClick = () => {
    if (checkbox3) {
      let start = new Date();
      props.setTimeStarted(start);
      history.push("/video1");
    } else {
      setOpen(true);
    }
  };

  const toPhoneInput = () => {
    history.push("/phone");
  };

  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="flex-around"
        alignItems="center"
      >
        <Paper sx={{ width: 3 / 4, mb: 3, mt: 3 }}>
          <h1>
            Hello {props.userInfo.firstName} thanks for being an early adopter
            of the Parados Web Application
          </h1>
        </Paper>
        <Paper sx={{ width: 3 / 4, mb: 3 }}>
          <h2>A few things before we get started...</h2>
        </Paper>

        <Paper sx={{ width: 3 / 4, mb: 3 }}>
          <h2>By now you should have...</h2>
          <List>
            <ListItem>
              {" "}
              <AssignmentTurnedInIcon sx={{ mr: 2, color: "#3f515b" }} />{" "}
              Submitted the initial User Information Survey
            </ListItem>

            <ListItem>
              {" "}
              <AssignmentTurnedInIcon sx={{ mr: 2, color: "#3f515b" }} />{" "}
              Submitted videos of the diagnostic exercises
            </ListItem>
          </List>
        </Paper>
        <Paper sx={{ width: 3 / 4, mb: 3 }}>
          <List>
            <ListItem>
              <FormControlLabel
                label="I have done all of the above and ready to proceed"
                control={
                  <Checkbox
                    checked={checkbox3}
                    onChange={handleChange3}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
              />
            </ListItem>
          </List>
        </Paper>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-end"
        >
          <Button
            variant="outlined"
            onClick={toPhoneInput}
            sx={{ mr: 2, mb: 2 }}
          >
            Back to Phone Input
          </Button>
          <Button
            variant="contained"
            onClick={handleClick}
            sx={{ ml: 2, mr: 2, mb: 2 }}
          >
            I'm ready to proceed
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          Please ensure you have done all of the prior tasks.
        </Alert>
      </Snackbar>
    </div>
  );
};
export default InfoScreen;
