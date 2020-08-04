import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 320,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.formControl}>
        <form className={classes.formControl}>
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
        </form>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={(e) => {
            props.handleSubmitSignUp(e);
          }}
        >
          Sign Up
        </Button>
      </div>
    </>
  );
}
