import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import classes from "../css/phone.module.css";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useHistory } from "react-router-dom";
import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PhoneNumber = (props) => {
  const [phone, setPhone] = useState();
  const [firebaseUsers, setFirebaseUsers] = useState();
  const [open, setOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const getUsers = async () => {
      const docRef = doc(db, "players", "jhz4oZbt7E6nyu3iT2JN");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setFirebaseUsers(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getUsers();
  }, []);

  const handleChange = (phone) => {
    setPhone(phone);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClick = () => {
    let found = firebaseUsers.users.find((user) => {
      if (user.telnumber === phone) {
        return user;
      } else {
        return undefined;
      }
    });
    console.log(found);

    if (found === undefined) {
      setOpen(true);
    } else {
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
      <h1>Welcome!</h1>
      <h2>Input your phone number to get started</h2>

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
