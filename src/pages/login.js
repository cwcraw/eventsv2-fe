import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 320,
  },
}));
export default function Login(props) {
  const classes = useStyles();

  return (
    <>
      <form className={classes.formControl}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onBlur={(e) => {
            props.handleChangeLogin(e);
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onBlur={(e) => {
            props.handleChangeLogin(e);
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className=".submit"
          onClick={(e) => {
            props.handleSubmitLogin(e);
          }}
        >
          Sign In
        </Button>
      </form>
    </>
  );
}
