import React, { useContext, useState } from "react";

import { Link } from 'react-router-dom';

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import usersContext from "../../contexts/usersContext";

const Continue = props => {
    const curUserName = sessionStorage.getItem("currUserNa");
  const curUserEmail = sessionStorage.getItem("currUserE");
  const curUserNumber = sessionStorage.getItem("currUserN");
  const context = useContext(usersContext);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");

  const [user, setUser] = useState({
    name: curUserName,
    email: curUserEmail,
    number: curUserNumber,
    password: "", 
    confirmPassword:""
  });
  
  console.log(curUserName);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleClick = event => {
    // alert(event.target.value);
    event.preventDefault();
    //alert("This was clicked " + name);
    console.log(user);

    const newUser = {
      name: curUserName,
      email: curUserEmail,
      number: curUserNumber,
      password: "",
      confirmPassword: ""
    };
    if (user.password === user.confirmPassword) {
      context.addUser(newUser);

      setMessage("Successfully Signed Up!");
      console.log(context.users);

      console.log(context.users);
      let path = `/`;
      setOpen(true);
      props.history.push(path);
      setUser({
        name: "",
        email: "",
        number: "",
        password: "",
        confirmPassword: ""
      });
      sessionStorage.clear();
    }
    else{
        setMessage("Passwords don't match");
        setOpen(true);
        return;
    }
  };
  const handleOnChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div className="container">
       Found Error in your info? <Link to='/'>Start Again</Link>
      <h1>Continue Signing Up</h1>

      <div className="login-box">
        <form>
          <div className="field-div">
            <label className="input-label">Name</label>
            <input
              type="text"
              name="name"
              readOnly={true}
              placeholder="Name"
              autoFocus={true}
              value={curUserName}
            />
          </div>
          <div className="field-div">
            <label className="input-label">Email</label>
            <input
              type="email"
              name="email"
              readOnly={true}
              placeholder="Email"
              value={curUserEmail}
            />
          </div>
          <div className="field-div">
            <label className="input-label">Number</label>
            <input
              type="text"
              name="number"
              readOnly={true}
              placeholder="Number"
              value={curUserNumber}
            />
          </div>
          <div className="field-div">
            <label className="input-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleOnChange}
            />
          </div>

          <div className="field-div">
            <label className="input-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              onChange={handleOnChange}
            />
          </div>
          <button type="submit" onClick={handleClick} className="form-btn">
            Continue
          </button>
        </form>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </div>
  );
};
export default Continue;
