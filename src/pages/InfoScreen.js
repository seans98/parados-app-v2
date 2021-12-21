import React, { useState } from "react";
import { Paper, Grid, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { List, ListItem } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InfoScreen = (props) => {
  const history = useHistory();
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange1 = (event) => {
    setCheckbox1(event.target.checked);
  };

  const handleChange2 = (event) => {
    setCheckbox2(event.target.checked);
  };

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
    if (checkbox1 && checkbox2 && checkbox3) {
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
            Hello {props.userInfo.firstName} thank you so much for being an
            early adopter of the Parados Web Application
          </h1>
        </Paper>
        <Paper sx={{ width: 3 / 4, mb: 3 }}>
          <h2>A few things before we get started...</h2>
        </Paper>

        <Paper sx={{ width: 3 / 4, mb: 3 }}>
          <h2>By now the following should've happened...</h2>
          <List>
            <ListItem>
              <FormControlLabel
                label="You submitted the initial User Information Survey"
                control={
                  <Checkbox
                    checked={checkbox1}
                    onChange={handleChange1}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
              />
            </ListItem>

            <ListItem>
              <FormControlLabel
                label="You submitted videos of the diagnostic exercises"
                control={
                  <Checkbox
                    checked={checkbox2}
                    onChange={handleChange2}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
              />
            </ListItem>

            <ListItem>
              <FormControlLabel
                label="You received a text or email from Parados indicating that your exercises are ready"
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
        <Paper sx={{ width: 3 / 4, mb: 3 }}>
          <h4>
            The following pages will contain video/audio files with exercises
            that are beneficial to your physical and mental well being so the
            team asks that you do the following{" "}
          </h4>
          <List>
            <ListItem>
              Watch the video/listen to the audio in its entireity and do the
              exercises as instructed.
            </ListItem>
            <ListItem>
              At the end of the exercises there will be a survey. Please fill
              that out and submit it as it helps us at Parados improve the
              experience and curated exercises.
            </ListItem>
            <ListItem>
              Please refrain from hard refreshing the page as this causes issues
              with the survey submission.
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
          Please ensure all of the prior tasks have been checked off and
          completed.
        </Alert>
      </Snackbar>
    </div>
  );
};
export default InfoScreen;
