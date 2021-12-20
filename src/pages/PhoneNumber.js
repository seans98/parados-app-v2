import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import classes from "../css/phone.module.css";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import users from "../components/users";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useHistory } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PhoneNumber = (props) => {
  const [phone, setPhone] = useState();
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleChange = (phone) => {
    setPhone(phone);
    console.log(phone);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleClick = () => {
    console.log(phone);
    const found = users.find(
      (user) => user.telnumber.toLocaleString() === phone
    );
    if (found === undefined) {
      console.log("not found");
      setOpen(true);
    } else {
      console.log(found);
      props.setUserInfo(found);
      history.push("/infoscreen");
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <h1>Welcome to the Parados Web Application!</h1>
      <h2>Please Input your phone number to get started</h2>
      <Box
        component="img"
        sx={{
          height: 300,
          width: 350,
          maxHeight: { xs: 200, md: 190 },
          maxWidth: { xs: 250, md: 250 },
        }}
        alt="Logo"
        src="https://parados.ca/assets/img/lightBackgroundLogo.png"
      />
      <div className={classes.phone}>
        <PhoneInput country={"ca"} value={phone} onChange={handleChange} />
        <Button sx={{ mt: 3 }} variant="contained" onClick={handleClick}>
          Enter
        </Button>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          This number is not valid. Please try a different member or get in
          contact with the team.
        </Alert>
      </Snackbar>
    </Grid>
  );
};
export default PhoneNumber;
