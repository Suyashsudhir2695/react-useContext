import React, { useState, useContext } from "react";

import "../Signup/SignUp.css";
//import Users from '../Users/Users'
import usersContext from "../../contexts/usersContext";
import { Link } from "react-router-dom";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export default function SignUp(props) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    confirmPassword:""
  });
  const context = useContext(usersContext);
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
      name: user.name,
      email: user.email,
      number: user.number,
      password: '',
      confirmPassword:''
    };

    if(user.email === '' || user.name  === '' || user.number === ''){
      setMessage("Fill in your details");
      setOpen(true);
      return
    }

    for (var i = 0; i <= context.users.length; i++) {
      if (context.users[i] != null) {
        if (newUser.email === context.users[i].email) {
          setMessage("That email is already taken. Try again!");
          setOpen(true);
          setUser({
            name: "",
            email: "",
            number: "",
            password: '',
            confirmPassword:''
          });
          return;
        } 

         
      } else {
       // context.addUser(newUser);
        sessionStorage.setItem("currUserNa", user.name);
        sessionStorage.setItem("currUserE", user.email);
        sessionStorage.setItem("currUserN", user.number);

        setMessage('Successfully Signed Up!');
       // console.log(context.users);

        //console.log(context.users);
        let path = `/continue`;
        setOpen(true);
        props.history.push(path);
        
      }
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
      <h1>Sign Up</h1>

      <Link to="/users">Users List</Link>

      <div className="login-box">
        <form>
          <div className="field-div">
            <label className="input-label">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              autoFocus={true}
              onChange={handleOnChange}
              value={user.name}
            />
          </div>
          <div className="field-div">
            <label className="input-label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleOnChange}
              value={user.email}
            />
          </div>
          <div className="field-div">
            <label className="input-label">Number</label>
            <input
              type="text"
              name="number"
              placeholder="Number"
              onChange={handleOnChange}
              value={user.number}
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
}
