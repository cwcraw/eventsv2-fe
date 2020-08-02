import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import Link from "@material-ui/core/Link";

export default function Login(props) {
  return (
    <>
      <form>
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
          // helperText={errors.email}
          // error={errors.email ? true : false}
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
          // helperText={errors.password}
          // error={errors.password ? true : false}
          onBlur={(e) => {
            props.handleChangeLogin(e);
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          // className={classes.submit}
          className=".submit"
          onClick={(e) => {
            props.handleSubmitLogin(e);
          }}
          // disabled={loading || !props.logProps.email || !props.logProps.password}
        >
          Sign In
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          // className={classes.submit}
          className=".submit"
          onClick={(e) => {
            props.logoutHandler(e);
          }}
          // disabled={loading || !props.logProps.email || !props.logProps.password}
        >
          Log Out
        </Button>

        {/* <Link href="signup" variant="body2">
          {"Don't have an account? Sign Up"}
        </Link> */}
      </form>
    </>
  );
}
