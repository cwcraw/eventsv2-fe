import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import Link from "@material-ui/core/Link";

// import axios from "axios";

export default function SignUp(props) {
  return (
    <>
      <TextField
        variant="outlined"
        required
        fullWidth
        id="username"
        label="User Name"
        name="username"
        autoComplete="username"
        onBlur={(e) => {
          props.handleChangeSignUp(e);
        }}
      />
      <TextField
        variant="outlined"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        onBlur={(e) => {
          props.handleChangeSignUp(e);
        }}
      />
      <TextField
        variant="outlined"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onBlur={(e) => {
          props.handleChangeSignUp(e);
        }}
      />
      <TextField
        variant="outlined"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        autoComplete="current-password"
        onBlur={(e) => {
          props.handleChangeSignUp(e);
        }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={(e) => {
          props.handleSubmitSignUp(e);
        }}
      >
        Sign Up
      </Button>
    </>
  );
}
